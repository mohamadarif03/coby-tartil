import { createFileRoute } from '@tanstack/react-router'
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/siswa/ayat-pendek/$surah/')({
  beforeLoad: requireStudentRole,
  component: DetailAyat,
})

import React, { useState, useRef } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import { useNavigate, useParams } from '@tanstack/react-router';
import useAccessibility from '@/hooks/use-accessibility'; // ADDED
import { analyzeRecitation } from '@/services/gemini-service'; // AI Analysis

function DetailAyat() {
  const navigate = useNavigate();
  const { surah } = useParams({ from: '/ayat-pendek/$surah' });
  useAccessibility('Detail Ayat'); // ADDED

  const verses = [
    {
      id: 1,
      arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
      transliteration: "Innaa a'thaynaaka al-kautsar",
      translation: "\"Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak\"",
      cobyFeedback: "Mashaa Allah! Bacaanmu indah sekali! 🌟"
    },
    {
      id: 2,
      arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
      transliteration: "Fa shalli lirabbika wanhar",
      translation: "\"Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah (sebagai ibadah dan mendekatkan diri kepada Allah)\"",
      cobyFeedback: "Hebat! Huruf Ra' nya terdengar tebal dan jelas! 🦅"
    },
    {
      id: 3,
      arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
      transliteration: "Inna syaani'aka huwal abtar",
      translation: "\"Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)\"",
      cobyFeedback: "Alhamdulillah, Surah Al-Kautsar selesai dihafal! 🎉"
    }
  ];

  const [currentVerse, setCurrentVerse] = useState(0);
  const verse = verses[currentVerse];
  const isFirst = currentVerse === 0;
  const isLast = currentVerse === verses.length - 1;

  const handleNext = () => {
    if (!isLast) setCurrentVerse(prev => prev + 1);
    else navigate({ to: '/ayat-pendek' });
  };

  const handlePrev = () => {
    if (isFirst) navigate({ to: '/ayat-pendek' });
    else setCurrentVerse(prev => prev - 1);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const playMurottal = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      // 108 adalah nomor surah Al-Kautsar
      const response = await fetch(`https://api.alquran.cloud/v1/ayah/108:${verse.id}/ar.alafasy`);
      const result = await response.json();
      
      if (result.code === 200 && result.data.audio) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        const audio = new Audio(result.data.audio);
        audioRef.current = audio;
        
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => {
          setIsPlaying(false);
          console.error("Gagal memutar audio.");
        };
        
        await audio.play();
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error fetching murottal:", error);
      setIsPlaying(false);
    }
  };

  const { isRecording, start } = useRecorder();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [speechResult, setSpeechResult] = useState(null);
  const isListening = isRecording || isAnalyzing;

  const stripDiacritics = (s) => s.replace(/[\u064B-\u065F\u0610-\u061A\u0670]/g, '');

  const handleBlob = async (blob) => {
    setIsAnalyzing(true);
    setSpeechResult(null);
    try {
      const transcript = await transcribeAudio(blob);
      const correct = stripDiacritics(transcript).includes(stripDiacritics(verse.arabic)) || stripDiacritics(verse.arabic).includes(stripDiacritics(transcript));
      setSpeechResult({ correct, transcript });
    } catch {
      setSpeechResult({ correct: false, transcript: '', error: true });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const toggleListening = async () => {
    if (isRecording || isAnalyzing) return;
    setSpeechResult(null);
    await start(handleBlob);
  };

  const displayFeedback = speechResult
    ? speechResult.correct ? verse.cobyFeedback : 'Hmm, coba sekali lagi ya! Bacaannya belum tepat. 🎤'
    : verse.cobyFeedback;

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] siswa-body min-h-screen flex">
      <Sidebar activeMenu="short-verses" />

      {/* Main Content */}
      <main className="relative flex flex-col flex-1 w-full min-h-screen p-8 overflow-hidden ml-0 lg:ml-72 lg:p-12" id="main-content" role="main">
        
        {/* TOP APP BAR */}
        <header className="flex items-center justify-between w-full mb-12">
          <div className="flex flex-col">
            <nav aria-label="Breadcrumb" className="text-sm font-medium text-[#575c60] flex items-center gap-2 mb-2">
              <a href="#" className="hover:text-[#800000] transition-colors" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
              <span className="text-xs material-symbols-outlined">chevron_right</span>
              <a href="#" className="hover:text-[#800000] transition-colors" onClick={(e) => { e.preventDefault(); navigate({ to: '/ayat-pendek' }); }}>Ayat Pendek</a>
              <span className="text-xs material-symbols-outlined">chevron_right</span>
              <span className="text-[#800000] font-bold">Al-Kautsar</span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button aria-label="Volume settings" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ecf1f6] text-[#800000] hover:bg-[#dde3e8] transition-colors">
              <span className="material-symbols-outlined">volume_up</span>
            </button>
            <button aria-label="Help" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ecf1f6] text-[#800000] hover:bg-[#dde3e8] transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
          </div>
        </header>

        <div className="flex flex-col flex-1 w-full max-w-6xl pb-24 mx-auto">
          
          {/* SURAH HEADER */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-5xl font-black text-[#800000] siswa-headline mb-2 tracking-tight">Al-Kautsar</h2>
              <div className="flex items-center gap-3">
                <span className="bg-[#ffc78e] text-[#6a4800] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Ayat {verse.id} dari {verses.length}</span>
                <div className="flex gap-2">
                  {verses.map((v, index) => (
                    <div key={v.id} className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentVerse ? 'bg-[#6a4800]' : 'bg-[#dde3e8]'}`}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-['Amiri'] text-7xl font-bold text-[#800000]">الكوثر</span>
            </div>
          </div>

          {/* CENTRAL STAGE: BENTO GRID INSPIRED ASYMMETRIC LAYOUT */}
          <div className="relative grid items-start flex-1 grid-cols-1 gap-8 md:grid-cols-12">
            
            {/* MAIN VERSE CARD */}
            <div className="md:col-span-8 bg-[#ffffff] rounded-2xl p-12 relative overflow-hidden group shadow-sm border border-transparent hover:border-[#dde3e8] transition-all">
              {/* Subtle Gold Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffc78e]/10 to-transparent pointer-events-none"></div>
              
              {/* Decorative Arabesque Mask */}
              <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] text-[#800000] pointer-events-none translate-x-1/2 -translate-y-1/2">
                <span className="material-symbols-outlined text-[12rem]">auto_stories</span>
              </div>
              
              <div className="relative z-10 flex flex-col items-center gap-12 text-center">
                <p aria-label="Arabic Verse Content" className="font-['Amiri'] text-[5.5rem] leading-[1.4] text-[#800000]" dir="rtl">
                  {verse.arabic}
                </p>
                <div className="max-w-2xl space-y-4">
                  <p aria-label="Transliteration" className="text-[#2a2f32] siswa-headline text-2xl font-bold tracking-tight">
                    {verse.transliteration}
                  </p>
                  <p aria-label="Translation" className="text-[#575c60] text-xl leading-relaxed italic">
                    {verse.translation}
                  </p>
                </div>
              </div>
            </div>

            {/* MASCOT & FEEDBACK ASYMMETRIC STACK */}
            <div className="flex flex-col gap-8 pt-8 md:col-span-4">
              {/* MASCOT */}
              <div className="relative flex items-center justify-center h-64 cursor-pointer">
                <div className={`absolute -z-10 w-48 h-48 rounded-full blur-3xl transition-colors duration-500 ${isRecording ? 'bg-red-400/30 animate-pulse' : isAnalyzing ? 'bg-yellow-400/30 animate-pulse' : 'bg-[#800000]/10'}`}></div>
                <img alt="Coby the Mascot" className={`w-48 h-auto object-contain drop-shadow-2xl filter transition-transform ${isRecording ? 'scale-110 animate-bounce' : 'hover:scale-105'}`} src='/maskot.png' />
              </div>
              
              {/* FEEDBACK BUBBLE */}
              <div className={`glass-bubble p-8 rounded-2xl shadow-xl border relative z-10 transition-all duration-500 ${isAnalyzing ? 'border-yellow-300/50 animate-pulse' : aiResult && !aiResult.error ? 'border-[#800000]/30' : 'border-[#dde3e8]/50 animate-bounce-subtle'}`}>
                
                {isAnalyzing ? (
                  // Loading state
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[#800000] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-[#800000] font-bold text-lg">Coby sedang mendengarkan... 🎧</p>
                  </div>
                ) : (
                  // Feedback content
                  <>
                    <div className="flex gap-1 mb-3">
                      {renderStars(displayRating)}
                    </div>
                    <p className="text-[#800000] font-bold text-lg leading-snug mb-2">
                      {displayFeedback}
                    </p>
                    
                    {/* Detail koreksi dari AI */}
                    {aiResult && aiResult.details && aiResult.details.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {aiResult.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-sm text-[#ffc78e] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                              {aiResult.error ? 'info' : 'tips_and_updates'}
                            </span>
                            <p className="text-sm text-[#575c60] leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Skor & Catatan Tajwid */}
                    {aiResult && !aiResult.error && aiResult.pronunciationScore > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#dde3e8]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-[#575c60] uppercase tracking-wider">Skor Pelafalan</span>
                          <span className="text-lg font-black text-[#800000]">{aiResult.pronunciationScore}/100</span>
                        </div>
                        <div className="h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-1000 rounded-full" 
                            style={{ 
                              width: `${aiResult.pronunciationScore}%`,
                              backgroundColor: aiResult.pronunciationScore >= 80 ? '#800000' : aiResult.pronunciationScore >= 50 ? '#ffc78e' : '#ef4444' 
                            }}
                          ></div>
                        </div>
                        {aiResult.tajweedNotes && (
                          <p className="mt-3 text-xs text-[#575c60] italic">
                            📖 {aiResult.tajweedNotes}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* FLOATING ACTIONS */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 md:col-span-12">
              <button 
                aria-label={isPlaying ? "Berhenti mendengarkan murottal" : "Dengarkan murottal"} 
                onClick={playMurottal}
                className="flex items-center gap-4 bg-[#800000] text-white px-10 py-5 rounded-full text-xl font-bold shadow-lg shadow-[#800000]/20 hover:scale-105 transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2"
              >
                <span className="text-3xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isPlaying ? 'stop_circle' : 'play_arrow'}
                </span>
                {isPlaying ? 'Berhenti' : 'Dengarkan'}
              </button>
              <button 
                aria-label={isRecording ? 'Berhenti merekam suara' : isAnalyzing ? 'Menunggu analisis AI' : 'Mulai merekam bacaan'} 
                onClick={toggleRecording}
                disabled={isAnalyzing}
                className={`flex items-center gap-4 px-10 py-5 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-red-500/20 animate-pulse' 
                    : 'bg-[#ffc78e] text-[#6a4800] shadow-[#ffc78e]/20'
                }`}
              >
                <span className="text-3xl material-symbols-outlined">
                  {isRecording ? 'stop' : isAnalyzing ? 'hourglass_top' : 'mic'}
                </span>
                {isRecording ? 'Berhenti Rekam' : isAnalyzing ? 'Menganalisis...' : 'Mulai Rekam'}
              </button>
              <button 
                aria-label="Beralih ke mode isyarat (kamera)" 
                onClick={() => navigate({ to: '/ayat-pendek/isyarat/al-kautsar' })}
                className="flex items-center gap-4 px-10 py-5 rounded-full text-xl font-bold shadow-lg hover:scale-105 transition-transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 bg-[#ffd700]/20 text-[#6a4800] border-2 border-[#ffd700]/30 hover:bg-[#ffd700]/30"
              >
                <span className="text-3xl material-symbols-outlined">sign_language</span>
                Mode Isyarat
              </button>
            </div>
          </div>

          {/* KEYBOARD HINTS (ACCESSIBILITY) */}
          <div className="fixed z-10 flex flex-col gap-3 opacity-50 pointer-events-none bottom-32 right-12">
            <div className="flex items-center justify-end gap-2">
              <span className="px-2 py-1 bg-[#dde3e8] text-[#2a2f32] rounded text-[10px] font-mono font-bold">P</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#575c60]">Play</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="px-2 py-1 bg-[#dde3e8] text-[#2a2f32] rounded text-[10px] font-mono font-bold">R</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#575c60]">Record</span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="px-2 py-1 bg-[#dde3e8] text-[#2a2f32] rounded text-[10px] font-mono font-bold">ESC</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#575c60]">Exit</span>
            </div>
          </div>

          {/* BOTTOM NAVIGATION */}
          <footer className="mt-16 pt-8 border-t border-[#dde3e8] flex flex-wrap items-center justify-between gap-6">
            <button aria-label="Go back to surah list" onClick={handlePrev} className="flex items-center gap-3 text-[#575c60] font-bold px-8 py-4 rounded-xl hover:bg-[#ffffff] transition-colors group">
              <span className="transition-transform material-symbols-outlined group-hover:-translate-x-1">arrow_back</span>
              {isFirst ? "Kembali" : "Ayat Sebelumnya"}
            </button>
            
            <div className="flex items-center gap-1">
              {isRecording ? (
                // Animasi pulse saat merekam
                <>
                  <div className="w-1 h-4 rounded-full bg-red-500/60 animate-pulse"></div>
                  <div className="w-1 h-8 rounded-full bg-red-500/80 animate-pulse" style={{animationDelay: '100ms'}}></div>
                  <div className="w-1 h-12 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
                  <div className="w-1 h-6 rounded-full bg-red-500/70 animate-pulse" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1 h-2 rounded-full bg-red-500/40 animate-pulse" style={{animationDelay: '50ms'}}></div>
                  <span className="ml-2 text-xs font-bold tracking-widest text-red-500 uppercase animate-pulse">REC</span>
                </>
              ) : (
                <>
                  <div className="w-1 h-4 bg-[#800000]/30 rounded-full"></div>
                  <div className="w-1 h-8 bg-[#800000]/40 rounded-full"></div>
                  <div className="w-1 h-12 bg-[#800000] rounded-full"></div>
                  <div className="w-1 h-6 bg-[#800000]/50 rounded-full"></div>
                  <div className="w-1 h-2 bg-[#800000]/20 rounded-full"></div>
                </>
              )}
            </div>
            
            <button aria-label="Next verse" onClick={handleNext} className="flex items-center gap-3 bg-[#ffffff] text-[#800000] font-bold px-8 py-4 rounded-xl hover:bg-[#800000] hover:text-white shadow-sm hover:shadow-md transition-all group border border-transparent">
              {isLast ? "Selesai Hafalan" : "Ayat Berikutnya"}
              {isLast ? <span className="material-symbols-outlined">done_all</span> : <span className="transition-transform material-symbols-outlined group-hover:translate-x-1">arrow_forward</span>}
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default DetailAyat;
