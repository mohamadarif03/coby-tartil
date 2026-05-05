import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import mascotImg from './assets/maskot.png';
import useAccessibility from './useAccessibility';

const lessons = [
  {
    id: 'hijaiyah',
    icon: 'sort_by_alpha',
    emoji: '📚',
    title: 'Pengenalan Huruf Hijaiyah',
    subtitle: 'Huruf dasar ا sampai ي',
    description: 'Pelajari huruf dasar, bentuk awal-tengah-akhir, suara tiap huruf, dan animasi cara pengucapan.',
    color: 'from-teal-500 to-emerald-600',
    bgLight: 'bg-teal-50',
    iconColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    hoverShadow: 'hover:shadow-teal-200/50',
    tag: 'Dasar',
  },
  {
    id: 'harakat',
    icon: 'edit_note',
    emoji: '🔤',
    title: 'Harakat (Tanda Baca)',
    subtitle: 'Fathah, Kasrah, Dhammah',
    description: 'Belajar tanda baca: Fathah (a), Kasrah (i), Dhammah (u). Latihan baca dan audio per kombinasi.',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    iconColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    hoverShadow: 'hover:shadow-blue-200/50',
    tag: 'Penting',
  },
  {
    id: 'sambung-huruf',
    icon: 'link',
    emoji: '🔁',
    title: 'Sambung Huruf',
    subtitle: 'Ba Ta Tsa & Latihan Kata',
    description: 'Belajar huruf yang disambung. Latihan drag & drop dan membaca kata sederhana.',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    iconColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    hoverShadow: 'hover:shadow-violet-200/50',
    tag: 'Interaktif',
  },
  {
    id: 'tanwin',
    icon: 'looks_3',
    emoji: '🔊',
    title: 'Tanwin',
    subtitle: 'Fathatain, Kasratain, Dhammatain',
    description: 'Pelajari bunyi -an, -in, -un. Latihan membedakan tanwin dengan harakat biasa.',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    iconColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    hoverShadow: 'hover:shadow-amber-200/50',
    tag: 'Menengah',
  },
  {
    id: 'sukun-tasydid',
    icon: 'psychology',
    emoji: '🧠',
    title: 'Sukun & Tasydid',
    subtitle: 'Huruf Mati & Huruf Dobel',
    description: 'Pahami huruf mati (sukun) dan huruf dobel (tasydid). Contoh: أَبْ dan أَبَّ.',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    iconColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    hoverShadow: 'hover:shadow-rose-200/50',
    tag: 'Menengah',
  },
  {
    id: 'mad',
    icon: 'music_note',
    emoji: '🎵',
    title: 'Mad (Panjang Pendek)',
    subtitle: 'Mad Thabi\'i & Huruf Mad',
    description: 'Belajar mad thabi\'i (2 harakat). Huruf mad: ا، و، ي. Latihan panjang-pendek bacaan.',
    color: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    hoverShadow: 'hover:shadow-cyan-200/50',
    tag: 'Lanjutan',
  },
];

function Iqra() {
  const navigate = useNavigate();
  useAccessibility('Menu Iqra - Belajar Membaca Al-Quran');



  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="iqra" />

      <main className="ml-72 p-10 max-w-7xl mx-auto w-full" id="main-content" role="main">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8">
          <a className="hover:text-[#006b5c] transition-colors" href="#" onClick={(e) => { e.preventDefault(); navigate('/siswa'); }}>Beranda</a>
          <span className="material-symbols-outlined text-base">chevron_right</span>
          <span className="text-[#006b5c] font-bold">Iqra'</span>
        </nav>

        {/* Hero Header */}
        <section className="mb-12 relative overflow-hidden">
          <div className="bg-gradient-to-br from-[#006b5c] via-[#00897b] to-[#00695a] rounded-3xl p-10 md:p-14 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl" aria-hidden="true"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#D4A017]/10 rounded-full blur-3xl" aria-hidden="true"></div>
            <div className="absolute top-0 right-0 w-full h-full hero-pattern opacity-20" aria-hidden="true"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                  <span className="material-symbols-outlined text-[#D4A017] text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
                  <span className="text-teal-100 font-semibold text-sm tracking-wide">Metode Iqra' Digital</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-['Plus_Jakarta_Sans']">
                  Iqra' <span className="text-[#D4A017]">Interaktif</span>
                </h2>
                <p className="text-teal-100/90 text-lg max-w-lg leading-relaxed">
                  Belajar membaca Al-Qur'an dari dasar dengan metode Iqra' yang sistematis, interaktif, dan menyenangkan.
                </p>


              </div>

              {/* Mascot */}
              <div className="hidden md:block w-48 lg:w-56 shrink-0" aria-hidden="true">
                <img src={mascotImg} alt="" className="w-full h-auto object-contain hero-coby drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]" />
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Grid */}
        <section aria-labelledby="lessons-heading">
          <div className="flex items-center justify-between mb-8">
            <h3 id="lessons-heading" className="text-2xl font-black text-[#2a2f32] font-['Plus_Jakarta_Sans']">
              Pilih Materi Pembelajaran
            </h3>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="material-symbols-outlined text-base">school</span>
              <span>{lessons.length} Materi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => navigate(`/iqra/${lesson.id}`)}
                aria-label={lesson.title}
                className={`group relative bg-white rounded-2xl p-7 flex flex-col text-left transition-all duration-500 hover:scale-[1.02] ${lesson.hoverShadow} hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2 border ${lesson.borderColor} border-opacity-50`}
              >
                {/* Tag Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    lesson.tag === 'Dasar' ? 'bg-teal-100 text-teal-700' :
                    lesson.tag === 'Penting' ? 'bg-blue-100 text-blue-700' :
                    lesson.tag === 'Interaktif' ? 'bg-violet-100 text-violet-700' :
                    lesson.tag === 'Menengah' ? 'bg-amber-100 text-amber-700' :
                    'bg-cyan-100 text-cyan-700'
                  }`}>
                    {lesson.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${lesson.bgLight} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <span className={`material-symbols-outlined text-3xl ${lesson.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {lesson.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg" aria-hidden="true">{lesson.emoji}</span>
                    <h4 className="text-lg font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans'] leading-tight">
                      {lesson.title}
                    </h4>
                  </div>
                  <p className="text-sm font-semibold text-slate-500 mb-3">{lesson.subtitle}</p>
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{lesson.description}</p>
                </div>

                {/* Mulai Belajar CTA */}
                <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#006b5c]">Mulai Belajar</span>
                  <span className="material-symbols-outlined text-[#006b5c] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Tips */}
        <section className="mt-12 bg-gradient-to-r from-[#f0fdf4] to-[#ecfdf5] rounded-2xl p-8 border border-teal-100 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl text-teal-600" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
          </div>
          <div>
            <h4 className="font-bold text-teal-900 text-lg mb-1 font-['Plus_Jakarta_Sans']">Tips Belajar Iqra'</h4>
            <p className="text-teal-700 text-sm leading-relaxed">
              Mulailah dari <strong>Pengenalan Huruf Hijaiyah</strong> untuk memahami dasar-dasar huruf Arab. 
              Setelah menguasai huruf dasar, lanjutkan ke <strong>Harakat</strong> untuk belajar tanda baca. 
              Ikuti urutan materi untuk hasil belajar yang optimal!
            </p>
          </div>
        </section>

        {/* Mascot Floating UI */}
        <div className="fixed bottom-12 right-12 flex items-end gap-4 z-40 md:hidden" aria-hidden="true">
          <div className="w-32 hover:scale-110 transition-transform duration-500 cursor-pointer">
            <img alt="" className="w-full h-auto object-contain drop-shadow-2xl" src={mascotImg} />
          </div>
        </div>
      </main>

      <header className="md:hidden fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 h-16 bg-[#f3f7fb]/70 dark:bg-slate-900/70 backdrop-blur-lg">
        <span className="text-2xl font-black text-[#006b5c] tracking-tight font-['Plus_Jakarta_Sans']">CobyTartil</span>
        <button className="material-symbols-outlined text-[#006b5c]">menu</button>
      </header>
    </div>
  );
}

export default Iqra;
