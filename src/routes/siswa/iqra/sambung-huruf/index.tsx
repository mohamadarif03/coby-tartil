import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/siswa/iqra/sambung-huruf/')({
  component: IqraSambungHuruf,
})

import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';

const sambungData = [
  { letter: 'ب', name: 'Ba', independent: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', example: 'با', exampleLatin: 'baa' },
  { letter: 'ت', name: 'Ta', independent: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', example: 'تا', exampleLatin: 'taa' },
  { letter: 'ث', name: 'Tsa', independent: 'ث', initial: 'ثـ', medial: '~ثـ', final: 'ـث', example: 'ثا', exampleLatin: 'tsaa' },
  { letter: 'ج', name: 'Jim', independent: 'ج', initial: 'جـ', medial: '~جـ', final: 'ـج', example: 'جا', exampleLatin: 'jaa' },
  { letter: 'ح', name: 'Ha', independent: 'ح', initial: 'حـ', medial: '~حـ', final: 'ـح', example: 'حا', exampleLatin: 'haa' },
  { letter: 'خ', name: 'Kha', independent: 'خ', initial: 'خـ', medial: '~خـ', final: 'ـخ', example: 'خا', exampleLatin: 'khaa' },
  { letter: 'د', name: 'Dal', independent: 'د', initial: 'د', medial: '~د', final: 'ـد', example: 'دا', exampleLatin: 'daa' },
  { letter: 'ر', name: 'Ra', independent: 'ر', initial: 'ر', medial: '~ر', final: 'ـر', example: 'را', exampleLatin: 'raa' },
  { letter: 'س', name: 'Sin', independent: 'س', initial: 'سـ', medial: '~سـ', final: 'ـس', example: 'سا', exampleLatin: 'saa' },
  { letter: 'ش', name: 'Syin', independent: 'ش', initial: 'شـ', medial: '~شـ', final: 'ـش', example: 'شا', exampleLatin: 'syaa' },
];

const simpleWords = [
  { arabic: 'بَابٌ', latin: 'baabun', meaning: 'Pintu' },
  { arabic: 'كِتَابٌ', latin: 'kitaabun', meaning: 'Buku' },
  { arabic: 'بَحْرٌ', latin: 'bahrun', meaning: 'Laut' },
  { arabic: 'شَمْسٌ', latin: 'syamsun', meaning: 'Matahari' },
  { arabic: 'جَبَلٌ', latin: 'jabalun', meaning: 'Gunung' },
  { arabic: 'سَمَاءٌ', latin: 'samaa-un', meaning: 'Langit' },
];

function IqraSambungHuruf() {
  const navigate = useNavigate();
  useAccessibility('Sambung Huruf');
  const [selectedLetter, setSelectedLetter] = useState(0);
  const [activeSection, setActiveSection] = useState('bentuk'); // 'bentuk' or 'kata'

  const current = sambungData[selectedLetter];

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

      <main className="w-full p-6 pb-32 ml-72 md:p-10" id="main-content" role="main">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center mb-8 space-x-2 text-sm font-medium text-slate-500">
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/siswa' }); }}>Beranda</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <a className="hover:text-[#800000] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate({ to: '/iqra' }); }}>Iqra'</a>
            <span className="text-base material-symbols-outlined">chevron_right</span>
            <span className="text-[#800000] font-bold">Sambung Huruf</span>
          </nav>

          {/* Header */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-violet-100">
                <span className="text-3xl material-symbols-outlined text-violet-600" style={{ fontVariationSettings: "'FILL' 1" }}>link</span>
              </div>
              <div>
                <h2 className="text-4xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans'] tracking-tight">Sambung Huruf</h2>
                <p className="font-medium text-slate-500">Belajar menyambung huruf hijaiyah</p>
              </div>
            </div>
          </section>

          {/* Section Toggle */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => setActiveSection('bentuk')}
              className={`px-6 py-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                activeSection === 'bentuk'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'
              }`}
            >
              <span className="mr-2 text-sm align-middle material-symbols-outlined">abc</span>
              Bentuk Huruf
            </button>
            <button
              onClick={() => setActiveSection('kata')}
              className={`px-6 py-3 rounded-xl font-bold transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                activeSection === 'kata'
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-violet-50 border border-slate-200'
              }`}
            >
              <span className="mr-2 text-sm align-middle material-symbols-outlined">menu_book</span>
              Kata Sederhana
            </button>
          </div>

          {activeSection === 'bentuk' ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Letter Selector */}
              <div className="lg:col-span-4">
                <h3 className="mb-4 text-sm font-bold tracking-widest uppercase text-slate-400">Pilih Huruf</h3>
                <div className="grid grid-cols-5 gap-2">
                  {sambungData.map((item, i) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedLetter(i)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center font-['Noto_Sans_Arabic'] text-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] ${
                        selectedLetter === i
                          ? 'bg-violet-600 text-white shadow-lg scale-110'
                          : 'bg-white text-slate-700 hover:bg-violet-50 border border-slate-100'
                      }`}
                      aria-label={`Huruf ${item.name}`}
                    >
                      {item.letter}
                      <span className="text-[9px] font-['Plus_Jakarta_Sans'] font-bold mt-1 opacity-70">{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter Forms */}
              <div className="lg:col-span-8">
                <div className="p-8 bg-white border shadow-sm rounded-2xl border-slate-100">
                  <h3 className="text-xl font-bold text-[#2a2f32] mb-6 font-['Plus_Jakarta_Sans'] flex items-center gap-3">
                    <span className="font-['Noto_Sans_Arabic'] text-3xl text-violet-600">{current.letter}</span>
                    Bentuk Huruf {current.name}
                  </h3>

                  {/* Letter Forms Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4">
                    {[
                      { label: 'Sendiri', value: current.independent, desc: 'Bentuk Mandiri' },
                      { label: 'Awal', value: current.initial, desc: 'Di Awal Kata' },
                      { label: 'Tengah', value: current.medial, desc: 'Di Tengah Kata' },
                      { label: 'Akhir', value: current.final, desc: 'Di Akhir Kata' },
                    ].map((form) => (
                      <button
                        key={form.label}
                        onClick={() => speakArabic(form.value)}
                        className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 flex flex-col items-center border border-slate-100 hover:border-violet-300 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] group"
                        aria-label={`${form.desc} huruf ${current.name}`}
                      >
                        <span className="mb-3 text-xs font-bold tracking-widest uppercase text-slate-400">{form.label}</span>
                        <span className="font-['Noto_Sans_Arabic'] text-5xl text-[#2a2f32] group-hover:text-violet-600 transition-colors">{form.value}</span>
                        <span className="text-[10px] text-slate-400 mt-2">{form.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Sambung Example */}
                  <div className="p-6 border bg-violet-50 rounded-xl border-violet-100">
                    <h4 className="mb-4 text-sm font-bold tracking-widest uppercase text-violet-600">Contoh Sambung</h4>
                    <div className="flex items-center justify-center gap-4 text-center">
                      <div className="px-4 py-3 bg-white shadow-sm rounded-xl">
                        <span className="font-['Noto_Sans_Arabic'] text-4xl text-[#2a2f32]">{current.letter}</span>
                      </div>
                      <span className="text-2xl font-bold text-violet-400">+</span>
                      <div className="px-4 py-3 bg-white shadow-sm rounded-xl">
                        <span className="font-['Noto_Sans_Arabic'] text-4xl text-[#2a2f32]">ا</span>
                      </div>
                      <span className="text-2xl font-bold text-violet-400">=</span>
                      <button
                        onClick={() => speakArabic(current.example)}
                        className="px-6 py-3 bg-violet-600 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] group"
                        aria-label={`Dengarkan ${current.exampleLatin}`}
                      >
                        <span className="font-['Noto_Sans_Arabic'] text-4xl text-white">{current.example}</span>
                        <div className="mt-1 text-xs font-bold text-violet-200">{current.exampleLatin}</div>
                        <span className="text-sm text-white transition-opacity opacity-0 material-symbols-outlined group-hover:opacity-100" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Simple Words Section */
            <div>
              <h3 className="text-xl font-bold text-[#2a2f32] mb-6 font-['Plus_Jakarta_Sans']">
                📖 Latihan Membaca Kata Sederhana
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {simpleWords.map((word, i) => (
                  <button
                    key={i}
                    onClick={() => speakArabic(word.arabic)}
                    className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-slate-100 hover:border-violet-300 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#ffd700] group hover:scale-[1.03]"
                    aria-label={`Kata ${word.latin}, artinya ${word.meaning}`}
                  >
                    <span className="font-['Noto_Sans_Arabic'] text-5xl text-[#2a2f32] group-hover:text-violet-600 transition-colors mb-4">{word.arabic}</span>
                    <span className="text-lg font-bold text-violet-600 font-['Plus_Jakarta_Sans']">{word.latin}</span>
                    <span className="mt-1 text-sm text-slate-500">{word.meaning}</span>
                    <div className="flex items-center gap-2 mt-4 text-xs transition-opacity opacity-0 text-slate-400 group-hover:opacity-100">
                      <span className="text-sm material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                      Klik untuk dengar
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mascot */}
        <div className="fixed z-40 flex items-end gap-4 bottom-12 right-12" aria-hidden="true">
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-xl shadow-2xl max-w-[220px] mb-10 border border-slate-100 relative">
            <p className="text-sm font-semibold leading-relaxed text-[#2a2f32]">
              Setiap huruf punya bentuk berbeda tergantung posisinya! Yuk pelajari! 🔤
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

export default IqraSambungHuruf;
