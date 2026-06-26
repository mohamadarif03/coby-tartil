import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/siswa/iqra/harakat/')({
  beforeLoad: requireStudentRole,
  component: IqraHarakat,
})


const harakatData = [
  {
    name: 'Fathah',
    symbol: 'َ',
    sound: 'a',
    description: 'Tanda di atas huruf, menghasilkan bunyi "a"',
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    examples: [
      { arabic: 'بَ', latin: 'ba' },
      { arabic: 'تَ', latin: 'ta' },
      { arabic: 'ثَ', latin: 'tsa' },
      { arabic: 'جَ', latin: 'ja' },
      { arabic: 'حَ', latin: 'ha' },
      { arabic: 'خَ', latin: 'kha' },
      { arabic: 'دَ', latin: 'da' },
      { arabic: 'ذَ', latin: 'dza' },
      { arabic: 'رَ', latin: 'ra' },
      { arabic: 'زَ', latin: 'za' },
      { arabic: 'سَ', latin: 'sa' },
      { arabic: 'شَ', latin: 'sya' },
    ],
  },
  {
    name: 'Kasrah',
    symbol: 'ِ',
    sound: 'i',
    description: 'Tanda di bawah huruf, menghasilkan bunyi "i"',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    examples: [
      { arabic: 'بِ', latin: 'bi' },
      { arabic: 'تِ', latin: 'ti' },
      { arabic: 'ثِ', latin: 'tsi' },
      { arabic: 'جِ', latin: 'ji' },
      { arabic: 'حِ', latin: 'hi' },
      { arabic: 'خِ', latin: 'khi' },
      { arabic: 'دِ', latin: 'di' },
      { arabic: 'ذِ', latin: 'dzi' },
      { arabic: 'رِ', latin: 'ri' },
      { arabic: 'زِ', latin: 'zi' },
      { arabic: 'سِ', latin: 'si' },
      { arabic: 'شِ', latin: 'syi' },
    ],
  },
  {
    name: 'Dhammah',
    symbol: 'ُ',
    sound: 'u',
    description: 'Tanda di atas huruf seperti waw kecil, menghasilkan bunyi "u"',
    color: 'from-violet-500 to-purple-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-700',
    examples: [
      { arabic: 'بُ', latin: 'bu' },
      { arabic: 'تُ', latin: 'tu' },
      { arabic: 'ثُ', latin: 'tsu' },
      { arabic: 'جُ', latin: 'ju' },
      { arabic: 'حُ', latin: 'hu' },
      { arabic: 'خُ', latin: 'khu' },
      { arabic: 'دُ', latin: 'du' },
      { arabic: 'ذُ', latin: 'dzu' },
      { arabic: 'رُ', latin: 'ru' },
      { arabic: 'زُ', latin: 'zu' },
      { arabic: 'سُ', latin: 'su' },
      { arabic: 'شُ', latin: 'syu' },
    ],
  },
];

function IqraHarakat() {
  const navigate = useNavigate();
  useAccessibility('Harakat - Tanda Baca');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExample, setSelectedExample] = useState(null);

  const active = harakatData[activeTab];

  const speakArabic = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-SA';
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="iqra" />

      <main className="w-full p-6 pb-32 ml-0 lg:ml-72 md:p-10" id="main-content" role="main">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center mb-8 space-x-2 text-sm font-medium text-slate-500">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa/iqra' }); }}>Iqra'</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <span className="text-[#800000] font-bold">Harakat</span>
          </nav>

          {/* Page Header */}
          <section className="mb-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center justify-center bg-blue-100 w-14 h-14 rounded-2xl">
                <span className="text-3xl text-blue-600 material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Harakat</h2>
                <p className="font-medium text-slate-500">Tanda Baca dalam Al-Qur'an</p>
              </div>
            </div>
          </section>

          {/* Tab Selector */}
          <div className="flex gap-3 p-2 mb-10 bg-white border shadow-sm rounded-2xl border-slate-100">
            {harakatData.map((h, i) => (
              <button
                key={h.name}
                onClick={() => { setActiveTab(i); setSelectedExample(null); }}
                className={`flex-1 py-4 px-4 rounded-xl font-bold text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                  activeTab === i 
                    ? `bg-gradient-to-r ${h.color} text-white shadow-lg scale-[1.02]` 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
                aria-label={`Tab ${h.name}`}
                aria-selected={activeTab === i}
              >
                <span className="text-2xl font-['Noto_Sans_Arabic'] block mb-1" aria-hidden="true">{h.symbol}</span>
                <span className="text-sm font-['Plus_Jakarta_Sans']">{h.name}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Explanation */}
            <div className="lg:col-span-4">
              <div className={`${active.bgColor} rounded-2xl p-8 border ${active.textColor.replace('text', 'border')}/20 relative overflow-hidden`}>
                <div className="absolute w-24 h-24 rounded-full -top-6 -right-6 bg-white/20 blur-2xl" aria-hidden="true"></div>
                
                <div className="mb-6 text-center">
                  <div className="font-['Noto_Sans_Arabic'] text-[120px] leading-none mb-2 select-none" aria-hidden="true">
                    بـ{active.symbol}
                  </div>
                  <h3 className={`text-2xl font-black ${active.textColor} font-['Plus_Jakarta_Sans']`}>{active.name}</h3>
                  <p className="mt-2 font-medium text-slate-600">Bunyi: "{active.sound}"</p>
                </div>

                <p className="text-sm leading-relaxed text-center text-slate-600">
                  {active.description}
                </p>

                <button
                  onClick={() => speakArabic(`بـ${active.symbol}`)}
                  className={`w-full mt-6 py-4 rounded-xl bg-gradient-to-r ${active.color} text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700]`}
                  aria-label={`Dengarkan bunyi ${active.name}`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Dengarkan Suara
                </button>
              </div>
            </div>

            {/* Right: Examples Grid */}
            <div className="lg:col-span-8">
              <h3 className="text-lg font-bold text-[#2a2f32] mb-4 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                Latihan Baca {active.name}
              </h3>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
                {active.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedExample(i);
                      speakArabic(ex.arabic);
                    }}
                    className={`relative bg-white rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 border-2 ${
                      selectedExample === i ? `${active.textColor.replace('text', 'border')} shadow-lg scale-105` : 'border-transparent hover:border-slate-200'
                    }`}
                    aria-label={`Huruf ${ex.latin}, klik untuk mendengar`}
                  >
                    {selectedExample === i && (
                      <div className="absolute -top-2 -right-2">
                        <span className="material-symbols-outlined text-xl text-[#800000]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      </div>
                    )}
                    <span className="font-['Noto_Sans_Arabic'] text-4xl mb-2 text-[#2a2f32]">{ex.arabic}</span>
                    <span className="text-sm font-bold text-slate-500 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">{ex.latin}</span>
                  </button>
                ))}
              </div>

              {/* Quick Quiz Section */}
              <div className="p-8 mt-8 bg-white border shadow-sm rounded-2xl border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100">
                    <span className="text-xl material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>quiz</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans']">Latihan Cepat</h4>
                </div>
                <p className="mb-6 text-sm text-slate-500">Klik huruf di atas untuk mendengarkan pelafalannya, lalu coba ucapkan sendiri!</p>
                
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-200 rounded-full bg-teal-50">
                    ✅ Dengarkan suara
                  </div>
                  <div className="px-4 py-2 text-sm font-semibold text-blue-700 border border-blue-200 rounded-full bg-blue-50">
                    🎤 Ucapkan sendiri
                  </div>
                  <div className="px-4 py-2 text-sm font-semibold border rounded-full bg-violet-50 text-violet-700 border-violet-200">
                    🔁 Ulangi sampai benar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="fixed z-40 flex items-end gap-4 bottom-12 right-12" aria-hidden="true">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-2xl max-w-[220px] mb-10 border border-slate-100 relative">
            <p className="text-sm font-semibold leading-relaxed text-[#2a2f32]">
              Klik huruf untuk dengarkan bunyinya! {active.name} menghasilkan bunyi "{active.sound}" 🎵
            </p>
            <div className="absolute w-5 h-5 rotate-45 bg-white border-b border-r -bottom-2 right-8 border-slate-100"></div>
          </div>
          <div className="transition-transform duration-500 cursor-pointer w-36 hover:scale-110">
            <img alt="" className="object-contain w-full h-auto drop-shadow-2xl" src='/maskot.png' />
          </div>
        </div>
      </main>
    </div>
  );
}

export default IqraHarakat;
