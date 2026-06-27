const refCache = new Map<string, Uint8Array>();
const USER_THRESH = 0.82;
const FONT_THRESH = 0.5;
const MATCH_THRESHOLD = 0.3;
const MIN_INK = 30;

function toBinary(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  thresh: number,
  checkAlpha: boolean
): { bin: Uint8Array; inkCount: number } {
  const src = ctx.getImageData(0, 0, w, h).data;
  const bin = new Uint8Array(w * h);
  let inkCount = 0;
  for (let i = 0; i < w * h; i++) {
    if (checkAlpha && src[i * 4 + 3] < 128) continue;
    const g = (0.299 * src[i * 4] + 0.587 * src[i * 4 + 1] + 0.114 * src[i * 4 + 2]) / 255;
    if (g < thresh) { bin[i] = 1; inkCount++; }
  }
  return { bin, inkCount };
}

function dilate(bin: Uint8Array, w: number, h: number, r: number): Uint8Array {
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (!bin[y * w + x]) continue;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const ny = y + dy, nx = x + dx;
      if (ny >= 0 && ny < h && nx >= 0 && nx < w) out[ny * w + nx] = 1;
    }
  }
  return out;
}

function dice(a: Uint8Array, b: Uint8Array, n: number): number {
  let inter = 0, sa = 0, sb = 0;
  for (let i = 0; i < n; i++) {
    if (a[i]) sa++;
    if (b[i]) sb++;
    if (a[i] && b[i]) inter++;
  }
  return sa + sb === 0 ? 0 : (2 * inter) / (sa + sb);
}

// Reference rendered at guide size (320px CSS) scaled to 1/4, centered
async function getReference(arabicChar: string, dw: number, dh: number): Promise<Uint8Array> {
  const key = `${arabicChar}_${dw}_${dh}`;
  if (refCache.has(key)) return refCache.get(key)!;

  await document.fonts.load("80px 'Noto Naskh Arabic'");

  const off = document.createElement('canvas');
  off.width = dw; off.height = dh;
  const ctx = off.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, dw, dh);
  ctx.fillStyle = '#000';
  ctx.font = "bold 80px 'Noto Naskh Arabic', serif";
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(arabicChar, dw / 2, dh / 2);

  const { bin } = toBinary(ctx, dw, dh, FONT_THRESH, false);
  refCache.set(key, bin);
  return bin;
}

export async function classifyCanvas(
  canvas: HTMLCanvasElement,
  arabicChar: string
): Promise<{ score: number; correct: boolean }> {
  const dpr = window.devicePixelRatio || 1;
  const dw = Math.round(canvas.width / dpr / 4);
  const dh = Math.round(canvas.height / dpr / 4);

  const userOff = document.createElement('canvas');
  userOff.width = dw; userOff.height = dh;
  const userCtx = userOff.getContext('2d')!;
  userCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, dw, dh);

  const { bin: rawUser, inkCount } = toBinary(userCtx, dw, dh, USER_THRESH, true);
  if (inkCount < MIN_INK) return { score: 0, correct: false };

  const ref = await getReference(arabicChar, dw, dh);
  const userBin = dilate(rawUser, dw, dh, 3);
  const refBin = dilate(ref, dw, dh, 2);
  const score = dice(userBin, refBin, dw * dh);
  return { score, correct: score >= MATCH_THRESHOLD };
}

// ponytail: no-op kept for API consistency with future model-based swap
export function loadWritingModel(): Promise<void> { return Promise.resolve(); }
