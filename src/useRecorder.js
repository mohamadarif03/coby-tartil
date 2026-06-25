import { useState, useRef } from 'react';

export function useRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const mrRef = useRef(null);
  const chunksRef = useRef([]);

  const start = async (onBlob, maxMs = 4000) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunksRef.current = [];
    const mr = new MediaRecorder(stream);
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
      mr.stream.getTracks().forEach(t => t.stop());
      setIsRecording(false);
      onBlob(blob);
    };
    mrRef.current = mr;
    mr.start();
    setIsRecording(true);
    setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 2000);
  };

  return { isRecording, start };
}
