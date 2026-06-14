import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility';

function Hijaiyah() {
  const navigate = useNavigate();
  useAccessibility('Daftar Huruf Hijaiyah');
  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="iqra" />

      {/* Main Content Canvas */}
      <main className="ml-72 p-10 max-w-7xl mx-auto w-full" id="main-content" role="main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8">
          <a className="hover:text-[#800000] transition-colors cursor-pointer" onClick={() => navigate({ to: '/siswa' })}>Beranda</a>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <a className="hover:text-[#800000] transition-colors cursor-pointer" onClick={() => navigate({ to: '/iqra' })}>Iqra'</a>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="text-[#800000] font-bold">Huruf Hijaiyah</span>
        </nav>

        {/* Header Section */}
        <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Huruf Hijaiyah</h2>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 bg-[#5de3fc]/30 text-[#800000] font-bold rounded-full text-sm">Progress Kamu</span>
              <span className="text-2xl font-black text-[#800000]">5 <span className="text-slate-400 font-medium">/ 28</span></span>
            </div>
          </div>

          {/* Playful Progress Bar */}
          <div className="w-full md:w-96 bg-[#d7dee3] h-6 rounded-full relative overflow-hidden flex items-center">
            <div className="bg-[#6d5a00] h-full rounded-full transition-all duration-1000" style={{ width: "18%" }}>
              <div className="absolute right-0 top-0 h-full flex items-center pr-2">
                <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: Completed */}
          <button aria-label="Huruf Alif, sudah selesai" onClick={() => navigate({ to: '/iqra/hijaiyah/alif' })} className="group relative bg-[#dde3e8] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#800000]/10 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute top-4 right-4 text-[#800000]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-[#2a2f32]">ا</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#800000]">Alif</span>
            <div className="mt-4 px-4 py-1 bg-[#800000] text-[#dbf8ff] text-xs font-bold rounded-full">Selesai</div>
          </button>

          {/* Card 2: Completed */}
          <button aria-label="Huruf Ba, sudah selesai" onClick={() => navigate({ to: '/iqra/hijaiyah/ba' })} className="group relative bg-[#dde3e8] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#800000]/10 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute top-4 right-4 text-[#800000]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-[#2a2f32]">ب</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#800000]">Ba</span>
            <div className="mt-4 px-4 py-1 bg-[#800000] text-[#dbf8ff] text-xs font-bold rounded-full">Selesai</div>
          </button>

          {/* Card 3: Completed */}
          <button aria-label="Huruf Ta, sudah selesai" onClick={() => navigate({ to: '/iqra/hijaiyah/ta' })} className="group relative bg-[#dde3e8] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#800000]/10 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute top-4 right-4 text-[#800000]">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-[#2a2f32]">ت</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#800000]">Ta</span>
            <div className="mt-4 px-4 py-1 bg-[#800000] text-[#dbf8ff] text-xs font-bold rounded-full">Selesai</div>
          </button>

          {/* Card 4: Locked */}
          <button aria-label="Huruf Tsa, belum terbuka" className="group relative bg-[#ffffff] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute top-4 right-4 text-slate-300">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-slate-300">ث</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-slate-400">Tsa</span>
            <div className="mt-4 px-4 py-1 bg-[#e3e9ee] text-slate-400 text-xs font-bold rounded-full">Terkunci</div>
          </button>

          {/* Card 5: Current/Next */}
          <button aria-label="Huruf Jim, mulai belajar" onClick={() => navigate({ to: '/iqra/hijaiyah/jim' })} className="group relative bg-[#ffffff] rounded-xl p-8 flex flex-col items-center justify-center ring-4 ring-[#800000] ring-offset-4 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#800000]/20 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute -top-3 -right-3 bg-[#fad538] text-[#5a4a00] text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-widest">Mulai</div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-[#2a2f32]">ج</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-[#2a2f32]">Jim</span>
            <div className="mt-4 px-4 py-1 bg-[#fad538] text-[#5a4a00] text-xs font-bold rounded-full">Belum Selesai</div>
          </button>

          {/* Card 6: Locked */}
          <button aria-label="Huruf Ha, belum terbuka" className="group relative bg-[#ffffff] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-200">
            <div className="absolute top-4 right-4 text-slate-300">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-slate-300">ح</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-slate-400">Ha</span>
            <div className="mt-4 px-4 py-1 bg-[#e3e9ee] text-slate-400 text-xs font-bold rounded-full">Terkunci</div>
          </button>

          {/* Card 7: Locked */}
          <button aria-label="Huruf Kha, belum terbuka" className="group relative bg-[#ffffff] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-200">
            <div className="absolute top-4 right-4 text-slate-300">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-slate-300">خ</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-slate-400">Kha</span>
            <div className="mt-4 px-4 py-1 bg-[#e3e9ee] text-slate-400 text-xs font-bold rounded-full">Terkunci</div>
          </button>

          {/* Card 8: Locked */}
          <button aria-label="Huruf Dal, belum terbuka" className="group relative bg-[#ffffff] rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-slate-200 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            <div className="absolute top-4 right-4 text-slate-300">
              <span className="material-symbols-outlined text-3xl">lock</span>
            </div>
            <span className="font-['Noto_Sans_Arabic'] text-7xl mb-4 text-slate-300">د</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xl text-slate-400">Dal</span>
            <div className="mt-4 px-4 py-1 bg-[#e3e9ee] text-slate-400 text-xs font-bold rounded-full">Terkunci</div>
          </button>
        </div>

        {/* Mascot Floating UI */}
        <div className="fixed bottom-12 right-12 flex items-end gap-4 z-40" aria-hidden="true">
          <div className="bg-[#ffffff] backdrop-blur-md bg-opacity-80 p-6 rounded-xl shadow-2xl max-w-xs mb-10 border border-white/50 relative">
            <p className="text-sm font-semibold leading-relaxed text-[#2a2f32]">
              Pilih huruf yang ingin kamu pelajari! Gunakan Tab untuk navigasi 🎯
            </p>
            <div className="absolute -bottom-2 right-8 w-6 h-6 bg-[#ffffff] rotate-45 border-r border-b border-white/50"></div>
          </div>
          <div className="w-48 hover:scale-110 transition-transform duration-500 cursor-pointer">
            <img alt="" className="w-full h-auto object-contain drop-shadow-2xl" src={mascotImg} />
          </div>
        </div>
      </main>

      <header className="md:hidden fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#f3f7fb]/70 dark:bg-slate-900/70 backdrop-blur-lg">
        <span className="text-2xl font-black text-[#800000] tracking-tight font-['Plus_Jakarta_Sans']">CobyTartil</span>
        <button className="material-symbols-outlined text-[#800000]">menu</button>
      </header>
    </div>
  );
}

export default Hijaiyah;
