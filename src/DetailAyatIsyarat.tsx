import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import { useNavigate, useParams } from '@tanstack/react-router';
import maskot from './assets/maskot.png';

const DetailAyatIsyarat = () => {
    const navigate = useNavigate();
    const { surah } = useParams({ from: '/ayat-pendek/isyarat/$surah' });
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [statusMsg, setStatusMsg] = useState("Menyiapkan kamera...");
    const [currentVerse, setCurrentVerse] = useState(0);
    const [handsDetected, setHandsDetected] = useState(false);

    // Data surah
    const surahData = {
        'al-kautsar': {
            name: 'Al-Kautsar',
            arabicName: 'الكوثر',
            surahNumber: 108,
            type: 'Makkiyah',
            verses: [
                {
                    id: 1,
                    arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
                    transliteration: "Innaa a'thaynaaka al-kautsar",
                    translation: "\"Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak\"",
                },
                {
                    id: 2,
                    arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
                    transliteration: "Fa shalli lirabbika wanhar",
                    translation: "\"Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah\"",
                },
                {
                    id: 3,
                    arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
                    transliteration: "Inna syaani'aka huwal abtar",
                    translation: "\"Sungguh, orang-orang yang membencimu dialah yang terputus (dari rahmat Allah)\"",
                }
            ]
        },
        'al-asr': {
            name: 'Al-Asr',
            arabicName: 'العصر',
            surahNumber: 103,
            type: 'Makkiyah',
            verses: [
                {
                    id: 1,
                    arabic: "وَالْعَصْرِ",
                    transliteration: "Wal 'ashr",
                    translation: "\"Demi masa\"",
                },
                {
                    id: 2,
                    arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
                    transliteration: "Innal insaana lafii khusr",
                    translation: "\"Sungguh, manusia berada dalam kerugian\"",
                },
                {
                    id: 3,
                    arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
                    transliteration: "Illal ladziina aamanuu wa 'amilush shaalihaati wa tawaashau bil haqqi wa tawaashau bish shabr",
                    translation: "\"Kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran\"",
                }
            ]
        }
    };

    const currentSurah = surahData[surah] || surahData['al-kautsar'];
    const verse = currentSurah.verses[currentVerse];
    const isFirst = currentVerse === 0;
    const isLast = currentVerse === currentSurah.verses.length - 1;

    const handleNext = () => {
        if (!isLast) setCurrentVerse(prev => prev + 1);
        else navigate({ to: '/ayat-pendek' });
    };

    const handlePrev = () => {
        if (isFirst) navigate({ to: '/ayat-pendek' });
        else setCurrentVerse(prev => prev - 1);
    };

    // Murottal audio
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const playMurottal = async () => {
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            return;
        }

        setIsPlaying(true);
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/ayah/${currentSurah.surahNumber}:${verse.id}/ar.alafasy`);
            const result = await response.json();

            if (result.code === 200 && result.data.audio) {
                if (audioRef.current) {
                    audioRef.current.pause();
                }
                const audio = new Audio(result.data.audio);
                audioRef.current = audio;

                audio.onended = () => setIsPlaying(false);
                audio.onerror = () => {
                    setIsPlaying(false);
                    console.error("Gagal memutar audio.");
                };

                await audio.play();
            } else {
                setIsPlaying(false);
            }
        } catch (error) {
            console.error("Error fetching murottal:", error);
            setIsPlaying(false);
        }
    };

    // Camera + MediaPipe Hand Tracking
    useEffect(() => {
        const videoElement = videoRef.current;
        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext('2d');

        if (!window.Hands || !window.Camera) {
            setStatusMsg("Memuat model kecerdasan buatan...");
            setTimeout(() => setStatusMsg("Mohon muat ulang jika loading terlalu lama."), 5000);
            return;
        }

        const hands = new window.Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }
        });

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        });

        hands.onResults((results) => {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            // Draw camera feed mirrored
            canvasCtx.translate(canvasElement.width, 0);
            canvasCtx.scale(-1, 1);
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                setHandsDetected(true);
                setStatusMsg("✋ Tangan terdeteksi — Lakukan gestur isyarat ayat");
                for (const landmarks of results.multiHandLandmarks) {
                    window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, { color: '#ffd700', lineWidth: 3 });
                    window.drawLandmarks(canvasCtx, landmarks, { color: '#800000', lineWidth: 2 });
                }
            } else {
                setHandsDetected(false);
                setStatusMsg("Memindai gestur tangan...");
            }
            canvasCtx.restore();
        });

        const camera = new window.Camera(videoElement, {
            onFrame: async () => {
                if (canvasElement) {
                    canvasElement.width = videoElement.videoWidth;
                    canvasElement.height = videoElement.videoHeight;
                    await hands.send({ image: videoElement });
                }
            },
            width: 640,
            height: 480
        });

        camera.start().catch((err) => {
            console.error(err);
            setStatusMsg("Izin kamera ditolak. Pastikan kamera sudah diizinkan.");
        });

        return () => {
            camera.stop();
            hands.close();
        };
    }, []);

    return (
        <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body flex">
            <Sidebar activeMenu="short-verses" />

            <main className="ml-72 p-6 md:p-12 pb-32 w-full" id="main-content" role="main">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-[#575c60] font-medium">
                    <span onClick={() => navigate({ to: '/siswa' })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex="0">Beranda</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span onClick={() => navigate({ to: '/ayat-pendek' })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex="0">Ayat Pendek</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span onClick={() => navigate({ to: `/ayat-pendek/${surah}` })} className="hover:text-[#800000] cursor-pointer transition-colors" tabIndex="0">{currentSurah.name}</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-[#800000] font-bold">Mode Isyarat 🤟</span>
                </nav>

                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-4 py-1.5 bg-[#ffd700]/20 text-[#b18b10] text-xs font-black uppercase tracking-widest rounded-full flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">sign_language</span>
                                    Mode Isyarat
                                </span>
                                <span className="px-4 py-1.5 bg-[#800000]/10 text-[#800000] text-xs font-black uppercase tracking-widest rounded-full">
                                    Ayat {verse.id} / {currentSurah.verses.length}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#800000] siswa-headline tracking-tight">{currentSurah.name}</h1>
                        </div>
                        <span className="font-['Amiri'] text-6xl font-bold text-[#800000]/80">{currentSurah.arabicName}</span>
                    </div>

                    {/* Verse progress dots */}
                    <div className="flex gap-2 mt-4">
                        {currentSurah.verses.map((v, index) => (
                            <button
                                key={v.id}
                                onClick={() => setCurrentVerse(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentVerse ? 'bg-[#ffd700] w-8' : 'bg-[#dde3e8] w-3 hover:bg-[#800000]/30'}`}
                                aria-label={`Pindah ke ayat ${v.id}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Side: Ayat Display */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Arabic Verse Card */}
                        <div className="bg-white rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,107,92,0.08)]">
                            <div className="absolute inset-0 bg-arabesque relative z-0 opacity-10"></div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ffd700]/10 rounded-full blur-3xl"></div>
                            <div className="relative z-10">
                                <p className="font-['Amiri'] text-[3.5rem] md:text-[4.5rem] leading-[1.5] text-[#800000] text-center mb-6" dir="rtl">
                                    {verse.arabic}
                                </p>
                                <div className="border-t border-[#ecf1f6] pt-6 space-y-3">
                                    <p className="text-lg font-bold text-[#2a2f32] text-center font-['Plus_Jakarta_Sans']">
                                        {verse.transliteration}
                                    </p>
                                    <p className="text-sm text-[#575c60] text-center italic leading-relaxed font-['Plus_Jakarta_Sans']">
                                        {verse.translation}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Listen Button */}
                        <button
                            onClick={playMurottal}
                            className={`w-full flex items-center justify-center gap-4 px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-sm ${isPlaying
                                    ? 'bg-red-50 text-red-600 border-2 border-red-200'
                                    : 'bg-[#800000] text-white hover:bg-[#005a4d] shadow-lg shadow-[#800000]/20'
                                } font-['Plus_Jakarta_Sans']`}
                        >
                            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {isPlaying ? 'stop_circle' : 'play_arrow'}
                            </span>
                            {isPlaying ? 'Berhenti' : 'Dengarkan Murottal'}
                        </button>

                        {/* Info Card for Tuna Wicara */}
                        <div className="bg-[#ecf1f6] rounded-xl p-6 relative overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[#ffd700]/20 flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-[#b18b10] text-lg">info</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#2a2f32] mb-1 font-['Plus_Jakarta_Sans']">Mode Tuna Wicara</h4>
                                    <p className="text-sm text-[#575c60] leading-relaxed font-['Plus_Jakarta_Sans']">
                                        Gunakan gestur tangan untuk merespons ayat. Kamera akan mendeteksi tangan kamu secara otomatis. Meskipun belum ada contoh isyarat spesifik, fitur ini memungkinkan interaksi visual.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Camera Area */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Camera Preview Section */}
                        <div className="bg-[#002e26] rounded-2xl overflow-hidden relative group aspect-video lg:aspect-[4/3] flex flex-col shadow-2xl">
                            {/* Live badge */}
                            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <div className={`w-2 h-2 rounded-full animate-pulse ${handsDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className="text-[10px] font-bold text-white uppercase tracking-widest font-['Plus_Jakarta_Sans']">Live Recognition</span>
                            </div>

                            {/* Ayat overlay on camera */}
                            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 max-w-[200px]">
                                <p className="font-['Amiri'] text-white text-xl text-right leading-relaxed" dir="rtl">
                                    {verse.arabic}
                                </p>
                            </div>

                            {/* Camera Visual */}
                            <div className="flex-1 bg-[#1c1c18] relative flex items-center justify-center overflow-hidden">
                                <video ref={videoRef} className="hidden" autoPlay playsInline></video>
                                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover"></canvas>
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
                            <div className="bg-white p-5 flex items-center justify-between border-t border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${handsDetected ? 'bg-green-100' : 'bg-[#800000]/10'}`}>
                                        <span className={`material-symbols-outlined text-xl ${handsDetected ? 'text-green-600' : 'text-[#800000] animate-spin-slow'}`}>
                                            {handsDetected ? 'done' : 'sync'}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#2a2f32] font-['Plus_Jakarta_Sans']">Status Deteksi</h4>
                                        <p className={`text-xs font-semibold mt-0.5 font-['Plus_Jakarta_Sans'] ${handsDetected ? 'text-green-600' : 'text-[#800000]'}`}>
                                            {statusMsg}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className={`w-2 h-2 rounded-full ${handsDetected ? 'bg-green-500' : 'bg-[#ffd700]'} animate-pulse`}></div>
                                    <div className="w-2 h-2 rounded-full bg-[#ffd700]/30"></div>
                                    <div className="w-2 h-2 rounded-full bg-[#ffd700]/30"></div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={handlePrev}
                                className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-[#ecf1f6] border border-[#800000]/20 text-[#800000] font-black rounded-full transition-all hover:-translate-x-1 shadow-sm font-['Plus_Jakarta_Sans']"
                            >
                                <span className="material-symbols-outlined text-lg">arrow_back</span>
                                {isFirst ? "Kembali" : "Ayat Sebelumnya"}
                            </button>
                            <button
                                onClick={() => navigate({ to: `/ayat-pendek/${surah}` })}
                                className="flex items-center gap-3 px-5 py-4 bg-[#ecf1f6] hover:bg-[#dde3e8] text-[#575c60] font-bold rounded-full transition-all shadow-sm font-['Plus_Jakarta_Sans']"
                                aria-label="Beralih ke mode reguler (suara)"
                            >
                                <span className="material-symbols-outlined text-lg">mic</span>
                                Mode Suara
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-3 px-6 py-4 bg-[#800000] text-[#dbf8ff] font-black rounded-full transition-all hover:translate-x-1 shadow-lg shadow-[#800000]/20 font-['Plus_Jakarta_Sans']"
                            >
                                {isLast ? "Selesai" : "Ayat Berikutnya"}
                                <span className="material-symbols-outlined text-lg">
                                    {isLast ? 'done_all' : 'arrow_forward'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coby the Mascot */}
                <div className="fixed bottom-24 md:bottom-8 right-8 z-40 flex flex-col items-end gap-2 pointer-events-none hidden md:flex">
                    {/* Speech Bubble */}
                    <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-[#800000]/10 max-w-[220px] relative mb-2 animate-bounce-slow">
                        <p className="text-[#800000] font-bold text-sm leading-relaxed text-center font-['Plus_Jakarta_Sans']">
                            {handsDetected
                                ? "Bagus! Tangan terdeteksi! Coba isyaratkan ayatnya 🤲"
                                : "Tunjukkan tanganmu ke kamera ya! 👋"}
                        </p>
                        {/* Tail */}
                        <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-r border-b border-[#800000]/10 rotate-45"></div>
                    </div>
                    {/* Mascot Image */}
                    <div className="w-32 h-32 drop-shadow-[0_20px_30px_rgba(0,107,92,0.3)]">
                        <img alt="Asisten Coby" className="w-full h-full object-contain drop-shadow-lg" src={maskot} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailAyatIsyarat;
