/**
 * Handsign SVM inference via ONNX.
 * Mirrors the exact feature extraction from training/01_extract_landmarks.py.
 */
import * as ort from "onnxruntime-web";

let session = null;
let labelMap = null;

// ponytail: maps ArSL2018 dataset labels → app letter names (lowercase)
const ARSL_NORM = {
  aleff:'alif', bb:'ba', toot:'ta', ta:'ta', thaa:'tsa',
  jeem:'jim', haa:'ha', khaa:'kha', dal:'dal', thal:'dzal',
  ra:'ra', zay:'zai', seen:'sin', sheen:'syin', saad:'shad',
  dhad:'dhad', taa:'tha', dha:'zha', ain:'ain', ghain:'ghain',
  fa:'fa', gaaf:'qaf', kaaf:'kaf', laam:'lam', meem:'mim',
  nun:'nun', ha:'ha', waw:'waw', ya:'ya', yaa:'ya',
  al:null, la:null, // lam-alef combos, not hijaiyah letters
};

export async function loadHandsignModel() {
  if (session) return;
  [session, labelMap] = await Promise.all([
    ort.InferenceSession.create("/models/handsign_svm.onnx"),
    fetch("/models/label_map.json").then((r) => r.json()),
  ]);
}

function normalize(landmarks) {
  const [wx, wy, wz] = [landmarks[0].x, landmarks[0].y, landmarks[0].z];
  const pts = landmarks.map(({ x, y, z }) => [x - wx, y - wy, z - wz]);
  const [mx, my, mz] = pts[9];
  const scale = Math.sqrt(mx * mx + my * my + mz * mz);
  if (scale < 1e-6) return null;
  return pts.map(([x, y, z]) => [x / scale, y / scale, z / scale]);
}

function computeAngles(pts) {
  const chains = [
    [0, 1, 2, 3, 4],
    [0, 5, 6, 7, 8],
    [0, 9, 10, 11, 12],
    [0, 13, 14, 15, 16],
    [0, 17, 18, 19, 20],
  ];
  const angles = [];
  for (const chain of chains) {
    for (let i = 1; i < chain.length - 1; i++) {
      const a = pts[chain[i - 1]];
      const b = pts[chain[i]];
      const c = pts[chain[i + 1]];
      const ba = a.map((v, k) => v - b[k]);
      const bc = c.map((v, k) => v - b[k]);
      const dot = ba.reduce((s, v, k) => s + v * bc[k], 0);
      const magBa = Math.sqrt(ba.reduce((s, v) => s + v * v, 0));
      const magBc = Math.sqrt(bc.reduce((s, v) => s + v * v, 0));
      const cosine = dot / (magBa * magBc + 1e-8);
      angles.push(Math.max(-1, Math.min(1, cosine)));
    }
  }
  return angles; // 15 values
}

/**
 * @param {Array} landmarks  MediaPipe hand landmarks (21 items, each {x,y,z})
 * @param {string} targetLabel  Expected label (e.g. "ba")
 * @returns {{ label: string, confidence: number, correct: boolean } | null}
 */
export async function classifyLandmarks(landmarks, targetLabel = null) {
  if (!session) await loadHandsignModel();

  const norm = normalize(landmarks);
  if (!norm) return null;

  const angles = computeAngles(norm);
  const flat = [...norm.flat(), ...angles]; // 78 features
  const input = new Float32Array(flat);

  const tensor = new ort.Tensor("float32", input, [1, 78]);
  const result = await session.run({ float_input: tensor });

  // outputs: [predicted_label_index, probabilities]
  const labelIdx = Number(result[Object.keys(result)[0]].data[0]);
  const probs = result[Object.keys(result)[1]].data;
  const confidence = Math.max(...probs);
  const raw = labelMap[labelIdx];
  const label = ARSL_NORM[raw] ?? raw;

  return {
    label,
    confidence,
    correct: targetLabel ? label === targetLabel.toLowerCase() : null,
  };
}
