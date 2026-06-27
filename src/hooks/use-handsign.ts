import { useEffect, useRef, useState } from 'react';
import { loadHandsignModel, classifyLandmarks } from '@/services/handsign-service';

export function useHandsign(targetLetter: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [statusMsg, setStatusMsg] = useState('Menyiapkan kamera...');
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    if (!videoElement || !canvasElement) return;
    const canvasCtx = canvasElement.getContext('2d')!;

    if (!window.Hands || !window.Camera) {
      setStatusMsg('Memuat model kecerdasan buatan...');
      setTimeout(() => setStatusMsg('Mohon muat ulang jika loading terlalu lama.'), 5000);
      return;
    }

    // ponytail: model may not exist yet (pre-training); fall back silently
    loadHandsignModel().catch(() => {});

    const hands = new window.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0, // must match training/01_extract_landmarks.py
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results: any) => {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.translate(canvasElement.width, 0);
      canvasCtx.scale(-1, 1);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks?.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
          window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 1 });
          window.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 1, radius: 2 });

          const now = Date.now();
          if (now - lastUpdateRef.current < 1000) continue;
          lastUpdateRef.current = now;

          classifyLandmarks(landmarks, targetLetter).then((res) => {
            if (!res) return;
            const label = targetLetter.charAt(0).toUpperCase() + targetLetter.slice(1);
            if (res.correct) {
              setStatusMsg(`✅ Gestur ${label} Terdeteksi! (${(res.confidence * 100).toFixed(0)}%)`);
            } else {
              setStatusMsg(`Terdeteksi: ${res.label} — coba lagi`);
            }
          }).catch(() => {});
        }
      } else {
        setStatusMsg('Memindai gestur tangan...');
      }
      canvasCtx.restore();
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        if (!canvasElement) return;
        // ponytail: only resize on dimension change, not every frame
        if (canvasElement.width !== videoElement.videoWidth) canvasElement.width = videoElement.videoWidth;
        if (canvasElement.height !== videoElement.videoHeight) canvasElement.height = videoElement.videoHeight;
        await hands.send({ image: videoElement });
      },
      width: 320,
      height: 240,
    });

    camera.start().catch((err: Error) => {
      console.error(err);
      setStatusMsg('Izin kamera ditolak');
    });

    return () => {
      camera.stop();
      hands.close();
    };
  }, [targetLetter]);

  return { statusMsg, videoRef, canvasRef };
}
