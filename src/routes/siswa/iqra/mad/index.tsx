import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/siswa/iqra/mad/')({
  component: IqraMad,
})

import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';

const madTypes = [
  {
    name: 'Mad dengan Alif (ا)',
    symbol: 'ا',
    description: 'Fathah sebelum Alif = bunyi "aa" panjang (2 harakat)',
    color: 'from-cyan-500 to-teal-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    examples: [
      { arabic: 'بَا', latin: 'baa', short: 'بَ', shortLatin: 'ba' },
      { arabic: 'تَا', latin: 'taa', short: 'تَ', shortLatin: 'ta' },
      { arabic: 'ثَا', latin: 'tsaa', short: 'ثَ', shortLatin: 'tsa' },
      { arabic: 'جَا', latin: 'jaa', short: 'جَ', shortLatin: 'ja' },
      { arabic: 'حَا', latin: 'haa', short: 'حَ', shortLatin: 'ha' },
      { arabic: 'خَا', latin: 'khaa', short: 'خَ', shortLatin: 'kha' },
      { arabic: 'دَا', latin: 'daa', short: 'دَ', shortLatin: 'da' },
      { arabic: 'رَا', latin: 'raa', short: 'رَ', shortLatin: 'ra' },
      { arabic: 'سَا', latin: 'saa', short: 'سَ', shortLatin: 'sa' },
    ],
  },
  {
    name: 'Mad dengan Waw (و)',
    symbol: 'و',
    description: 'Dhammah sebelum Waw = bunyi "uu" panjang (2 harakat)',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    examples: [
      { arabic: 'بُو', latin: 'buu', short: 'بُ', shortLatin: 'bu' },
      { arabic: 'تُو', latin: 'tuu', short: 'تُ', shortLatin: 'tu' },
      { arabic: 'ثُو', latin: 'tsuu', short: 'ثُ', shortLatin: 'tsu' },
      { arabic: 'جُو', latin: 'juu', short: 'جُ', shortLatin: 'ju' },
      { arabic: 'حُو', latin: 'huu', short: 'حُ', shortLatin: 'hu' },
      { arabic: 'خُو', latin: 'khuu', short: 'خُ', shortLatin: 'khu' },
      { arabic: 'دُو', latin: 'duu', short: 'دُ', shortLatin: 'du' },
      { arabic: 'رُو', latin: 'ruu', short: 'رُ', shortLatin: 'ru' },
      { arabic: 'سُو', latin: 'suu', short: 'سُ', shortLatin: 'su' },
    ],
  },
  {
    name: 'Mad dengan Ya (ي)',
    symbol: 'ي',
    description: 'Kasrah sebelum Ya = bunyi "ii" panjang (2 harakat)',
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    examples: [
      { arabic: 'بِي', latin: 'bii', short: 'بِ', shortLatin: 'bi' },
      { arabic: 'تِي', latin: 'tii', short: 'تِ', shortLatin: 'ti' },
      { arabic: 'ثِي', latin: 'tsii', short: 'ثِ', shortLatin: 'tsi' },
      { arabic: 'جِي', latin: 'jii', short: 'جِ', shortLatin: 'ji' },
      { arabic: 'حِي', latin: 'hii', short: 'حِ', shortLatin: 'hi' },
      { arabic: 'خِي', latin: 'khii', short: 'خِ', shortLatin: 'khi' },
      { arabic: 'دِي', latin: 'dii', short: 'دِ', shortLatin: 'di' },
      { arabic: 'رِي', latin: 'rii', short: 'رِ', shortLatin: 'ri' },
      { arabic: 'سِي', latin: 'sii', short: 'سِ', shortLatin: 'si' },
    ],
  },
];

function IqraMad() {
  const navigate = useNavigate();
  useAccessibility('Mad - Panjang Pendek Bacaan');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExample, setSelectedExample] = useState(null);
  const [showComparison, setShowComparison] = useState(true);

  const active = madTypes[activeTab];

  const speakArabic = (text) => {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar-SA';
    msg.rate = 0.6;
    window.speechSynthesis.speak(msg);
  };

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="iqra" />

      <main className="w-full p-6 pb-32 ml-72 md:p-10" id="main-content" role="main">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center mb-8 space-x-2 text-sm font-medium text-slate-500">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/iqra' }); }}>Iqra'</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <span className="text-[#800000] font-bold">Mad</span>
          </nav>

          {/* Header */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-100">
                <span className="text-3xl material-symbols-outlined text-cyan-600" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Mad</h2>
                <p className="font-medium text-slate-500">Panjang Pendek Bacaan (2 Harakat)</p>
              </div>
            </div>
          </section>

          {/* Info Card */}
          <div className="flex items-start gap-4 p-6 mb-8 border bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border-cyan-100">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xl material-symbols-outlined text-cyan-600" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            </div>
            <div>
              <h4 className="mb-1 font-bold text-cyan-900">Apa itu Mad Thabi'i?</h4>
              <p className="text-sm leading-relaxed text-cyan-800">
                Mad Thabi'i adalah bacaan <strong>panjang alami</strong> sebanyak 2 harakat (~2 ketukan). 
                Terjadi ketika <strong>Fathah bertemu Alif (ا)</strong>, <strong>Dhammah bertemu Waw (و)</strong>, 
                atau <strong>Kasrah bertemu Ya (ي)</strong>. Ini adalah dasar dari semua jenis mad dalam Al-Qur'an.
              </p>
            </div>
          </div>

          {/* 3 Huruf Mad Visual */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {madTypes.map((mad, i) => (
              <button
                key={i}
                onClick={() => { setActiveTab(i); setSelectedExample(null); }}
                className={`rounded-2xl p-6 text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] border-2 ${
                  activeTab === i 
                    ? `bg-gradient-to-br ${mad.color} text-white shadow-xl scale-[1.03] border-transparent` 
                    : `bg-white ${mad.textColor} hover:shadow-md ${mad.textColor.replace('text', 'border')}/30`
                }`}
                aria-label={`${mad.name}`}
                aria-selected={activeTab === i}
              >
                <span className="font-['Noto_Sans_Arabic'] text-5xl block mb-2">{mad.symbol}</span>
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm block">{mad.name.split('(')[0].trim()}</span>
                <span className={`text-xs ${activeTab === i ? 'text-white/70' : 'text-slate-400'} block mt-1`}>
                  ({mad.symbol})
                </span>
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
                  <h3 className={`text-xl font-black ${active.textColor} font-['Plus_Jakarta_Sans'] mb-3`}>{active.name}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {active.description}
                  </p>
                </div>

                {/* Duration Visual */}
                <div className="p-5 mb-5 bg-white/60 rounded-xl">
                  <h4 className="mb-3 text-xs font-bold tracking-widest text-center uppercase text-slate-400">Durasi Bacaan</h4>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 animate-pulse"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    <span className="text-sm font-bold text-slate-500">= 2 Harakat</span>
                  </div>
                </div>

                <button
                  onClick={() => speakArabic(active.examples[0]?.arabic || '')}
                  className={`w-full py-4 rounded-xl bg-gradient-to-r ${active.color} text-white font-bold flex items-center justify-center gap-3 hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700]`}
                  aria-label={`Dengarkan contoh mad`}
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Dengarkan Contoh
                </button>
              </div>
            </div>

            {/* Right: Examples */}
            <div className="lg:col-span-8">
              {/* Comparison Toggle */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                  <span className="text-xl material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                  Latihan Baca
                </h3>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                    showComparison ? 'bg-cyan-100 text-cyan-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span className="text-sm material-symbols-outlined">compare</span>
                  {showComparison ? 'Sembunyikan' : 'Tampilkan'} Perbandingan
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
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
                    aria-label={`${ex.latin}, klik untuk mendengar`}
                  >
                    {selectedExample === i && (
                      <div className="absolute -top-2 -right-2">
                        <span className="material-symbols-outlined text-xl text-[#800000]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      </div>
                    )}

                    {/* Long Version */}
                    <span className="font-['Noto_Sans_Arabic'] text-4xl mb-1 text-[#2a2f32]">{ex.arabic}</span>
                    <span className={`text-sm font-bold ${active.textColor} font-['Plus_Jakarta_Sans']`}>{ex.latin}</span>
                    
                    {/* Comparison */}
                    {showComparison && (
                      <div className="w-full pt-3 mt-3 text-center border-t border-slate-100">
                        <span className="text-xs text-slate-400">vs pendek:</span>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <span className="font-['Noto_Sans_Arabic'] text-lg text-slate-400">{ex.short}</span>
                          <span className="text-xs font-bold text-slate-400">{ex.shortLatin}</span>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Musical Rhythm Guide */}
              <div className="p-8 mt-8 bg-white border shadow-sm rounded-2xl border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-100">
                    <span className="text-xl material-symbols-outlined text-cyan-600" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans']">Panduan Irama</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 text-center bg-slate-50 rounded-xl">
                    <span className="block mb-2 text-xs font-bold tracking-widest uppercase text-slate-400">Pendek (1 harakat)</span>
                    <div className="flex justify-center gap-1 mb-2">
                      <div className="w-6 h-6 rounded-full bg-slate-300"></div>
                    </div>
                    <span className="font-['Noto_Sans_Arabic'] text-2xl">بَ</span>
                    <span className="block text-sm font-bold text-slate-500">ba ♩</span>
                  </div>
                  <div className={`p-4 ${active.bgColor} rounded-xl text-center border ${active.textColor.replace('text', 'border')}/20`}>
                    <span className={`text-xs font-bold ${active.textColor} uppercase tracking-widest block mb-2`}>Panjang (2 harakat)</span>
                    <div className="flex justify-center gap-1 mb-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${active.color}`}></div>
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${active.color}`}></div>
                    </div>
                    <span className="font-['Noto_Sans_Arabic'] text-2xl">{active.examples[0]?.arabic}</span>
                    <span className={`block text-sm ${active.textColor} font-bold`}>{active.examples[0]?.latin} ♩♩</span>
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
              Mad = panjangkan bacaan 2 ketukan! Seperti musik, ada irama pendek dan panjang 🎵
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

export default IqraMad;
