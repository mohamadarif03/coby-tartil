# CobyTartil — Model Training Plan

Separate training environment from the React app.
Output: ONNX model files + JSON reference files → drop into `public/models/`.

---

## Environment

```bash
python 3.10+
pip install mediapipe opencv-python scikit-learn skl2onnx onnxruntime \
            librosa soundfile numpy pandas tqdm
```

Recommended: one Colab notebook per phase, or a local `training/` directory.

```
training/
├── data/
│   ├── arsl2018/          # raw ArSL2018 images
│   ├── ahcd/              # raw AHCD images
│   ├── tarteel/           # downloaded ayat audio
│   ├── reference_strokes/ # collected from expert (JSON)
│   └── reference_audio/   # recorded expert letter pronunciations (WAV)
├── outputs/
│   ├── landmarks.csv      # extracted from ArSL2018
│   ├── mfcc_refs/         # per-letter MFCC reference arrays (.npy)
│   └── models/
│       └── handsign_svm.onnx
├── 01_extract_landmarks.py
├── 02_train_handsign.py
├── 03_extract_mfcc_refs.py
└── 04_export_onnx.py
```

---

## Phase 1 — Letter Handsign (F1 + F4)

**Goal**: SVM classifier on normalized joint angles → exported as ONNX.  
**Dataset**: ArSL2018 (28 Arabic letter classes, ~54,000 static images).

### Step 1.1 — Download ArSL2018

ArSL2018 is available on Kaggle:
```
kaggle datasets download -d mloey/arabic-sign-language-dataset
```
Expected structure after unzip: `ArSL2018/<letter_name>/<image>.jpg`

### Step 1.2 — Extract MediaPipe Landmarks (`01_extract_landmarks.py`)

```python
import mediapipe as mp
import cv2, csv, os
from pathlib import Path

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=True, max_num_hands=1,
                       model_complexity=0, min_detection_confidence=0.5)

def extract_landmarks(image_path):
    img = cv2.imread(str(image_path))
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = hands.process(img_rgb)
    if not result.multi_hand_landmarks:
        return None
    lm = result.multi_hand_landmarks[0].landmark
    return [(l.x, l.y, l.z) for l in lm]  # 21 landmarks

def normalize(landmarks):
    # Translate: wrist (landmark 0) = origin
    wx, wy, wz = landmarks[0]
    pts = [(x - wx, y - wy, z - wz) for x, y, z in landmarks]
    # Scale: by distance wrist → middle finger MCP (landmark 9)
    scale = (pts[9][0]**2 + pts[9][1]**2 + pts[9][2]**2) ** 0.5
    if scale == 0:
        return None
    return [(x/scale, y/scale, z/scale) for x, y, z in pts]

def compute_angles(landmarks):
    # Joint angle between consecutive finger segments: 15 angles
    # Finger chains: thumb[1-4], index[5-8], middle[9-12], ring[13-16], pinky[17-20]
    import numpy as np
    chains = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16],[17,18,19,20]]
    angles = []
    pts = np.array(landmarks)
    for chain in chains:
        for i in range(len(chain) - 1):
            a = pts[chain[i-1]] if i > 0 else pts[0]
            b = pts[chain[i]]
            c = pts[chain[i+1]]
            ba = a - b
            bc = c - b
            cosine = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-8)
            angles.append(float(np.clip(cosine, -1, 1)))
    return angles  # 15 angles

rows = []
data_dir = Path("data/arsl2018")
for letter_dir in sorted(data_dir.iterdir()):
    label = letter_dir.name
    for img_path in letter_dir.glob("*.jpg"):
        lm = extract_landmarks(img_path)
        if lm is None:
            continue
        norm = normalize(lm)
        if norm is None:
            continue
        angles = compute_angles(norm)
        flat = [c for pt in norm for c in pt] + angles  # 63 + 15 = 78 features
        rows.append([label] + flat)

with open("outputs/landmarks.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["label"] + [f"f{i}" for i in range(78)])
    writer.writerows(rows)

print(f"Extracted {len(rows)} samples")
# ponytail: no-detection images are silently dropped; log count if >20% missing
```

### Step 1.3 — Add Negative Samples

Collect ~500 random hand images that are not signs (open palm, fist, pointing).
Label them `"_none"`. Run through the same extraction pipeline.
Sources: FreiHAND dataset (public) or just photograph your own hand in random poses.

### Step 1.4 — Train SVM (`02_train_handsign.py`)

```python
import pandas as pd
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import numpy as np

df = pd.read_csv("outputs/landmarks.csv")
X = df.drop("label", axis=1).values
y = df["label"].values

le = LabelEncoder()
y_enc = le.fit_transform(y)

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("svm", SVC(kernel="rbf", C=10, gamma="scale", probability=True))
])

# 5-fold cross-validation before final fit
scores = cross_val_score(pipe, X, y_enc, cv=StratifiedKFold(5), scoring="accuracy")
print(f"CV accuracy: {scores.mean():.3f} ± {scores.std():.3f}")
# Target: >0.85 before exporting

pipe.fit(X, y_enc)

# Save label mapping
import json
with open("outputs/label_map.json", "w") as f:
    json.dump(list(le.classes_), f)

import joblib
joblib.dump(pipe, "outputs/handsign_pipeline.pkl")
```

**Acceptance threshold**: CV accuracy > 0.85 before proceeding to export.  
If below threshold: check no-detection drop rate, add more negative samples, tune `C`.

### Step 1.5 — Export to ONNX (`04_export_onnx.py`)

```python
import joblib
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

pipe = joblib.load("outputs/handsign_pipeline.pkl")

initial_type = [("float_input", FloatTensorType([None, 78]))]
onnx_model = convert_sklearn(pipe, initial_types=initial_type,
                              options={"zipmap": False})

with open("outputs/models/handsign_svm.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())

print("Exported: handsign_svm.onnx")
```

**Output**: `handsign_svm.onnx` (~1–5MB) → copy to `public/models/`

---

## Phase 2 — Writing Shape Match (F2)

**Goal**: Small CNN trained on AHCD → exported as ONNX → classifies canvas snapshot.  
**No manual collection** — AHCD has 16,800 labeled handwritten Arabic letter images.

### Step 2.1 — Download AHCD

```bash
kaggle datasets download -d mloey/arabic-handwritten-characters-dataset
```
Expected structure: `AHCD/<letter_name>/<image>.jpg` (28 classes, 600 images/class)

### Step 2.2 — Train CNN (`02_train_writing.py`)

```python
import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split

transform = transforms.Compose([
    transforms.Grayscale(),
    transforms.Resize((64, 64)),
    transforms.RandomRotation(10),       # augment: kids draw at odd angles
    transforms.RandomAffine(0, shear=5), # augment: slight shear
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

dataset = datasets.ImageFolder("data/ahcd", transform=transform)
train_size = int(0.85 * len(dataset))
train_set, val_set = random_split(dataset, [train_size, len(dataset) - train_size])

train_loader = DataLoader(train_set, batch_size=64, shuffle=True)
val_loader   = DataLoader(val_set,   batch_size=64)

class WritingCNN(nn.Module):
    def __init__(self, num_classes=28):
        super().__init__()
        self.net = nn.Sequential(
            nn.Conv2d(1, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(64, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(64 * 8 * 8, 128), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(128, num_classes)
        )
    def forward(self, x):
        return self.net(x)

model = WritingCNN()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for epoch in range(20):
    model.train()
    for X, y in train_loader:
        optimizer.zero_grad()
        loss = criterion(model(X), y)
        loss.backward()
        optimizer.step()

    model.eval()
    correct = sum((model(X).argmax(1) == y).sum().item()
                  for X, y in val_loader)
    acc = correct / len(val_set)
    print(f"Epoch {epoch+1}: val_acc={acc:.3f}")

torch.save(model.state_dict(), "outputs/writing_cnn.pt")
# ponytail: 20 epochs on AHCD trains in ~10min on CPU, use GPU if available
```

**Acceptance threshold**: val accuracy > 0.90 before exporting.

### Step 2.3 — Export to ONNX

```python
import torch
import json

model = WritingCNN()
model.load_state_dict(torch.load("outputs/writing_cnn.pt"))
model.eval()

dummy = torch.zeros(1, 1, 64, 64)
torch.onnx.export(model, dummy, "outputs/models/writing_cnn.onnx",
                  input_names=["input"], output_names=["logits"],
                  dynamic_axes={"input": {0: "batch"}})

# Save class index → letter name mapping from dataset
label_map = {v: k for k, v in datasets.ImageFolder("data/ahcd").class_to_idx.items()}
with open("outputs/writing_label_map.json", "w") as f:
    json.dump(label_map, f)

print("Exported: writing_cnn.onnx")
```

**Output**: `writing_cnn.onnx` (~2MB) + `writing_label_map.json` → copy to `public/models/`

---

## Phase 3 — Audio (F3, letter + ayat)

**Goal**: Did the kid say the right letter/ayat?  
**Approach**: Web Speech API (`lang: 'ar-SA'`) + strip diacritics + fuzzy match.  
**No model, no dataset, no training, no Gemini.**

```js
// ponytail: normalize Arabic before comparing — harakat inconsistent across browsers
const stripDiacritics = (s) => s.replace(/[ؐ-ًؚ-ٟ]/g, '');
const correct = stripDiacritics(transcript) === stripDiacritics(target);
```

Skipped: MFCC, DTW, expert recordings, Gemini. Add tajwid quality scoring post-MVP if needed.

---

## Phase 4 — Validation

Run before copying any output to the React app.

```python
# validate_outputs.py
import onnxruntime as ort
import numpy as np
import json

# 1. ONNX model loads and runs
sess = ort.InferenceSession("outputs/models/handsign_svm.onnx")
dummy = np.zeros((1, 78), dtype=np.float32)
out = sess.run(None, {"float_input": dummy})
assert len(out) == 2, "Expected [labels, probabilities]"
print("✓ ONNX model OK")

# 2. Label map has 28+ classes
labels = json.load(open("outputs/label_map.json"))
assert len(labels) >= 28, f"Only {len(labels)} classes"
print(f"✓ {len(labels)} classes in label map")

# 3. Stroke references cover all 28 hijaiyah
HIJAIYAH = ["alif","ba","ta","tsa","jim","ha","kha","dal","dzal","ra","zai",
            "sin","syin","shad","dhad","tha","zha","ain","ghain","fa","qaf",
            "kaf","lam","mim","nun","ha2","waw","ya"]
strokes = json.load(open("outputs/stroke_references.json"))
missing = [l for l in HIJAIYAH if l not in strokes]
if missing:
    print(f"⚠ Missing stroke refs: {missing}")
else:
    print("✓ All 28 stroke references present")

# 4. MFCC references cover all 28 hijaiyah
mfcc = json.load(open("outputs/mfcc_references.json"))
missing = [l for l in HIJAIYAH if l not in mfcc]
if missing:
    print(f"⚠ Missing MFCC refs: {missing}")
else:
    print("✓ All 28 MFCC references present")
```

---

## Outputs → React App

Copy these into `public/models/` in the React project:

```
public/models/
├── handsign_svm.onnx      # ~1–5MB — Phase 1
├── label_map.json         # ~1KB   — Phase 1
├── writing_cnn.onnx       # ~2MB   — Phase 2
└── writing_label_map.json # ~1KB   — Phase 2
```

The React app loads these at runtime via `fetch("/models/...")` — no bundling needed.

---

## Acceptance Criteria

| Output | Criterion |
|---|---|
| `handsign_svm.onnx` | CV accuracy > 0.85 on ArSL2018 |
| `writing_cnn.onnx` | Val accuracy > 0.90 on AHCD |
| All files | Pass `validate_outputs.py` with no errors |

---

## Notes

- Train on CPU — SVM on 78 features trains in minutes, no GPU needed
- ArSL2018 images with no hand detected by MediaPipe are silently dropped; if >20% drop rate, lower `min_detection_confidence` to 0.3
- `modelComplexity=0` in MediaPipe during extraction matches what the app uses at runtime — keep them consistent
- Retrain quarterly once the deployed app accumulates user landmark logs
