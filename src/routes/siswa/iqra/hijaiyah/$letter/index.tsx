import { createFileRoute } from '@tanstack/react-router'
import React from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import { useNavigate, useParams } from '@tanstack/react-router';
import useAccessibility from '@/hooks/use-accessibility';
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/siswa/iqra/hijaiyah/$letter/')({
  beforeLoad: requireStudentRole,
  component: DetailHijaiyah,
})

function DetailHijaiyah() {
  const navigate = useNavigate();
  const { letter } = useParams({ from: '/siswa/iqra/hijaiyah/$letter/' });
  useAccessibility(`Detail Huruf Hijaiyah ${letter}`);

  // 2. Buat fungsi untuk memutar audio
  const playAudio = () => {
    const audio = new Audio('/audio/hijaiyah/baa.mp3');
    audio.play().catch(error => console.error("Gagal memutar audio:", error));
  };

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body flex">
      <Sidebar activeMenu="iqra" />

      {/* Main Content Area */}
      <main className="w-full p-6 pb-32 ml-0 lg:ml-72 md:p-12" id="main-content" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm font-medium text-[#575c60]">
            <a className="hover:text-[#800000] cursor-pointer" onClick={() => navigate({ to: '/siswa' })}>Beranda</a>
            <span className="text-xs material-symbols-outlined">chevron_right</span>
            <a className="hover:text-[#800000] cursor-pointer" onClick={() => navigate({ to: '/siswa/iqra' })}>Iqra'</a>
            <span className="text-xs material-symbols-outlined">chevron_right</span>
            <a className="hover:text-[#800000] cursor-pointer" onClick={() => navigate({ to: '/siswa/iqra/hijaiyah' })}>Hijaiyah</a>
            <span className="text-xs material-symbols-outlined">chevron_right</span>
            <span className="text-[#800000] font-bold">Ba</span>
          </nav>

          <div className="relative grid items-start gap-8 md:grid-cols-12">
            {/* Center Content */}
            <div className="flex flex-col items-center md:col-span-8">
              {/* Character Coby (Mobile) */}
              <div className="w-40 h-auto mb-4 md:hidden">
                <img className="object-contain w-full h-auto" src='/maskot.png' alt="Coby" />
              </div>

              {/* Main Letter Card */}
              <section className="w-full bg-[#ffffff] rounded-xl p-10 md:p-16 flex flex-col items-center shadow-[0_20px_50px_-12px_rgba(0,107,92,0.08)] relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5de3fc]/20 rounded-full blur-3xl group-hover:bg-[#5de3fc]/30 transition-colors"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#fad538]/20 rounded-full blur-3xl"></div>
                <div className="text-[160px] md:text-[220px] font-bold text-[#800000] mb-4 leading-none select-none drop-shadow-sm font-['Noto_Sans_Arabic']">
                  ب
                </div>
                <div className="mb-8 text-center">
                  <h1 className="text-4xl md:text-5xl font-black text-[#2a2f32] mb-1 font-['Plus_Jakarta_Sans']">Ba</h1>
                  <p className="text-lg text-[#575c60] font-medium">Transliterasi: <span className="italic">Bâ</span></p>
                </div>
                
                {/* 3. Tambahkan event onClick={playAudio} di tombol ini */}
                <button 
                  aria-label="Dengarkan pengucapan huruf Ba" 
                  onClick={playAudio}
                  className="relative group flex items-center gap-3 px-8 py-4 bg-[#ffd700] text-white rounded-full font-bold text-xl shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 transition-transform duration-500 scale-0 rounded-full bg-white/20 group-active:scale-150"></div>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  <span className="font-['Plus_Jakarta_Sans'] text-lg">Dengarkan</span>
                </button>
              </section>

              {/* Exercise Section */}
              <section className="w-full mt-12 bg-[#ecf1f6] rounded-xl p-8 flex flex-col items-center text-center">
                <h2 className="text-2xl font-black text-[#2a2f32] mb-2 font-['Plus_Jakarta_Sans']">Sekarang Giliranmu!</h2>
                <p className="text-[#575c60] mb-8 max-w-xs font-['Plus_Jakarta_Sans']">Tekan tombol, lalu ucapkan huruf ini</p>
                <div className="flex flex-col items-center gap-6">
                  <button aria-label="Mulai rekam suara" className="w-24 h-24 rounded-full bg-[#b31b25] flex items-center justify-center text-[#ffefee] shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all group active:ring-8 active:ring-red-500/20">
                    <span className="text-4xl transition-transform material-symbols-outlined group-hover:scale-110">mic</span>
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
                  <div className="flex items-center h-8 gap-1 opacity-40">
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full"></div>
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full" style={{ animationDelay: '0.2s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full" style={{ animationDelay: '0.4s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full" style={{ animationDelay: '0.1s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full" style={{ animationDelay: '0.3s' }}></div>
                    <div className="audio-wave-bar w-1.5 bg-[#800000] rounded-full" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
                <div className="mt-6 text-sm font-semibold text-[#800000] opacity-0" role="status">
                  Perekaman aktif...
                </div>
              </section>
            </div>

            {/* Character Coby (Desktop) */}
            <div className="sticky hidden md:block md:col-span-4 top-12">
              <div className="relative mt-8">
                {/* Coby Word Bubble */}
                <div className="absolute -top-12 -left-8 glass-card border border-[#800000]/10 p-6 rounded-3xl shadow-xl z-10 max-w-[240px]">
                  <p className="text-[#2a2f32] font-bold text-lg leading-snug">"Suara 'Ba' terdengar seperti balon yang meletus! Ayo coba!"</p>
                  <div className="absolute w-6 h-6 rotate-45 bg-white -bottom-3 left-10"></div>
                </div>
                <img className="relative z-0 object-contain w-full h-auto" alt="Coby Mascot" src='/maskot.png' />
              </div>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center justify-between w-full mt-16">
            <button className="flex items-center gap-4 px-6 py-4 bg-[#ecf1f6] hover:bg-[#dde3e8] text-[#800000] font-black rounded-full transition-all hover:-translate-x-2">
              <span className="material-symbols-outlined">arrow_back</span>
              <div className="leading-tight text-left">
                <span className="text-[10px] uppercase opacity-50 block font-['Plus_Jakarta_Sans']">Sebelumnya</span>
                <span className="font-['Plus_Jakarta_Sans']">Alif</span>
              </div>
            </button>
            <button className="flex items-center gap-4 px-6 py-4 bg-[#800000] text-[#dbf8ff] font-black rounded-full transition-all hover:translate-x-2 shadow-lg shadow-[#800000]/20">
              <div className="leading-tight text-right">
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