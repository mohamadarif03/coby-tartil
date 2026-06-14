import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility';

const sukunExamples = [
  { arabic: 'أَبْ', latin: 'ab', desc: 'Ba mati (sukun)' },
  { arabic: 'أَتْ', latin: 'at', desc: 'Ta mati (sukun)' },
  { arabic: 'أَثْ', latin: 'ats', desc: 'Tsa mati (sukun)' },
  { arabic: 'أَجْ', latin: 'aj', desc: 'Jim mati (sukun)' },
  { arabic: 'أَحْ', latin: 'ah', desc: 'Ha mati (sukun)' },
  { arabic: 'أَخْ', latin: 'akh', desc: 'Kha mati (sukun)' },
  { arabic: 'أَدْ', latin: 'ad', desc: 'Dal mati (sukun)' },
  { arabic: 'أَرْ', latin: 'ar', desc: 'Ra mati (sukun)' },
  { arabic: 'أَسْ', latin: 'as', desc: 'Sin mati (sukun)' },
  { arabic: 'أَشْ', latin: 'asy', desc: 'Syin mati (sukun)' },
  { arabic: 'أَصْ', latin: 'ash', desc: 'Shad mati (sukun)' },
  { arabic: 'أَلْ', latin: 'al', desc: 'Lam mati (sukun)' },
];

const tasydidExamples = [
  { arabic: 'أَبَّ', latin: 'abba', desc: 'Ba dobel (tasydid)' },
  { arabic: 'أَتَّ', latin: 'atta', desc: 'Ta dobel (tasydid)' },
  { arabic: 'أَثَّ', latin: 'atssa', desc: 'Tsa dobel (tasydid)' },
  { arabic: 'أَجَّ', latin: 'ajja', desc: 'Jim dobel (tasydid)' },
  { arabic: 'أَحَّ', latin: 'ahha', desc: 'Ha dobel (tasydid)' },
  { arabic: 'أَخَّ', latin: 'akhkha', desc: 'Kha dobel (tasydid)' },
  { arabic: 'أَدَّ', latin: 'adda', desc: 'Dal dobel (tasydid)' },
  { arabic: 'أَرَّ', latin: 'arra', desc: 'Ra dobel (tasydid)' },
  { arabic: 'أَسَّ', latin: 'assa', desc: 'Sin dobel (tasydid)' },
  { arabic: 'أَشَّ', latin: 'assya', desc: 'Syin dobel (tasydid)' },
  { arabic: 'أَصَّ', latin: 'assha', desc: 'Shad dobel (tasydid)' },
  { arabic: 'أَلَّ', latin: 'alla', desc: 'Lam dobel (tasydid)' },
];

function IqraSukunTasydid() {
  const navigate = useNavigate();
  useAccessibility('Sukun dan Tasydid');
  const [activeTab, setActiveTab] = useState('sukun');
  const [selectedItem, setSelectedItem] = useState(null);

  const examples = activeTab === 'sukun' ? sukunExamples : tasydidExamples;

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

      <main className="ml-72 p-6 md:p-10 pb-32 w-full" id="main-content" role="main">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/iqra' }); }}>Iqra'</a>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-[#800000] font-bold">Sukun & Tasydid</span>
          </nav>

          {/* Header */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-rose-600" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Sukun & Tasydid</h2>
                <p className="text-slate-500 font-medium">Huruf Mati & Huruf Dobel</p>
              </div>
            </div>
          </section>

          {/* Tab Toggle */}
          <div className="flex gap-3 mb-10 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <button
              onClick={() => { setActiveTab('sukun'); setSelectedItem(null); }}
              className={`flex-1 py-5 px-6 rounded-xl font-bold text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                activeTab === 'sukun' 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
              aria-selected={activeTab === 'sukun'}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-['Noto_Sans_Arabic'] text-3xl" aria-hidden="true">ْ</span>
                <div>
                  <span className="block text-lg font-['Plus_Jakarta_Sans']">Sukun</span>
                  <span className={`text-xs ${activeTab === 'sukun' ? 'text-rose-100' : 'text-slate-400'}`}>Huruf Mati</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => { setActiveTab('tasydid'); setSelectedItem(null); }}
              className={`flex-1 py-5 px-6 rounded-xl font-bold text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                activeTab === 'tasydid' 
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg scale-[1.02]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
              aria-selected={activeTab === 'tasydid'}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="font-['Noto_Sans_Arabic'] text-3xl" aria-hidden="true">ّ</span>
                <div>
                  <span className="block text-lg font-['Plus_Jakarta_Sans']">Tasydid</span>
                  <span className={`text-xs ${activeTab === 'tasydid' ? 'text-indigo-100' : 'text-slate-400'}`}>Huruf Dobel</span>
                </div>
              </div>
            </button>
          </div>

          {/* Explanation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className={`rounded-2xl p-6 border transition-all duration-300 ${
              activeTab === 'sukun' 
                ? 'bg-rose-50 border-rose-200 shadow-md' 
                : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                  <span className="font-['Noto_Sans_Arabic'] text-xl font-bold text-rose-600">ْ</span>
                </div>
                <h3 className="text-lg font-bold text-rose-800 font-['Plus_Jakarta_Sans']">Sukun (سُكُوْن)</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sukun adalah tanda <strong>bulatan kecil</strong> di atas huruf yang menandakan huruf tersebut <strong>mati</strong> (tidak berbunyi vokal). 
                Contoh: <span className="font-['Noto_Sans_Arabic'] text-lg">أَبْ</span> dibaca "ab".
              </p>
            </div>

            <div className={`rounded-2xl p-6 border transition-all duration-300 ${
              activeTab === 'tasydid' 
                ? 'bg-indigo-50 border-indigo-200 shadow-md' 
                : 'bg-white border-slate-100'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <span className="font-['Noto_Sans_Arabic'] text-xl font-bold text-indigo-600">ّ</span>
                </div>
                <h3 className="text-lg font-bold text-indigo-800 font-['Plus_Jakarta_Sans']">Tasydid (تَشْدِيْد)</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tasydid adalah tanda <strong>seperti huruf W kecil</strong> di atas huruf yang menandakan huruf tersebut <strong>didobelkan</strong>.
                Contoh: <span className="font-['Noto_Sans_Arabic'] text-lg">أَبَّ</span> dibaca "abba".
              </p>
            </div>
          </div>

          {/* Comparison Visual */}
          <div className="bg-white rounded-2xl p-8 mb-10 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#2a2f32] mb-6 font-['Plus_Jakarta_Sans'] text-center">
              ⚡ Perbandingan Sukun vs Tasydid
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-rose-50 rounded-xl border border-rose-100">
                <span className="font-['Noto_Sans_Arabic'] text-6xl text-[#2a2f32] block mb-3">أَبْ</span>
                <span className="text-lg font-bold text-rose-600">"ab"</span>
                <p className="text-xs text-slate-500 mt-1">B mati (1x bunyi)</p>
              </div>
              <div className="text-center p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <span className="font-['Noto_Sans_Arabic'] text-6xl text-[#2a2f32] block mb-3">أَبَّ</span>
                <span className="text-lg font-bold text-indigo-600">"abba"</span>
                <p className="text-xs text-slate-500 mt-1">B dobel (2x bunyi)</p>
              </div>
            </div>
          </div>

          {/* Examples Grid */}
          <h3 className="text-lg font-bold text-[#2a2f32] mb-4 font-['Plus_Jakarta_Sans'] flex items-center gap-2">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            Latihan Baca {activeTab === 'sukun' ? 'Sukun' : 'Tasydid'}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedItem(i);
                  speakArabic(ex.arabic);
                }}
                className={`relative bg-white rounded-xl p-5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 border-2 ${
                  selectedItem === i 
                    ? (activeTab === 'sukun' ? 'border-rose-400 shadow-lg scale-105' : 'border-indigo-400 shadow-lg scale-105')
                    : 'border-transparent hover:border-slate-200'
                }`}
                aria-label={`${ex.latin}: ${ex.desc}`}
              >
                {selectedItem === i && (
                  <div className="absolute -top-2 -right-2">
                    <span className="material-symbols-outlined text-xl text-[#800000]" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                  </div>
                )}
                <span className="font-['Noto_Sans_Arabic'] text-4xl mb-2 text-[#2a2f32]">{ex.arabic}</span>
                <span className="text-sm font-bold text-slate-500 font-['Plus_Jakarta_Sans']">{ex.latin}</span>
                <span className="text-[10px] text-slate-400 mt-1">{ex.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mascot */}
        <div className="fixed bottom-12 right-12 flex items-end gap-4 z-40" aria-hidden="true">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-2xl max-w-[220px] mb-10 border border-slate-100 relative">
            <p className="text-sm font-semibold leading-relaxed text-[#2a2f32]">
              {activeTab === 'sukun' 
                ? 'Sukun = huruf mati. Tidak ada vokal (a/i/u) setelahnya! 🧠' 
                : 'Tasydid = dobel bunyi. Tekan hurufnya 2x lipatan! 💪'}
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

export default IqraSukunTasydid;
