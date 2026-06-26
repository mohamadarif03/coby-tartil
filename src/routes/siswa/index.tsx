import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/siswa/')({
  beforeLoad: requireStudentRole,
  component: Siswa,
})


function Siswa() {
  const navigate = useNavigate();
  useAccessibility('Dashboard Siswa');

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="home" />

      {/* Main Content Area */}
      <main className="w-full p-8 ml-0 lg:ml-72 lg:p-12" id="main-content" role="main">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-[#800000] tracking-tight mb-2">Halo, Ahmad! 👋</h2>
            <p className="text-lg text-[#575c60] font-medium">Semangat belajar hari ini!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ecf1f6] text-[#800000] hover:bg-[#dde3e8] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Notifikasi">
              <span className="material-symbols-outlined" aria-hidden="true">notifications</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#ecf1f6] text-[#800000] hover:bg-[#dde3e8] transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Pengaturan">
              <span className="material-symbols-outlined" aria-hidden="true">settings</span>
            </button>
          </div>
        </header>

        {/* Progress Summary Grid */}
        <section className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2" aria-labelledby="progress-heading">
          <h2 id="progress-heading" className="sr-only">Ringkasan Progres Belajar</h2>
          <div className="bg-[#ecf1f6] p-8 rounded-xl flex items-center gap-6 relative overflow-hidden group">
            <div className="w-16 h-16 bg-[#5de3fc] rounded-2xl flex items-center justify-center text-[#004f5b] shrink-0">
              <span className="text-3xl material-symbols-outlined" aria-hidden="true">menu_book</span>
            </div>
            <div className="flex-1">
              <div className="flex items-end justify-between mb-3">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg">Progres Hijaiyah</span>
                <span className="text-[#800000] font-black">5/28</span>
              </div>
              <div className="h-3 w-full bg-[#d7dee3] rounded-full overflow-hidden">
                <div className="h-full bg-[#800000] w-[18%] rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-[#ecf1f6] p-8 rounded-xl flex items-center gap-6 relative overflow-hidden group">
            <div className="w-16 h-16 bg-[#fad538] rounded-2xl flex items-center justify-center text-[#5a4a00] shrink-0">
              <span className="text-3xl material-symbols-outlined" aria-hidden="true">auto_stories</span>
            </div>
            <div className="flex-1">
              <div className="flex items-end justify-between mb-3">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-lg">Ayat Pendek</span>
                <span className="text-[#6d5a00] font-black">0/10</span>
              </div>
              <div className="h-3 w-full bg-[#d7dee3] rounded-full overflow-hidden">
                <div className="h-full bg-[#6d5a00] w-0 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Large CTA Modules */}
        <section className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-[#ffffff] p-8 rounded-xl shadow-sm relative overflow-hidden border border-[#a9aeb1]/10">
            <div className="relative z-10">
              <div className="inline-block px-4 py-1 bg-[#800000]/10 text-[#800000] rounded-full text-xs font-bold mb-4">SEDANG DIPELAJARI</div>
              <h3 className="text-3xl font-black text-[#2a2f32] mb-4">Lanjut Belajar Hijaiyah</h3>
              <p className="text-[#575c60] mb-8 max-w-sm">Kamu sudah menyelesaikan 5 huruf. Mari tuntaskan huruf Alif sampai Ya!</p>
              <button onClick={() => navigate({ to: '/siswa/iqra/hijaiyah' })} className="inline-flex items-center gap-3 bg-gradient-to-br from-[#800000] to-[#5de3fc] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-[#800000]/20 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Lanjut belajar huruf hijaiyah">
                <span>Lanjut Belajar</span>
                <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
            <div className="absolute top-0 right-0 w-48 h-full pointer-events-none opacity-10">
              <span className="material-symbols-outlined text-[12rem] absolute -right-8 top-1/2 -translate-y-1/2">menu_book</span>
            </div>
          </div>
          <div className="lg:col-span-5 bg-[#ffc78e]/30 p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-block px-4 py-1 bg-[#854f00]/10 text-[#854f00] rounded-full text-xs font-bold mb-4">MULAI BARU</div>
              <h3 className="text-3xl font-black text-[#744400] mb-4">Ayat Pendek</h3>
              <p className="text-[#764500] mb-8">Pelajari surah-surah pendek dengan makhraj yang benar.</p>
              <button onClick={() => navigate({ to: '/siswa/ayat-pendek' })} className="inline-flex items-center gap-3 bg-[#854f00] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-[#854f00]/20 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Mulai belajar ayat pendek">
                <span>Mulai</span>
                <span className="material-symbols-outlined" aria-hidden="true">play_arrow</span>
              </button>
            </div>
          </div>
        </section>

        {/* Recent History */}
        <section aria-labelledby="riwayat-heading">
          <div className="flex items-center justify-between px-4 mb-6">
            <h3 id="riwayat-heading" className="text-2xl font-black text-[#2a2f32]">Riwayat Belajar</h3>
            <a className="text-[#800000] font-bold hover:underline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" href="#" aria-label="Lihat semua riwayat belajar">Lihat Semua</a>
          </div>
          <div className="space-y-4">
            {/* History Item 1 */}
            <div className="flex items-center justify-between p-6 bg-[#ffffff] rounded-xl hover:bg-[#ecf1f6] transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#800000]/10 text-[#800000] rounded-xl flex items-center justify-center font-black text-xl">ا</div>
                <div>
                  <h4 className="text-lg font-bold">Huruf Alif</h4>
                  <p className="text-sm text-[#575c60]">Hijaiyah Dasar</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-1">
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="text-[#575c60] font-medium">12 Okt 2023</span>
              </div>
            </div>

            {/* History Item 2 */}
            <div className="flex items-center justify-between p-6 bg-[#ffffff] rounded-xl hover:bg-[#ecf1f6] transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#800000]/10 text-[#800000] rounded-xl flex items-center justify-center font-black text-xl">ب</div>
                <div>
                  <h4 className="text-lg font-bold">Huruf Ba</h4>
                  <p className="text-sm text-[#575c60]">Hijaiyah Dasar</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-1">
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#a9aeb1]">star</span>
                </div>
                <span className="text-[#575c60] font-medium">11 Okt 2023</span>
              </div>
            </div>

            {/* History Item 3 */}
            <div className="flex items-center justify-between p-6 bg-[#ffffff] rounded-xl hover:bg-[#ecf1f6] transition-colors group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-[#800000]/10 text-[#800000] rounded-xl flex items-center justify-center font-black text-xl">ت</div>
                <div>
                  <h4 className="text-lg font-bold">Huruf Ta</h4>
                  <p className="text-sm text-[#575c60]">Hijaiyah Dasar</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex gap-1">
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[#6d5a00]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
                <span className="text-[#575c60] font-medium">10 Okt 2023</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mascot Coby & Speech Bubble */}
      <div className="fixed z-40 flex flex-col items-end bottom-8 right-8" aria-hidden="true">
        <div className="glass-bubble mb-4 p-6 rounded-[2rem] rounded-br-none shadow-xl border border-white/50 max-w-xs relative animate-bounce-subtle">
          <p className="text-[#2a2f32] font-bold leading-relaxed">
            Kamu sudah belajar 5 huruf! Terus semangat ya! 🌟
          </p>
          <div className="absolute right-0 w-6 h-6 transform rotate-45 border-b border-r -bottom-3 glass-bubble border-white/50"></div>
        </div>
        <div className="relative transition-transform duration-500 cursor-pointer group hover:scale-105">
          <div className="absolute -inset-4 bg-[#5de3fc]/20 rounded-full blur-2xl group-hover:bg-[#5de3fc]/40 transition-all"></div>
          <img alt="" className="relative object-contain w-48 h-auto drop-shadow-2xl" src='/maskot.png' />
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed top-0 right-0 pointer-events-none -z-10 opacity-20" aria-hidden="true">
        <svg fill="none" height="400" viewBox="0 0 400 400" width="400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="100" fill="url(#paint0_linear)" r="150"></circle>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="150" x2="450" y1="-50" y2="250">
              <stop stopColor="#5de3fc"></stop>
              <stop offset="1" stopColor="#800000"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default Siswa;

