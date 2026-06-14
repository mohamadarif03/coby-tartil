import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, Outlet } from '@tanstack/react-router';
import './index.css';
import maskot from './assets/maskot.png';
import logo from './assets/logo.png';

function App() {
  const navigate = useNavigate();
  const [showCobyModal, setShowCobyModal] = useState(false);
  const [userCondition, setUserCondition] = useState(localStorage.getItem('cobytartil_user_condition') || null);
  const modalTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const condition = localStorage.getItem('cobytartil_user_condition');
    if (!condition) {
      setShowCobyModal(true);
    } 
  }, []);

  useEffect(() => {
    if (!showCobyModal) return;

    const focusTimer = setTimeout(() => {
      if (modalTitleRef.current) {
        modalTitleRef.current.focus();
      }
    }, 100);

    const playIntro = () => {
      if ((window as any).isCobyIntroPlayed) return;
      (window as any).isCobyIntroPlayed = true;

      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance("Halo selamat datang! Aku Coby, asistenmu. Tolong pilih kondisimu. Tekan tombol Tab pada keyboard untuk menavigasi pilihan, dan Enter untuk memilih.");
      msg.lang = 'id-ID';
      
      (window as any).isCobyIntroPlaying = true;
      msg.onend = () => { (window as any).isCobyIntroPlaying = false; };
      msg.onerror = () => { (window as any).isCobyIntroPlaying = false; };

      window.speechSynthesis.speak(msg);

      window.removeEventListener('keydown', playIntro, true);
      window.removeEventListener('click', playIntro, true);
    };

    window.addEventListener('keydown', playIntro, true);
    window.addEventListener('click', playIntro, true);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', playIntro, true);
      window.removeEventListener('click', playIntro, true);
    };
  }, [showCobyModal]);

  const handleSelectCondition = (condition: string) => {
    localStorage.setItem('cobytartil_user_condition', condition);
    setUserCondition(condition);
    setShowCobyModal(false);
    
    let ucapan = "";
    if (condition === 'tunanetra') ucapan = "Tuna Netra. Mode suara penuh aktif. Aplikasi sudah disesuaikan.";
    else if (condition === 'tunarungu') ucapan = "Tuna Rungu atau Wicara. Mode visual interaktif aktif.";
    else ucapan = "Reguler. Selamat belajar bersama Coby!";

    const msg = new SpeechSynthesisUtterance(`Kamu memilih mode ${ucapan}`);
    msg.lang = 'id-ID';
    window.speechSynthesis.speak(msg);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;
      const condition = localStorage.getItem('cobytartil_user_condition');
      if (condition && condition !== 'tunanetra') return;

      if (e.key === 'h' || e.key === 'H') {
        window.speechSynthesis.cancel();
        const help = new SpeechSynthesisUtterance(
          `Kamu ada di halaman utama CobyTartil. Gunakan Tab untuk berpindah antar tombol. Tekan Enter untuk memilih. Tekan H kapanpun butuh bantuan.`
        );
        help.lang = 'id-ID';
        help.rate = 0.85;
        window.speechSynthesis.speak(help);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.tagName === 'A' || el.tagName === 'BUTTON';
      const isFocusable = el.hasAttribute('tabindex') || el.hasAttribute('role');
      if (!isInteractive && !isFocusable) return;

      const condition = localStorage.getItem('cobytartil_user_condition');
      if (condition && condition !== 'tunanetra') return;

      if ((window as any).isCobyIntroPlaying) return;

      const label = el.getAttribute('aria-label') || el.textContent?.trim();
      if (!label) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(label);
      utterance.lang = 'id-ID';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const modal = document.getElementById('coby-modal');
      if (!modal) return;
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#800000] focus:text-white focus:rounded-full focus:font-bold focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2"
      >
        Lewati navigasi, langsung ke konten
      </a>

      <header>
        <nav className="fixed top-0 w-full z-50 bg-black/10 backdrop-blur-md border-b border-white/10 transition-colors duration-300" aria-label="Navigasi Utama">
          <div className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <img src={logo} alt="CobyTartil Logo" className="w-10 h-10 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <span className="text-2xl font-bold tracking-tighter text-white font-headline">CobyTartil</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a className="Lexend editorial scale text-lg font-medium tracking-tight text-teal-300 font-semibold border-b-2 border-teal-300 pb-1 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#fitur-section" aria-current="page">Fitur</a>
              <a className="Lexend editorial scale text-lg font-medium tracking-tight text-white/90 hover:text-teal-200 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#cara-belajar">Cara Belajar</a>
              <a className="Lexend editorial scale text-lg font-medium tracking-tight text-white/90 hover:text-teal-200 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#tentang">Tentang</a>
              <a className="Lexend editorial scale text-lg font-medium tracking-tight text-white/90 hover:text-teal-200 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#kontak">Kontak</a>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => navigate({ to: '/siswa' })} className="px-6 py-2 rounded-full border border-outline-variant/40 text-white font-medium hover:bg-white/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Masuk ke dashboard siswa">Masuk</button>
            </div>
          </div>
        </nav>
      </header>

      <div className="fixed bottom-32 left-8 z-40 max-w-xs bg-surface-container-highest/80 backdrop-blur-md p-4 rounded-lg border border-outline-variant/20 shadow-2xl" role="status" aria-live="polite">
        <div className="flex gap-3 items-start">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">spatial_audio_off</span>
          <p className="text-xs leading-relaxed opacity-80">Selamat datang di aplikasi belajar mengaji. Gunakan tombol Tab untuk berpindah menu dan tekan Enter untuk memilih.</p>
        </div>
      </div>

      <button aria-label="Aktifkan Panduan Suara" className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform group focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
        <span className="material-symbols-outlined text-3xl group-hover:animate-pulse" aria-hidden="true">record_voice_over</span>
      </button>

      <main id="main-content" role="main">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id="live-region"
        />

        <section className="relative min-h-[972px] flex items-center overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d0000] via-[#690000] to-[#800000]" aria-hidden="true"></div>
          <div className="absolute inset-0 hero-pattern opacity-40" aria-hidden="true"></div>
          
          <div className="relative z-10 w-full px-8 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 pt-16">
            <div className="text-left w-full md:w-1/2">
              <div className="inline-block px-4 py-2 bg-white/10 rounded-full backdrop-blur-md mb-6 border border-white/20 shadow-lg" aria-hidden="true">
                 <span className="text-teal-100 font-medium text-sm tracking-widest uppercase">Halo, Aku Coby! 👋</span>
              </div>
              <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1] font-headline drop-shadow-lg">
                Belajar Mengaji <span className="text-[#ffd700]">Inklusif</span><br/>Tanpa Batas
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-xl mb-12 font-light leading-relaxed">
                Platform belajar Al-Qur'an interaktif yang ramah untuk semua. Dilengkapi asisten <strong className="text-white">Coby</strong>, panduan audio khusus <span className="underline decoration-teal-400 decoration-2">Tuna Netra</span>, pemosisi visual untuk <span className="underline decoration-teal-400 decoration-2">Tuna Rungu/Wicara</span>, serta mode <span className="underline decoration-teal-400 decoration-2">Reguler</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button onClick={() => navigate({ to: '/siswa' })} className="px-8 py-4 bg-white text-[#800000] text-lg font-bold rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#ffd700]" aria-label="Mulai belajar mengaji sekarang"> 
                  Mulai Belajar
                </button>
                <button className="flex items-center gap-3 px-6 py-4 text-white font-medium group hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffd700]" aria-label="Ubah profil kebutuhan belajar" onClick={() => setShowCobyModal(true)}>
                  <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/20 transition-colors" aria-hidden="true">
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">settings_accessibility</span>
                  </span>
                  Ubah Profil Akses
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center mt-20 md:mt-0 relative" aria-hidden="true">
              <div className="absolute w-[400px] h-[400px] bg-[#ffd700]/20 blur-[100px] rounded-full z-0 pointer-events-none"></div>
              <img src={maskot} alt="Karakter Coby yang Lucu" className="w-[85%] max-w-[450px] relative z-10 hero-coby drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
          
          <div className="absolute -bottom-24 -left-24 w-96 h-96 border border-white/5 rounded-full" aria-hidden="true"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 border border-white/5 rounded-full" aria-hidden="true"></div>
        </section>

        <div className="bg-[#f8fdfc] rounded-[3rem] -mt-16 relative z-20 pt-32 pb-16 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
          <section id="fitur-section" className="px-8 max-w-7xl mx-auto py-24 relative" aria-labelledby="fitur-heading">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#ffd700]/10 blur-[120px] rounded-full" aria-hidden="true"></div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 relative">
              <div className="max-w-2xl">
                <h2 id="fitur-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-[#800000] to-[#690000] bg-clip-text text-transparent font-headline">
                  Metode Belajar yang Menenangkan
                </h2>
                <p className="text-[#800000] text-lg leading-relaxed">
                  Kami merancang pengalaman yang mengutamakan fokus dan ketenangan dalam memahami setiap huruf hijaiyah.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-12 relative overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-8" aria-hidden="true">
                    <span className="material-symbols-outlined text-3xl text-[#800000]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                      neurology
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#4d0000] font-headline">
                    Pengenalan Suara AI
                  </h3>
                  <p className="text-[#800000] text-lg max-w-md leading-relaxed">
                    Teknologi kecerdasan buatan kami memberikan feedback real-time terhadap makhraj dan tajwid Anda saat melafalkan ayat.
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-10 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-6" aria-hidden="true">
                    <span className="material-symbols-outlined text-[#800000] text-2xl" aria-hidden="true">
                      menu_book
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 font-headline">
                    Modul Interaktif
                  </h3>
                  <p className="text-gray-600">
                    Kurikulum terstruktur mulai dari Iqra hingga Tahsin tingkat lanjut.
                  </p>
                </div>
                <a className="mt-8 flex items-center gap-2 text-[#800000] font-medium hover:gap-3 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#" aria-label="Pelajari modul interaktif lebih lanjut">
                  Pelajari Modul
                  <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                </a>
              </div>

              <div className="bg-gradient-to-br from-[#800000] to-[#690000] text-white rounded-2xl p-10 flex flex-col items-center text-center justify-center shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 backdrop-blur" aria-hidden="true">
                  <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                    hearing
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-headline">
                  Fokus Audio
                </h3>
                <p className="opacity-90">
                  Bebas dari distraksi visual untuk pendengaran yang lebih tajam.
                </p>
              </div>

              <div className="md:col-span-2 rounded-2xl overflow-hidden relative group shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="Tampilan desain aplikasi CobyTartil yang minimalis dan aksesibel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF5nXtcCgteEr0SjgLVHkwxWfq2S2EACI7gVGooiekn9MLXJEL4uh83rbRt-4rIy2bIsRQJEi5OqzyGmB8mFZQ2Ri_vr88JZVmqDawVpaDfLULkGfYA6qy16RAhwR7k1h8s6wAFp5zF_a7-MGadT4wvW6HwpCqe13yMVzXDVRhc0LuRtaJN4O0lNYqBFlZfOl7TpXQ80obda-6vGI6UzAXMWrYpv1VsXHuy5aH5TtFvXjHtPLKayQvHe93JAxUFAz4Vwoa7bkh62A"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex items-end p-10" aria-hidden="true">
                  <h3 className="text-2xl font-bold text-white font-headline">
                    Desain Minimalis &amp; Aksesibel
                  </h3>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-16 mt-20 border-y border-red-100 shadow-sm relative overflow-hidden" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Statistik Dampak CobyTartil</h2>
            <div className="absolute inset-0 hero-pattern opacity-[0.03]" aria-hidden="true"></div>
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#4d0000] mb-2 font-headline" aria-label="Lebih dari lima puluh ribu pelajar aktif">50k+</div>
                <div className="text-[#800000] font-bold uppercase tracking-widest text-xs">Pelajar Aktif</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#800000] mb-2 font-headline" aria-label="Lebih dari seratus ustadz terverifikasi">100+</div>
                <div className="text-[#800000] font-bold uppercase tracking-widest text-xs">Ustadz Terverifikasi</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-[#4d0000] mb-2 font-headline" aria-label="Rating empat koma sembilan dari lima">4.9/5</div>
                <div className="text-[#800000] font-bold uppercase tracking-widest text-xs">Rating Pengguna</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-amber-500 mb-2 font-headline" aria-label="Lebih dari dua belas juta ayat dibaca">12M+</div>
                <div className="text-[#800000] font-bold uppercase tracking-widest text-xs">Ayat Dibaca</div>
              </div>
            </div>
          </section>
        </div>

        <section className="py-32 flex flex-col items-center text-center px-8 text-white relative z-10" aria-labelledby="quote-heading" id="tentang">
          <div className="w-16 h-1 bg-[#ffd700] mb-12" aria-hidden="true"></div>
          <h2 id="quote-heading" className="text-3xl md:text-5xl font-bold max-w-4xl leading-tight italic font-headline">
            "Digitalisasi pendidikan agama tidak harus mengorbankan sakralitasnya. CobyTartil adalah jembatan antara tradisi dan masa depan."
          </h2>
          <p className="mt-8 text-white/80 font-medium tracking-widest uppercase text-sm">— Dr. Ahmad Fauzi, Dewan Penasihat Syariah</p>
        </section>
      </main>

      {showCobyModal && (
        <div id="coby-modal" onKeyDown={handleModalKeyDown} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-[#f8fdfc] w-full max-w-4xl rounded-[2.5rem] shadow-[0_0_80px_rgba(128,0,0,0.4)] overflow-hidden flex flex-col md:flex-row transform transition-all border border-[#800000]/10">
            <div className="bg-gradient-to-br from-[#800000] via-[#690000] to-[#4d0000] w-full md:w-5/12 p-12 flex flex-col items-center justify-center relative z-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-400/20 via-transparent to-transparent"></div>
              <img src={maskot} alt="Coby Tersenyum" className="h-56 object-contain relative z-10 hero-coby drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
              <div className="mt-8 text-center relative z-10">
                <h3 className="text-white text-4xl font-bold font-headline mb-2">Halo! 👋</h3>
                <p className="text-red-100/90 text-md tracking-wider uppercase font-medium">Asisten Coby</p>
              </div>
            </div>
            
            <div className="p-10 md:p-14 md:w-7/12 flex flex-col justify-center bg-white relative z-10">
              <div className="absolute left-0 top-0 bottom-0 w-16 -translate-x-full hidden md:block text-white">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
                   <path d="M100,0 Q0,50 100,100 Z" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 right-0 h-10 -translate-y-full md:hidden text-white">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-current">
                   <path d="M0,100 Q50,0 100,100 Z" />
                </svg>
              </div>

              <h2 id="modal-title" ref={modalTitleRef} className="text-3xl font-bold text-[#4d0000] mb-4 font-headline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:rounded-lg p-1" tabIndex={-1}>
                Bantu aku mengenalmu!
              </h2>
              <p className="text-[#800000]/80 mb-10 text-base leading-relaxed">
                Pilih kondisimu agar aku bisa menyesuaikan tampilan dan fitur aplikasi ini menjadi yang terbaik untukmu.
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => handleSelectCondition('tunanetra')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group flex items-center gap-5 ${userCondition === 'tunanetra' ? 'border-[#800000] bg-red-50 shadow-md transform scale-[1.02]' : 'border-red-50 hover:border-red-200 hover:bg-red-50/30 bg-red-50/10'}`}
                  aria-label="Saya Tuna Netra"
                >
                  <div className={`p-3 rounded-full transition-colors ${userCondition === 'tunanetra' ? 'bg-[#800000] text-white' : 'bg-red-100 text-[#800000] group-hover:bg-red-200'}`}>
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">blind</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#4d0000] text-lg">Tuna Netra</div>
                    <div className="text-sm text-[#800000]/70 mt-1">Panduan suara & Screen Reader penuh</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleSelectCondition('tunarungu')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group flex items-center gap-5 ${userCondition === 'tunarungu' ? 'border-[#800000] bg-red-50 shadow-md transform scale-[1.02]' : 'border-red-50 hover:border-red-200 hover:bg-red-50/30 bg-red-50/10'}`}
                  aria-label="Saya Tuna Rungu atau Tuna Wicara"
                >
                  <div className={`p-3 rounded-full transition-colors ${userCondition === 'tunarungu' ? 'bg-[#800000] text-white' : 'bg-red-100 text-[#800000] group-hover:bg-red-200'}`}>
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">sign_language</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#4d0000] text-lg">Tuna Rungu/Wicara</div>
                    <div className="text-sm text-[#800000]/70 mt-1">Panduan visual tajam & gestur isyarat</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleSelectCondition('reguler')}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group flex items-center gap-5 ${userCondition === 'reguler' ? 'border-[#800000] bg-red-50 shadow-md transform scale-[1.02]' : 'border-red-50 hover:border-red-200 hover:bg-red-50/30 bg-red-50/10'}`}
                  aria-label="Saya pengguna Reguler"
                >
                  <div className={`p-3 rounded-full transition-colors ${userCondition === 'reguler' ? 'bg-[#800000] text-white' : 'bg-red-100 text-[#800000] group-hover:bg-red-200'}`}>
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">face_6</span>
                  </div>
                  <div>
                    <div className="font-bold text-[#4d0000] text-lg">Reguler (Normal)</div>
                    <div className="text-sm text-[#800000]/70 mt-1">Pengalaman belajar standar</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 flex justify-end">
                {userCondition && (
                  <button 
                    onClick={() => setShowCobyModal(false)}
                    className="px-6 py-2 text-[#800000] font-bold hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Tutup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#4d0000] dark:bg-[#4d0000]" role="contentinfo">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-0">
            <span className="text-xl font-bold text-[#ffd700] font-headline">CobyTartil</span>
            <p className="Lexend body-lg line-height-1.6 mt-4 text-red-100/60 max-w-xs">
              © 2024 CobyTartil. Dedicated to accessible spiritual growth.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-8 md:gap-12" aria-label="Navigasi Footer">
            <a className="text-red-100/60 hover:text-[#ffd700] transition-all opacity-80 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#">Kebijakan Privasi</a>
            <a className="text-red-100/60 hover:text-[#ffd700] transition-all opacity-80 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#">Syarat &amp; Ketentuan</a>
            <a className="text-red-100/60 hover:text-[#ffd700] transition-all opacity-80 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#">Aksesibilitas</a>
          </nav>
          <div className="mt-8 md:mt-0 flex gap-6">
            <a className="w-10 h-10 rounded-full border border-red-800/20 flex items-center justify-center hover:bg-red-400/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#" aria-label="Kunjungi website kami">
              <span className="material-symbols-outlined text-[#ffd700] text-lg" aria-hidden="true">public</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-red-800/20 flex items-center justify-center hover:bg-red-400/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#" aria-label="Hubungi kami via email">
              <span className="material-symbols-outlined text-[#ffd700] text-lg" aria-hidden="true">mail</span>
            </a>
          </div>
        </div>
      </footer>
      <Outlet />
    </>
  );
}

export default App;
