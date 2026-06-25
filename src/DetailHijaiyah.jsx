import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility';
import audioBaa from './hijaiyah/baa.mp3';
import { useRecorder } from './useRecorder';
import { transcribeAudio } from './audioService';

// Target letter info — hardcoded to Ba for now
const LETTER = { arabic: 'ب', name: 'Ba', nameAr: 'باء' };

function DetailHijaiyah() {
  const navigate = useNavigate();
  useAccessibility('Detail Huruf Hijaiyah');
  const { isRecording, start } = useRecorder();
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [speechResult, setSpeechResult] = useState(null);

  // only strip harakat (U+064B–U+065F), not base Arabic letters
  const stripDiacritics = (s) => s.replace(/[ً-ٟؐ-ؚٰ]/g, '');

  const playAudio = () => new Audio(audioBaa).play().catch(console.error);

  const handleBlob = async (blob) => {
    setIsTranscribing(true);
    setSpeechResult(null);
    try {
      const t = await transcribeAudio(blob);
      const clean = stripDiacritics(t);
      const target = stripDiacritics(LETTER.nameAr);
      const correct = clean.includes(target) || target.includes(clean);
      setSpeechResult({ correct, transcript: t });
    } catch (e) {
      setSpeechResult({ correct: false, error: true, transcript: e.message });
    } finally {
      setIsTranscribing(false);
    }
  };

  const toggleListening = async () => {
    if (isRecording || isTranscribing) return;
    setSpeechResult(null);
    await start(handleBlob);
  };

  const isListening = isRecording || isTranscribing;

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body flex">
      <Sidebar activeMenu="iqra" />

      {/* Main Content Area */}
      <main className="ml-72 p-6 md:p-12 pb-32 w-full" id="main-content" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-[#575c60]">
            <a className="hover:text-[#006b5c] cursor-pointer" onClick={() => navigate('/siswa')}>Beranda</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a className="hover:text-[#006b5c] cursor-pointer" onClick={() => navigate('/iqra')}>Iqra'</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a className="hover:text-[#006b5c] cursor-pointer" onClick={() => navigate('/iqra/hijaiyah')}>Hijaiyah</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#006b5c] font-bold">Ba</span>
          </nav>

          <div className="relative grid md:grid-cols-12 gap-8 items-start">
            {/* Center Content */}
            <div className="md:col-span-8 flex flex-col items-center">
              {/* Character Coby (Mobile) */}
              <div className="md:hidden w-40 h-auto mb-4">
                <img className="w-full h-auto object-contain" src={mascotImg} alt="Coby" />
              </div>

              {/* Main Letter Card */}
              <section className="w-full bg-[#ffffff] rounded-xl p-10 md:p-16 flex flex-col items-center shadow-[0_20px_50px_-12px_rgba(0,107,92,0.08)] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5de3fc]/20 rounded-full blur-3xl group-hover:bg-[#5de3fc]/30 transition-colors"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fad538]/20 rounded-full blur-3xl"></div>
                <div className="text-[160px] md:text-[220px] font-bold text-[#006b5c] mb-4 leading-none select-none drop-shadow-sm font-['Noto_Sans_Arabic']">
                  ب
                </div>
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-black text-[#2a2f32] mb-1 font-['Plus_Jakarta_Sans']">Ba</h1>
                  <p className="text-lg text-[#575c60] font-medium">Transliterasi: <span className="italic">Bâ</span></p>
                </div>
                
                {/* 3. Tambahkan event onClick={playAudio} di tombol ini */}
                <button 
                  aria-label="Dengarkan pengucapan huruf Ba" 
                  onClick={playAudio}
                  className="relative group flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 scale-0 group-active:scale-150 transition-transform duration-500 rounded-full"></div>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-lg">Dengarkan</span>
                </button>
              </section>

              {/* Exercise Section */}
              <section className="w-full mt-12 bg-[#ecf1f6] rounded-xl p-8 flex flex-col items-center text-center">
                <h2 className="text-2xl font-black text-[#2a2f32] mb-2 font-['Plus_Jakarta_Sans']">Sekarang Giliranmu!</h2>
                <p className="text-[#575c60] mb-8 max-w-xs font-['Plus_Jakarta_Sans']">Tekan tombol, lalu ucapkan huruf ini</p>
                <div className="flex flex-col items-center gap-6">
                  <button
                    aria-label={isListening ? 'Berhenti' : 'Mulai bicara'}
                    onClick={toggleListening}
                    className={`w-24 h-24 rounded-full flex items-center justify-center text-[#ffefee] shadow-lg hover:scale-105 transition-all group active:ring-8 active:ring-red-500/20 ${isListening ? 'bg-red-600 animate-pulse' : 'bg-[#b31b25]'}`}
                  >
                    <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform">{isListening ? 'stop' : 'mic'}</span>
                  </button>
                  {speechResult && (
                    <div className="text-center">
                      <p className={`font-bold text-lg ${speechResult.correct ? 'text-green-600' : 'text-red-500'}`}>
                        {speechResult.correct ? '✅ Benar!' : speechResult.error ? '❌ Error' : '❌ Coba lagi!'}
                      </p>
                      {speechResult.transcript && (
                        <p className="text-sm text-[#575c60] mt-1">Terdengar: <span className="font-bold">{speechResult.transcript}</span></p>
                      )}
                    </div>
                  )}
                  {/* Audio Wave Visualizer */}
                  <div className="flex items-center gap-1 h-8 opacity-40">
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full"></div>
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full" style={{ animationDelay: '0.2s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full" style={{ animationDelay: '0.4s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full" style={{ animationDelay: '0.1s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full" style={{ animationDelay: '0.3s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#006b5c] rounded-full" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                <div className="mt-6 text-sm font-semibold text-[#006b5c] opacity-0" role="status">
                  Perekaman aktif...
                </div>
              </section>
            </div>

            {/* Character Coby (Desktop) */}
            <div className="hidden md:block md:col-span-4 sticky top-12">
              <div className="relative mt-8">
                {/* Coby Word Bubble */}
                <div className="absolute -top-12 -left-8 glass-card border border-[#006b5c]/10 p-6 rounded-3xl shadow-xl z-10 max-w-[240px]">
                  <p className="text-[#2a2f32] font-bold text-lg leading-snug">"Suara 'Ba' terdengar seperti balon yang meletus! Ayo coba!"</p>
                  <div className="absolute -bottom-3 left-10 w-6 h-6 bg-white rotate-45"></div>
                </div>
                <img className="w-full h-auto object-contain relative z-0" alt="Coby Mascot" src={mascotImg} />
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="mt-16 flex justify-between items-center w-full">
            <button className="flex items-center gap-4 px-6 py-4 bg-[#ecf1f6] hover:bg-[#dde3e8] text-[#006b5c] font-black rounded-full transition-all hover:-translate-x-2">
              <span className="material-symbols-outlined">arrow_back</span>
              <div className="text-left leading-tight">
                <span className="text-[10px] uppercase opacity-50 block font-['Plus_Jakarta_Sans']">Sebelumnya</span>
                <span className="font-['Plus_Jakarta_Sans']">Alif</span>
              </div>
            </button>
            <button className="flex items-center gap-4 px-6 py-4 bg-[#006b5c] text-[#dbf8ff] font-black rounded-full transition-all hover:translate-x-2 shadow-lg shadow-[#006b5c]/20">
              <div className="text-right leading-tight">
                <span className="text-[10px] uppercase opacity-50 block font-['Plus_Jakarta_Sans']">Berikutnya</span>
                <span className="font-['Plus_Jakarta_Sans']">Ta</span>
              </div>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DetailHijaiyah;