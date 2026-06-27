import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import useAccessibility from '@/hooks/use-accessibility'; // ADDED

export const Route = createFileRoute('/_student-dashboard/siswa/ayat-pendek/')({
  component: AyatPendek,
})

function AyatPendek() {
  const navigate = useNavigate();
  useAccessibility('Daftar Ayat Pendek'); // ADDED

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] siswa-body min-h-screen flex flex-1">
      {/* Main Content Area */}
      <main className="relative flex flex-col w-full min-h-screen p-8 ml-0 overflow-hidden lg:ml-72 lg:p-12" id="main-content" role="main"> {/* ADDED */}
        {/* Subtle Background Motif */}
        <div className="absolute inset-0 pointer-events-none arabesque-pattern"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8 text-sm font-medium opacity-60">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="text-xs material-symbols-outlined">chevron_right</span>
            <span className="text-[#800000] font-bold">Ayat Pendek</span>
          </nav>

          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black siswa-headline text-[#800000] mb-4 tracking-tight">Ayat Pendek</h1>
            <p className="text-lg md:text-xl text-[#575c60] max-w-2xl">Mulai dari surah terpendek dan paling mudah untuk membangun hafalanmu secara perlahan.</p>

            {/* Progress Card */}
            <div className="mt-8 bg-[#ffffff] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm border border-transparent">
              <div className="bg-[#800000] text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-[#800000]/20">
                <span className="text-3xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              </div>
              <div className="flex-1 w-full">
                <div className="flex items-end justify-between mb-2">
                  <span className="siswa-headline font-bold text-[#800000] text-xl">Progres Hafalan</span>
                  <span className="text-[#6a4800] font-bold">2 dari 10 surah selesai</span>
                </div>
                <div className="w-full bg-[#ecf1f6] rounded-full h-4 overflow-hidden">
                  <div className="bg-[#ffc78e] h-full w-[20%] rounded-full shadow-[0_0_10px_rgba(255,199,142,0.5)] transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Surah Grid */}
          <div aria-label="Daftar Surah Pendek" className="grid grid-cols-1 gap-6 pb-32 md:grid-cols-2 lg:grid-cols-3" role="list">
            {/* Item 1: Selesai */}
            <div aria-label="Surah Al-Kautsar, 3 ayat, Status: Selesai" className="bg-[#ffffff] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0} onClick={() => navigate({ to: '/siswa/ayat-pendek/$surah', params: { surah: 'al-kautsar' } })} onKeyDown={(e) => { if (e.key === 'Enter') navigate({ to: '/siswa/ayat-pendek/$surah', params: { surah: 'al-kautsar' } }); }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#800000]/10 text-[#800000] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <span className="px-4 py-1 bg-[#800000]/10 text-[#800000] text-xs font-black uppercase tracking-widest rounded-full">SELESAI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#800000] mb-1">Al-Kautsar</h3>
              <p className="text-[#575c60] font-medium mb-4">3 ayat • Makkiyah</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                  <div className="bg-[#800000] h-full w-full"></div>
                </div>
                <span className="text-sm font-bold text-[#800000]">3/3</span>
              </div>
            </div>

            {/* Item 2: Sedang dipelajari */}
            <div aria-label="Surah Al-Asr, 3 ayat, Status: Sedang dipelajari" className="bg-[#ffffff] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0} onClick={() => navigate({ to: '/siswa/ayat-pendek/$surah', params: { surah: 'al-asr' } })} onKeyDown={(e) => { if (e.key === 'Enter') navigate({ to: '/siswa/ayat-pendek/$surah', params: { surah: 'al-asr' } }); }}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ffc78e]/30 text-[#6a4800] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>sync</span>
                </div>
                <span className="px-4 py-1 bg-[#ffc78e]/30 text-[#6a4800] text-xs font-black uppercase tracking-widest rounded-full">DIPELAJARI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#800000] mb-1">Al-Asr</h3>
              <p className="text-[#575c60] font-medium mb-4">3 ayat • Makkiyah</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                  <div className="bg-[#ffc78e] h-full w-[100%] shadow-[0_0_10px_rgba(255,199,142,0.5)]"></div>
                </div>
                <span className="text-sm font-bold text-[#6a4800]">3/3</span>
              </div>
            </div>

            {/* Item 3: Belum dimulai (Locked style) */}
            <div aria-label="Surah Al-Ikhlas, 4 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Ikhlas</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">4 ayat • Makkiyah</p>
            </div>

            {/* Item 4: Belum dimulai */}
            <div aria-label="Surah Al-Lahab, 5 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Lahab</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">5 ayat • Makkiyah</p>
            </div>

            {/* Item 5: Belum dimulai */}
            <div aria-label="Surah Al-Falaq, 5 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-[#ecf1f6] text-[#575c60] rounded-xl">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                </div>
                <span className="px-4 py-1 bg-[#ecf1f6] text-[#575c60] text-xs font-black uppercase tracking-widest rounded-full">TERKUNCI</span>
              </div>
              <h3 className="text-2xl font-black siswa-headline text-[#575c60] mb-1">Al-Falaq</h3>
              <p className="text-[#575c60] opacity-80 font-medium tracking-tight">5 ayat • Makkiyah</p>
            </div>

            {/* Item 6: Belum dimulai */}
            <div aria-label="Surah An-Nasr, 3 ayat, Status: Terkunci" className="bg-[#ffffff] opacity-70 p-6 rounded-2xl hover:bg-[#ffffff]/50 transition-all cursor-not-allowed shadow-sm border border-transparent hover:border-[#dde3e8] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" role="listitem" tabIndex={0}>
              <div className="flex items-start justify-between mb-4">
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
        <div className="fixed z-40 flex flex-col items-end bottom-8 right-8">
          <div className="glass-bubble mb-4 p-6 rounded-[2rem] rounded-br-none shadow-xl border border-white/50 max-w-xs relative animate-[bounce_3s_infinite] group hover:scale-105 transition-transform">
            <p className="text-[#2a2f32] font-bold leading-relaxed relative z-10">
              Kamu hebat Ahmad! Sudah hafal 2 surah. Ayo semangat lanjutkan membaca Al-Ikhlas!
            </p>
            <div className="absolute right-0 w-6 h-6 transform rotate-45 border-b border-r -bottom-3 glass-bubble border-white/50"></div>
          </div>
          <div className="relative w-48 h-auto transition-transform cursor-pointer drop-shadow-2xl hover:scale-105 group">
            <div className="absolute -inset-4 bg-[#ffc78e]/20 rounded-full blur-2xl group-hover:bg-[#ffc78e]/40 transition-all"></div>
            <img className="relative object-contain w-full h-auto filter drop-shadow-lg" alt="Mascot Coby" src='/maskot.png' />
          </div>
        </div>
      </main>
    </div>
  );
}

export default AyatPendek;
