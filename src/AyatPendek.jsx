import React from 'react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility'; // ADDED

function AyatPendek() {
  const navigate = useNavigate();
  useAccessibility('Daftar Ayat Pendek'); // ADDED

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] siswa-body min-h-screen flex">
      <Sidebar activeMenu="short-verses" />

      {/* Main Content Area */}
      <main className="ml-72 p-8 lg:p-12 w-full relative overflow-hidden flex flex-col min-h-screen" id="main-content" role="main"> {/* ADDED */}
        {/* Subtle Background Motif */}
        <div className="absolute inset-0 arabesque-pattern pointer-events-none"></div>

        {/* Content Container */}
        <div className="w-full relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm font-medium opacity-60">
            <a className="hover:text-[#006b5c] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate('/siswa'); }}>Beranda</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#006b5c] font-bold">Ayat Pendek</span>
          </nav>

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black siswa-headline text-[#006b5c] mb-4 tracking-tight">Ayat Pendek</h1>
            <p className="text-lg md:text-xl text-[#575c60] max-w-2xl">Mulai dari surah terpendek dan paling mudah untuk membangun hafalanmu secara perlahan.</p>

            {/* Progress Card */}
            <div className="mt-8 bg-[#ffffff] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-transparent">
              <div className="bg-[#006b5c] text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#006b5c]/20">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-2">
                  <span className="siswa-headline font-bold text-[#006b5c] text-xl">Progres Hafalan</span>
                  <span className="text-[#6a4800] font-bold">2 dari 10 surah selesai</span>
                </div>
                <div className="w-full bg-[#ecf1f6] rounded-full h-4 overflow-hidden">
                  <div className="bg-[#ffc78e] h-full w-[20%] rounded-full shadow-[0_0_10px_rgba(255,199,142,0.5)] transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Surah Grid */}
          <div aria-label="Daftar Surah Pendek" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32" role="list">
            {/* Item 1: Selesai */}
            <div aria-label="Surah Al-Kautsar, 3 ayat, Status: Selesai" className="bg-[#ffffff] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0" onClick={() => navigate('/ayat-pendek/al-kautsar')} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/ayat-pendek/al-kautsar'); }}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#006b5c]/10 text-[#006b5c] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <span className="px-4 py-1 bg-[#006b5c]/10 text-[#006b5c] text-xs font-black uppercase tracking-widest rounded-full">SELESAI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#006b5c] mb-1">Al-Kautsar</h3>
              <p className="text-[#575c60] font-medium mb-4">3 ayat • Makkiyah</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                  <div className="bg-[#006b5c] h-full w-full"></div>
                </div>
                <span className="text-sm font-bold text-[#006b5c]">3/3</span>
              </div>
            </div>

            {/* Item 2: Sedang dipelajari */}
            <div aria-label="Surah Al-Asr, 3 ayat, Status: Sedang dipelajari" className="bg-[#ffffff] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0" onClick={() => navigate('/ayat-pendek/al-asr')} onKeyDown={(e) => { if (e.key === 'Enter') navigate('/ayat-pendek/al-asr'); }}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#ffc78e]/30 text-[#6a4800] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>sync</span>
                </div>
                <span className="px-4 py-1 bg-[#ffc78e]/30 text-[#6a4800] text-xs font-black uppercase tracking-widest rounded-full">DIPELAJARI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#006b5c] mb-1">Al-Asr</h3>
              <p className="text-[#575c60] font-medium mb-4">3 ayat • Makkiyah</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                  <div className="bg-[#ffc78e] h-full w-[100%] shadow-[0_0_10px_rgba(255,199,142,0.5)]"></div>
                </div>
                <span className="text-sm font-bold text-[#6a4800]">3/3</span>
              </div>
            </div>

            {/* Item 3: Belum dimulai (Locked style) */}
            <div aria-label="Surah Al-Ikhlas, 4 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Ikhlas</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">4 ayat • Makkiyah</p>
            </div>

            {/* Item 4: Belum dimulai */}
            <div aria-label="Surah Al-Lahab, 5 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Lahab</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">5 ayat • Makkiyah</p>
            </div>

            {/* Item 5: Belum dimulai */}
            <div aria-label="Surah Al-Falaq, 5 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Falaq</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">5 ayat • Makkiyah</p>
            </div>

            {/* Item 6: Belum dimulai */}
            <div aria-label="Surah An-Nasr, 3 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" role="listitem" tabIndex="0">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">An-Nasr</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">3 ayat • Madaniyah</p>
            </div>
          </div>
        </div>

        {/* Mascot Floating UI */}
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end">
          <div className="glass-bubble mb-4 p-6 rounded-[2rem] rounded-br-none shadow-xl border border-white/50 max-w-xs relative animate-[bounce_3s_infinite] group hover:scale-105 transition-transform">
            <p className="text-[#2a2f32] font-bold leading-relaxed relative z-10">
              Kamu hebat Ahmad! Sudah hafal 2 surah. Ayo semangat lanjutkan membaca Al-Ikhlas!
            </p>
            <div className="absolute -bottom-3 right-0 w-6 h-6 glass-bubble transform rotate-45 border-r border-b border-white/50"></div>
          </div>
          <div className="w-48 h-auto drop-shadow-2xl hover:scale-105 transition-transform cursor-pointer relative group">
            <div className="absolute -inset-4 bg-[#ffc78e]/20 rounded-full blur-2xl group-hover:bg-[#ffc78e]/40 transition-all"></div>
            <img className="w-full h-auto object-contain filter drop-shadow-lg relative" alt="Mascot Coby" src={mascotImg} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AyatPendek;
