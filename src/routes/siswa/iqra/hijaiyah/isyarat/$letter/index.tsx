import { createFileRoute } from '@tanstack/react-router'
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/siswa/iqra/hijaiyah/isyarat/$letter/')({
  beforeLoad: requireStudentRole,
  component: DetailHijaiyahIsyarat,
})

import React from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useHandsign } from '@/hooks/use-handsign';

function DetailHijaiyahIsyarat() {
    const navigate = useNavigate();
    const { letter } = useParams({ from: '/siswa/iqra/hijaiyah/isyarat/$letter/' });
    const { statusMsg, videoRef, canvasRef } = useHandsign(letter);
    const displayLetter = letter.charAt(0).toUpperCase() + letter.slice(1);

    return (
        <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body flex">
            <Sidebar activeMenu="iqra" />

            {/* Main Content Area */}
            <main className="w-full p-6 pb-32 ml-0 lg:ml-72 md:p-12" id="main-content" role="main">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-[#575c60] font-medium">
                    <span onClick={() => navigate({ to: '/siswa' })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex={0}>Beranda</span>
                    <span className="text-sm material-symbols-outlined">chevron_right</span>
                    <span onClick={() => navigate({ to: '/siswa/iqra' })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex={0}>Iqra'</span>
                    <span className="text-sm material-symbols-outlined">chevron_right</span>
                    <span onClick={() => navigate({ to: '/siswa/iqra/hijaiyah' })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex={0}>Hijaiyah</span>
                    <span className="text-sm material-symbols-outlined">chevron_right</span>
                    <span className="text-[#800000] font-bold">{displayLetter} (Isyarat)</span>
                </nav>

                <div className="grid items-start max-w-6xl grid-cols-1 gap-8 mx-auto lg:grid-cols-12">
                    {/* Left Side: Letter & Visual Guide */}
                    <div className="space-y-8 lg:col-span-5">
                        {/* Letter Display Card */}
                        <div className="bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-[0_20px_50px_-12px_rgba(0,107,92,0.08)]">
                            <div className="absolute relative inset-0 z-0 bg-arabesque opacity-10"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5de3fc]/20 rounded-full blur-3xl"></div>
                            <div className="relative z-10 w-full">
                                <span className="block text-[120px] md:text-[140px] font-bold text-[#800000] leading-none font-['Noto_Sans_Arabic'] mb-4">ب</span>
                                <h2 className="text-3xl font-black text-[#2a2f32] mt-4 font-['Plus_Jakarta_Sans']">{displayLetter}</h2>
                                <p className="text-[#575c60] text-sm mt-1 font-medium font-['Plus_Jakarta_Sans']">Huruf Hijaiyah</p>
                            </div>
                        </div>

                        {/* Handsign Visual Guide */}
                        <div className="bg-[#ecf1f6] rounded-xl p-8 relative overflow-hidden shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans']">Panduan Isyarat</h3>
                                <div className="bg-[#ffd700]/20 px-3 py-1 rounded-full">
                                    <span className="text-xs font-bold text-[#b18b10]">3D Visual</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm aspect-square">
                               <img alt={`Visual 3D tangan menunjukkan isyarat huruf ${displayLetter}`} className="object-contain w-full h-full transition-transform duration-500 cursor-pointer hover:scale-105" src='/img/hijaiyah/baa.png' />
                            </div>
                            <p className="mt-6 text-[#575c60] text-sm leading-relaxed font-['Plus_Jakarta_Sans']">
                                Posisikan tangan Anda sesuai panduan visual untuk melambangkan bentuk huruf <span className="font-bold text-[#800000]">{displayLetter}</span>.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Interaction Area */}
                    <div className="space-y-8 lg:col-span-7">
                        {/* Camera Preview Section */}
                        <div className="bg-[#002e26] rounded-xl overflow-hidden relative group aspect-video lg:aspect-[4/3] flex flex-col shadow-2xl">
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest font-['Plus_Jakarta_Sans']">Live Recognition</span>
                            </div>

                            {/* Camera Visual */}
                            <div className="flex-1 bg-[#1c1c18] relative flex items-center justify-center overflow-hidden">
                                <video ref={videoRef} className="hidden" autoPlay playsInline></video>
                                <canvas ref={canvasRef} className="absolute inset-0 object-cover w-full h-full"></canvas>
                                {/* Scanning Frame */}
                                <div className="relative w-64 h-64 border-2 border-[#ffd700]/50 rounded-2xl z-10 box-border">
                                    <div className="scanning-line" style={{ background: 'linear-gradient(to right, transparent, #ffd700, transparent)' }}></div>
                                    {/* Corners */}
                                    <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-[#ffd700] rounded-tl-lg"></div>
                                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-[#ffd700] rounded-tr-lg"></div>
                                    <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-[#ffd700] rounded-bl-lg"></div>
                                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-[#ffd700] rounded-br-lg"></div>
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="flex items-center justify-between p-6 bg-white border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#800000]/10 flex items-center justify-center shadow-inner">
                                        <span className="material-symbols-outlined text-[#800000] text-xl animate-spin-slow">sync</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans']">Status Deteksi</h4>
                                        <p className={`text-xs font-semibold mt-0.5 font-['Plus_Jakarta_Sans'] ${statusMsg.includes('✅') ? 'text-green-600 text-sm' : 'text-[#800000]'}`}>
                                            {statusMsg}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#ffd700] animate-pulse"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#ffd700]/30"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#ffd700]/30"></div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between gap-6">
                            <button onClick={() => navigate({ to: '/siswa/iqra/hijaiyah' })} className="flex items-center gap-4 px-6 py-4 bg-[#white] hover:bg-[#ecf1f6] border border-[#800000]/20 text-[#800000] font-black rounded-full transition-all hover:-translate-x-2 w-1/3 justify-center shadow-sm font-['Plus_Jakarta_Sans']">
                                <span className="text-lg material-symbols-outlined">arrow_back</span>
                                Kembali
                            </button>
                            <button className="flex items-center gap-4 px-6 py-4 bg-[#800000] text-[#dbf8ff] font-black rounded-full transition-all hover:translate-x-2 shadow-lg shadow-[#800000]/20 w-2/3 justify-center font-['Plus_Jakarta_Sans']">
                                Lanjut ke Huruf Berikutnya
                                <span className="text-lg material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coby the Mascot */}
                <div className="fixed z-40 flex flex-col items-end hidden gap-2 pointer-events-none bottom-24 md:bottom-8 right-8 md:flex">
                    {/* Speech Bubble */}
                    <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-[#800000]/10 max-w-[200px] relative mb-2 animate-bounce-slow">
                        <p className="text-[#800000] font-bold text-sm leading-relaxed text-center font-['Plus_Jakarta_Sans']">
                            Coba praktekkan isyarat {displayLetter} ya! 🤲
                        </p>
                        {/* Tail */}
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-[#800000]/10 rotate-45"></div>
                    </div>
                    {/* Mascot Image */}
                    <div className="w-32 h-32 drop-shadow-[0_20px_30px_rgba(0,107,92,0.3)]">
                        <img alt="Asisten Coby" className="object-contain w-full h-full drop-shadow-lg" src='/maskot.png'/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default DetailHijaiyahIsyarat;
