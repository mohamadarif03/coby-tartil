import * as ort from 'onnxruntime-web';

type Landmark = { x: number; y: number; z: number };
type ClassifyResult = { label: string; confidence: number; correct: boolean | null };

let session: ort.InferenceSession | null = null;
let labelMap: string[] | null = null;

// ponytail: maps ArSL2018 dataset labels → app letter names (lowercase)
const ARSL_NORM: Record<string, string | null> = {
  aleff: 'alif', bb: 'ba', toot: 'ta', ta: 'ta', thaa: 'tsa',
  jeem: 'jim', haa: 'ha', khaa: 'kha', dal: 'dal', thal: 'dzal',
  ra: 'ra', zay: 'zai', seen: 'sin', sheen: 'syin', saad: 'shad',
  dhad: 'dhad', taa: 'tha', dha: 'zha', ain: 'ain', ghain: 'ghain',
  fa: 'fa', gaaf: 'qaf', kaaf: 'kaf', laam: 'lam', meem: 'mim',
  nun: 'nun', ha: 'ha', waw: 'waw', ya: 'ya', yaa: 'ya',
  al: null, la: null,
};

export async function loadHandsignModel(): Promise<void> {
  if (session) return;
  [session, labelMap] = await Promise.all([
    ort.InferenceSession.create('/models/handsign_svm.onnx'),
    fetch('/models/label_map.json').then((r) => r.json()),
  ]);
}

function normalize(landmarks: Landmark[]): number[][] | null {
  const [wx, wy, wz] = [landmarks[0].x, landmarks[0].y, landmarks[0].z];
  const pts = landmarks.map(({ x, y, z }) => [x - wx, y - wy, z - wz]);
  const [mx, my, mz] = pts[9];
  const scale = Math.sqrt(mx * mx + my * my + mz * mz);
  if (scale < 1e-6) return null;
  return pts.map(([x, y, z]) => [x / scale, y / scale, z / scale]);
}

function computeAngles(pts: number[][]): number[] {
  const chains = [
    [0, 1, 2, 3, 4],
    [0, 5, 6, 7, 8],
    [0, 9, 10, 11, 12],
    [0, 13, 14, 15, 16],
    [0, 17, 18, 19, 20],
  ];
  const angles: number[] = [];
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
      angles.push(Math.max(-1, Math.min(1, dot / (magBa * magBc + 1e-8))));
    }
  }
  return angles; // 15 values
}

export async function classifyLandmarks(
  landmarks: Landmark[],
  targetLabel?: string
): Promise<ClassifyResult | null> {
  if (!session) await loadHandsignModel();

  const norm = normalize(landmarks);
  if (!norm) return null;

  const angles = computeAngles(norm);
  const flat = [...norm.flat(), ...angles]; // 78 features
  const tensor = new ort.Tensor('float32', new Float32Array(flat), [1, 78]);
  const result = await session!.run({ float_input: tensor });

  const keys = Object.keys(result);
  const labelIdx = Number(result[keys[0]].data[0]);
  const probs = result[keys[1]].data as Float32Array;
  const confidence = Math.max(...probs);
  const raw = labelMap![labelIdx];
  const label = ARSL_NORM[raw] ?? raw;

  return {
    label,
    confidence,
    correct: targetLabel ? label === targetLabel.toLowerCase() : null,
  };
}
