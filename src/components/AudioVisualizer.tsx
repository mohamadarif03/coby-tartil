import { useEffect, useRef } from 'react';

interface Props {
  stream: MediaStream | null;
  barCount?: number;
  color?: string;
}

export function AudioVisualizer({ stream, barCount = 32, color = '#800000' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!stream) return;

    const ctx = new AudioContext();
    const source = ctx.createMediaStreamSource(stream);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = barCount * 4;
    source.connect(analyser);

    const data = new Uint8Array(analyser.frequencyBinCount);
    const canvas = canvasRef.current!;
    const c = canvas.getContext('2d')!;
    let rafId: number;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(data);
      c.clearRect(0, 0, canvas.width, canvas.height);
      const barW = canvas.width / barCount;
      for (let i = 0; i < barCount; i++) {
        const h = (data[i] / 255) * canvas.height;
        c.fillStyle = color;
        c.fillRect(i * barW + 1, canvas.height - h, barW - 2, h);
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      source.disconnect();
      ctx.close();
    };
  }, [stream, barCount, color]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={48}
      className="w-full rounded-lg opacity-80"
    />
  );
}
