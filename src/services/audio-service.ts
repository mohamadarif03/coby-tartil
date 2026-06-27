const API_URL = 'https://crtal-cobytartil-audio-api.hf.space/transcribe';

export async function transcribeAudio(blob: Blob): Promise<string> {
  const form = new FormData();
  const audioBlob = new Blob([blob], { type: 'audio/webm' });
  form.append('file', audioBlob, 'recording.webm');
  const res = await fetch(API_URL, { method: 'POST', body: form });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body}`);
  }
  const json = await res.json();
  if (!json.text) throw new Error(`Unexpected response: ${JSON.stringify(json)}`);
  return json.text.trim();
}
