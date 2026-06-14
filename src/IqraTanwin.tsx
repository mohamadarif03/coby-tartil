import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility';

const tanwinData = [
  {
    name: 'Fathatain',
    symbol: 'ً',
    sound: '-an',
    description: 'Dua fathah (tanwin fathah), menghasilkan bunyi akhiran "-an"',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    examples: [
      { arabic: 'بً', latin: 'ban', full: 'بًا' },
      { arabic: 'تً', latin: 'tan', full: 'تًا' },
      { arabic: 'ثً', latin: 'tsan', full: 'ثًا' },
      { arabic: 'جً', latin: 'jan', full: 'جًا' },
      { arabic: 'حً', latin: 'han', full: 'حًا' },
      { arabic: 'خً', latin: 'khan', full: 'خًا' },
      { arabic: 'دً', latin: 'dan', full: 'دًا' },
      { arabic: 'رً', latin: 'ran', full: 'رًا' },
      { arabic: 'سً', latin: 'san', full: 'سًا' },
    ],
  },
  {
    name: 'Kasratain',
    symbol: 'ٍ',
    sound: '-in',
    description: 'Dua kasrah (tanwin kasrah), menghasilkan bunyi akhiran "-in"',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    examples: [
      { arabic: 'بٍ', latin: 'bin', full: 'بٍ' },
      { arabic: 'تٍ', latin: 'tin', full: 'تٍ' },
      { arabic: 'ثٍ', latin: 'tsin', full: 'ثٍ' },
      { arabic: 'جٍ', latin: 'jin', full: 'جٍ' },
      { arabic: 'حٍ', latin: 'hin', full: 'حٍ' },
      { arabic: 'خٍ', latin: 'khin', full: 'خٍ' },
      { arabic: 'دٍ', latin: 'din', full: 'دٍ' },
      { arabic: 'رٍ', latin: 'rin', full: 'رٍ' },
      { arabic: 'سٍ', latin: 'sin', full: 'سٍ' },
    ],
  },
  {
    name: 'Dhammatain',
    symbol: 'ٌ',
    sound: '-un',
    description: 'Dua dhammah (tanwin dhammah), menghasilkan bunyi akhiran "-un"',
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-700',
    examples: [
      { arabic: 'بٌ', latin: 'bun', full: 'بٌ' },
      { arabic: 'تٌ', latin: 'tun', full: 'تٌ' },
      { arabic: 'ثٌ', latin: 'tsun', full: 'ثٌ' },
      { arabic: 'جٌ', latin: 'jun', full: 'جٌ' },
      { arabic: 'حٌ', latin: 'hun', full: 'حٌ' },
      { arabic: 'خٌ', latin: 'khun', full: 'خٌ' },
      { arabic: 'دٌ', latin: 'dun', full: 'دٌ' },
      { arabic: 'رٌ', latin: 'run', full: 'رٌ' },
      { arabic: 'سٌ', latin: 'sun', full: 'سٌ' },
    ],
  },
];

function IqraTanwin() {
  const navigate = useNavigate();
  useAccessibility('Tanwin - Tanda Baca Ganda');
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExample, setSelectedExample] = useState(null);

  const active = tanwinData[activeTab];

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

      <main className="ml-72 p-6 md:p-10 pb-32 w-full" id="main-content" role="main">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/iqra' }); }}>Iqra'</a>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-[#800000] font-bold">Tanwin</span>
          </nav>

          {/* Header */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>looks_3</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Tanwin</h2>
                <p className="text-slate-500 font-medium">Tanda Baca Ganda (Nunasi)</p>
              </div>
            </div>
          </section>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-xl text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
            </div>
            <div>
              <h4 className="font-bold text-amber-900 mb-1">Apa itu Tanwin?</h4>
              <p className="text-amber-800 text-sm leading-relaxed">
                Tanwin adalah tanda baca ganda yang menghasilkan bunyi <strong>nun mati</strong> di akhir kata. 
                Berbeda dengan harakat biasa, tanwin menambahkan bunyi "-n" di akhir. Ada tiga jenis: 
                <strong> Fathatain</strong> (-an), <strong>Kasratain</strong> (-in), dan <strong>Dhammatain</strong> (-un).
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            {tanwinData.map((h, i) => (
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
                <span className="text-xl font-bold block mb-1">{h.sound}</span>
                <span className="text-sm font-['Plus_Jakarta_Sans']">{h.name}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Explanation */}
            <div className="lg:col-span-4">
              <div className={`${active.bgColor} rounded-2xl p-8 border ${active.textColor.replace('text', 'border')}/20 relative overflow-hidden`}>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl" aria-hidden="true"></div>
                
                <div className="text-center mb-6">
                  <div className="font-['Noto_Sans_Arabic'] text-[100px] leading-none mb-2 select-none" aria-hidden="true">
                    بـ{active.symbol}
                  </div>
                  <h3 className={`text-2xl font-black ${active.textColor} font-['Plus_Jakarta_Sans']`}>{active.name}</h3>
                  <p className="text-slate-600 mt-2 font-medium text-lg">Bunyi: "{active.sound}"</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed text-center">
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

              {/* Comparison card */}
              <div className="mt-6 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Perbandingan</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-teal-50 rounded-xl">
                    <span className="font-['Noto_Sans_Arabic'] text-2xl">بَ</span>
                    <span className="text-sm font-bold text-teal-700">Fathah = "ba"</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                    <span className="font-['Noto_Sans_Arabic'] text-2xl">بًا</span>
                    <span className="text-sm font-bold text-amber-700">Tanwin = "ban"</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Examples */}
            <div className="lg:col-span-8">
              <h3 className="text-lg font-bold text-[#2a2f32] mb-4 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
                Latihan Baca {active.name}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {active.examples.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedExample(i);
                      speakArabic(ex.full);
                    }}
                    className={`relative bg-white rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 border-2 ${
                      selectedExample === i ? `${active.textColor.replace('text', 'border')} shadow-lg scale-105` : 'border-transparent hover:border-slate-200'
                    }`}
                    aria-label={`${ex.latin}, klik untuk mendengar`}
                  >
                    {selectedExample === i && (
                      <div className="absolute -top-2 -right-2">
                        <span className="material-symbols-outlined text-xl text-[#800000]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      </div>
                    )}
                    <span className="font-['Noto_Sans_Arabic'] text-4xl mb-2 text-[#2a2f32]">{ex.full}</span>
                    <span className="text-sm font-bold text-slate-500 font-['Plus_Jakarta_Sans'] uppercase tracking-wider">{ex.latin}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="fixed bottom-12 right-12 flex items-end gap-4 z-40" aria-hidden="true">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-2xl max-w-[220px] mb-10 border border-slate-100 relative">
            <p className="text-sm font-semibold leading-relaxed text-[#2a2f32]">
              Tanwin itu seperti harakat dobel! Bunyinya selalu ada "-n" di akhir 🔊
            </p>
            <div className="absolute -bottom-2 right-8 w-5 h-5 bg-white rotate-45 border-r border-b border-slate-100"></div>
          </div>
          <div className="w-36 hover:scale-110 transition-transform duration-500 cursor-pointer">
            <img alt="" className="w-full h-auto object-contain drop-shadow-2xl" src={mascotImg} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default IqraTanwin;
