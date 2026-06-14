/**
 * Gemini AI Service — Analisis Bacaan Al-Qur'an
 * 
 * Mengirim audio rekaman user ke Gemini API untuk dianalisis
 * kualitas bacaan, tajwid, dan makhraj-nya.
 */

// TODO: Ganti dengan API key asli dari Google AI Studio (https://aistudio.google.com/apikey)
const GEMINI_API_KEY = 'AIzaSyAM8HL6tSFgKAeaooYZXFkZzrUxvrBly0k';

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Menganalisis rekaman bacaan Al-Qur'an menggunakan Gemini AI
 * 
 * @param {Blob} audioBlob - Blob audio dari MediaRecorder (webm/ogg)
 * @param {string} expectedArabic - Teks Arab yang seharusnya dibaca
 * @param {string} transliteration - Transliterasi Latin untuk referensi
 * @returns {Promise<{rating: number, feedback: string, details: string[]}>}
 */
export async function analyzeRecitation(audioBlob, expectedArabic, transliteration) {
  try {
    // 1. Convert audio Blob ke base64
    const base64Audio = await blobToBase64(audioBlob);

    // 2. Tentukan MIME type dari blob
    const mimeType = audioBlob.type || 'audio/webm';

    // 3. Buat prompt untuk analisis bacaan
    const prompt = `Kamu adalah guru mengaji Al-Qur'an bernama Coby yang ahli dalam ilmu tajwid dan makhrajul huruf. Kamu sedang menemani seorang anak mengaji Al-Qur'an.

Coba dengarkan audio rekaman anak ini.

Ayat yang SEHARUSNYA mereka baca adalah:
- Teks Arab: ${expectedArabic}
- Transliterasi: ${transliteration}

Tugas kamu:
1. Dengarkan audio secara saksama.
2. VERIFIKASI DULU: Apakah anak ini membaca ayat yang benar sesuai teks di atas? Jika ternyata mereka membaca surah/ayat lain (misal membaca Al-Fatihah, padahal teksnya Al-Kautsar), kamu harus langsung mengoreksinya dengan ramah.
3. Jika ayatnya benar, evaluasi tajwid, makhraj, dan kelancarannya.

PENTING: Jawab HANYA dalam format JSON berikut (tanpa markdown, tanpa backtick):
{
  "rating": <angka 1-5>,
  "feedback": "<komentar singkat dan menyemangati dalam bahasa Indonesia, maksimal 2 kalimat. Coby menyapa user dengan ramah.>",
  "details": ["<koreksi tajwid/makhraj 1 atau pujian>", "<koreksi tajwid/makhraj 2 atau peringatan jika salah surah>"],
  "pronunciation_score": <angka 1-100>,
  "tajweed_notes": "<catatan tajwid singkat jika ada>"
}

Aturan Penilaian:
- Jika anak membaca AYAT / SURAH YANG SALAH: rating maksimal 1 atau 2, pronunciation_score maksimal 20. Feedback harus berbunyi seperti "Hmm, sepertinya yang kamu baca itu bukan ayat yang ada di layar. Yuk kita coba baca ayat ini lagi!"
- Jika ayatnya benar tapi tajwid/makhraj salah: beri rating 3 atau 4, tunjukkan di 'details' bagian mana yang perlu diperbaiki.
- Jika sempurna: beri rating 5, pronunciation_score 90-100.
- Ingat, suaramu harus ramah, penuh semangat, dan sabar (seperti guru untuk anak-anak).`;

    // 4. Kirim ke Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Audio,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Gemini API Error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();

    // 5. Parse response dari Gemini
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textResponse) {
      throw new Error('Tidak ada respons dari Gemini');
    }

    // Bersihkan response — hapus markdown code block jika ada
    const cleanedResponse = textResponse
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const result = JSON.parse(cleanedResponse);

    return {
      rating: Math.min(5, Math.max(1, result.rating || 3)),
      feedback: result.feedback || 'Terus berlatih ya!',
      details: result.details || [],
      pronunciationScore: result.pronunciation_score || 50,
      tajweedNotes: result.tajweed_notes || '',
    };
  } catch (error) {
    console.error('Error analyzing recitation:', error);

    // Fallback jika API gagal
    return {
      rating: 3,
      feedback: 'Maaf, Coby belum bisa mendengar dengan jelas. Coba rekam lagi ya! 🎤',
      details: ['Pastikan mikrofon kamu berfungsi dengan baik', 'Coba rekam di tempat yang tenang'],
      pronunciationScore: 0,
      tajweedNotes: '',
      error: true,
    };
  }
}

/**
 * Mengubah Blob menjadi base64 string (tanpa prefix data URI)
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Hapus prefix "data:audio/webm;base64," agar hanya tersisa base64 murni
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
