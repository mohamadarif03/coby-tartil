import { useState, useRef } from 'react';

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const mrRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const start = async (onBlob: (blob: Blob) => void, maxMs = 2000): Promise<void> => {
    const s = await navigator.mediaDevices.getUserMedia({ audio: true });
    setStream(s);
    chunksRef.current = [];
    const mr = new MediaRecorder(s);
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
      mr.stream.getTracks().forEach((t) => t.stop());
      setStream(null);
      setIsRecording(false);
      onBlob(blob);
    };
    mrRef.current = mr;
    mr.start();
    setIsRecording(true);
    setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, maxMs);
  };

  return { isRecording, stream, start };
}
