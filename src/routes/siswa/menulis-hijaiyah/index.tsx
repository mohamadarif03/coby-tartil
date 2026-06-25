import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/siswa/menulis-hijaiyah/')({
  component: MenulisHijaiyah,
})

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';

const HIJAIYAH_LETTERS = [
  { letter: 'ا', name: 'Alif' },
  { letter: 'ب', name: 'Ba' },
  { letter: 'ت', name: 'Ta' },
  { letter: 'ث', name: 'Tsa' },
  { letter: 'ج', name: 'Jim' },
  { letter: 'ح', name: 'Ha' },
  { letter: 'خ', name: 'Kha' },
  { letter: 'د', name: 'Dal' },
  { letter: 'ذ', name: 'Dzal' },
  { letter: 'ر', name: 'Ra' },
  { letter: 'ز', name: 'Zai' },
  { letter: 'س', name: 'Sin' },
  { letter: 'ش', name: 'Syin' },
  { letter: 'ص', name: 'Shad' },
  { letter: 'ض', name: 'Dhad' },
  { letter: 'ط', name: 'Tha' },
  { letter: 'ظ', name: 'Zha' },
  { letter: 'ع', name: 'Ain' },
  { letter: 'غ', name: 'Ghain' },
  { letter: 'ف', name: 'Fa' },
  { letter: 'ق', name: 'Qaf' },
  { letter: 'ك', name: 'Kaf' },
  { letter: 'ل', name: 'Lam' },
  { letter: 'م', name: 'Mim' },
  { letter: 'ن', name: 'Nun' },
  { letter: 'ه', name: 'Ha' },
  { letter: 'و', name: 'Waw' },
  { letter: 'ي', name: 'Ya' },
];

const PEN_COLORS = [
  { color: '#1a1a2e', name: 'Hitam' },
  { color: '#800000', name: 'Hijau Tua' },
  { color: '#0066cc', name: 'Biru' },
  { color: '#8b1a1a', name: 'Merah Tua' },
  { color: '#ffd700', name: 'Emas' },
];

const PEN_SIZES = [3, 6, 10, 16];

function MenulisHijaiyah() {
  useAccessibility('Menulis Hijaiyah');

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(HIJAIYAH_LETTERS[0]);
  const [penColor, setPenColor] = useState(PEN_COLORS[0].color);
  const [penSize, setPenSize] = useState(PEN_SIZES[1]);
  const [showGuide, setShowGuide] = useState(true);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [checkResult, setCheckResult] = useState(null); // { label, confidence, correct }
  const [isChecking, setIsChecking] = useState(false);
  const lastPos = useRef(null);

  const checkWriting = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || isChecking) return;
    setIsChecking(true);
    setCheckResult(null);
    try {
      const res = await classifyCanvas(canvas, selectedLetter.letter);
      setCheckResult({ label: selectedLetter.name, confidence: res.score, correct: res.correct });
    } catch {
      setCheckResult({ label: null, confidence: 0, correct: false, error: true });
    } finally {
      setIsChecking(false);
    }
  }, [selectedLetter, isChecking]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      clearCanvas();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);


  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL();
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(data);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    // Draw lined paper background
    ctx.strokeStyle = '#e0e8e6';
    ctx.lineWidth = 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    // horizontal guide lines
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // center horizontal bold line
    ctx.strokeStyle = '#b0c4bf';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // center vertical dashed line  
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = '#c0d0cc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.setLineDash([]);

    setHistory([]);
    setHistoryIndex(-1);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex <= 0) {
      clearCanvas();
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const newIndex = historyIndex - 1;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
    };
    img.src = history[newIndex];
    setHistoryIndex(newIndex);
  }, [history, historyIndex, clearCanvas]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input (though there aren't any here yet)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        clearCanvas();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if (e.key.toLowerCase() === 'e') {
        setIsEraser(prev => !prev);
      } else if (e.key.toLowerCase() === 'g') {
        setShowGuide(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearCanvas, undo]);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const pos = getPosition(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    lastPos.current = pos;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const pos = getPosition(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = isEraser ? '#ffffff' : penColor;
    ctx.lineWidth = isEraser ? penSize * 3 : penSize;
    ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.globalCompositeOperation = 'source-over';
      saveToHistory();
    }
  };

  // Clear canvas when letter changes
  useEffect(() => {
    clearCanvas();
    setCheckResult(null);
  }, [selectedLetter, clearCanvas]);

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen flex">
      <Sidebar activeMenu="menulis-hijaiyah" />

      <main className="w-full p-8 ml-72 lg:p-12" id="main-content" role="main">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black text-[#800000] tracking-tight mb-2 font-['Plus_Jakarta_Sans']">
              Menulis Hijaiyah ✍️
            </h2>
            <p className="text-lg text-[#575c60] font-medium">
              Latih tanganmu menulis huruf-huruf Arab dengan benar
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          {/* Left Panel - Letter Selection */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#a9aeb1]/10 mb-6">
              <h3 className="text-lg font-bold text-[#2a2f32] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#800000]" aria-hidden="true">abc</span>
                Pilih Huruf
              </h3>
              <div className="grid grid-cols-4 gap-2 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                {HIJAIYAH_LETTERS.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      setSelectedLetter(item);
                      setIsEraser(false);
                    }}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-1 ${
                      selectedLetter.name === item.name
                        ? 'bg-gradient-to-br from-[#800000] to-[#00897b] text-white shadow-lg shadow-[#800000]/30 scale-105'
                        : 'bg-[#f3f7fb] text-[#2a2f32] hover:bg-[#e0ecea] hover:scale-105'
                    }`}
                    aria-label={`Huruf ${item.name}`}
                    aria-pressed={selectedLetter.name === item.name}
                  >
                    <span className="text-2xl font-bold leading-none" style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}>
                      {item.letter}
                    </span>
                    <span className={`text-[9px] font-bold mt-1 tracking-wide ${
                      selectedLetter.name === item.name ? 'text-white/80' : 'text-[#575c60]'
                    }`}>
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center Panel - Canvas */}
          <div className="xl:col-span-6">
            {/* Current Letter Display */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#a9aeb1]/10 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#800000] to-[#00897b] rounded-2xl flex items-center justify-center shadow-lg shadow-[#800000]/20">
                    <span className="text-4xl font-bold text-white" style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}>
                      {selectedLetter.letter}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#2a2f32]">Huruf {selectedLetter.name}</h3>
                    <p className="text-[#575c60] text-sm mt-1">Tirulah bentuk huruf di papan tulis</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 ${
                    showGuide
                      ? 'bg-[#800000]/10 text-[#800000]'
                      : 'bg-[#ecf1f6] text-[#575c60]'
                  }`}
                  aria-label={showGuide ? 'Sembunyikan panduan huruf' : 'Tampilkan panduan huruf'}
                  aria-pressed={showGuide}
                >
                  <span className="text-lg material-symbols-outlined" aria-hidden="true">
                    {showGuide ? 'visibility' : 'visibility_off'}
                  </span>
                  Panduan
                </button>
              </div>
            </div>

            {/* Drawing Canvas */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#a9aeb1]/10 overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e8ecef] bg-[#f9fbfc]">
                <div className="flex items-center gap-3">
                  {/* Pen Colors */}
                  <div className="flex items-center gap-1.5 mr-2">
                    {PEN_COLORS.map((c) => (
                      <button
                        key={c.color}
                        onClick={() => { setPenColor(c.color); setIsEraser(false); }}
                        className={`w-7 h-7 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                          penColor === c.color && !isEraser
                            ? 'border-[#800000] scale-110 shadow-md'
                            : 'border-transparent hover:scale-110'
                        }`}
                        style={{ backgroundColor: c.color }}
                        aria-label={`Warna pena ${c.name}`}
                        aria-pressed={penColor === c.color && !isEraser}
                      />
                    ))}
                  </div>

                  <div className="w-px h-7 bg-[#d7dee3] mx-1"></div>

                  {/* Pen Sizes */}
                  <div className="flex items-center gap-2">
                    {PEN_SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => { setPenSize(size); setIsEraser(false); }}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                          penSize === size && !isEraser
                            ? 'bg-[#800000]/10 text-[#800000]'
                            : 'hover:bg-[#ecf1f6] text-[#575c60]'
                        }`}
                        aria-label={`Ketebalan pena ${size}px`}
                        aria-pressed={penSize === size && !isEraser}
                      >
                        <div
                          className="bg-current rounded-full"
                          style={{ width: Math.min(size + 2, 16), height: Math.min(size + 2, 16) }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Eraser */}
                  <button
                    onClick={() => setIsEraser(!isEraser)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#ffd700] ${
                      isEraser
                        ? 'bg-[#ff6b6b]/10 text-[#d63031]'
                        : 'hover:bg-[#ecf1f6] text-[#575c60]'
                    }`}
                    aria-label={isEraser ? 'Matikan penghapus' : 'Aktifkan penghapus'}
                    aria-pressed={isEraser}
                  >
                    <span className="text-lg material-symbols-outlined" aria-hidden="true">ink_eraser</span>
                  </button>

                  {/* Undo */}
                  <button
                    onClick={undo}
                    disabled={historyIndex < 0}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#ffd700] hover:bg-[#ecf1f6] text-[#575c60] disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Undo langkah terakhir"
                  >
                    <span className="text-lg material-symbols-outlined" aria-hidden="true">undo</span>
                  </button>

                  {/* Clear */}
                  <button
                    onClick={clearCanvas}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[#ffd700] hover:bg-[#ff6b6b]/10 text-[#575c60] hover:text-[#d63031]"
                    aria-label="Hapus semua tulisan"
                  >
                    <span className="text-lg material-symbols-outlined" aria-hidden="true">delete</span>
                  </button>
                </div>
              </div>

              {/* Canvas Container */}
              <div
                ref={containerRef}
                className="relative w-full bg-white"
                style={{ height: '460px', cursor: isEraser ? 'cell' : 'crosshair' }}
              >
                {/* Guide Letter Overlay */}
                {showGuide && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
                    <span
                      className="text-[#800000]/[0.07] leading-none"
                      style={{
                        fontFamily: "'Noto Naskh Arabic', 'Amiri', serif",
                        fontSize: '320px',
                        fontWeight: 700,
                      }}
                    >
                      {selectedLetter.letter}
                    </span>
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 z-20 touch-none"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  aria-label={`Papan tulis untuk menulis huruf ${selectedLetter.name}`}
                  role="img"
                />
              </div>

              {/* AI Check Result */}
              {checkResult && (
                <div className={`mt-4 mx-5 mb-5 p-4 rounded-xl flex items-center gap-3 ${
                  checkResult.error
                    ? 'bg-[#ecf1f6] text-[#575c60]'
                    : checkResult.correct
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                }`}>
                  <span className={`material-symbols-outlined text-2xl ${
                    checkResult.error ? 'text-[#a9aeb1]'
                      : checkResult.correct ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {checkResult.error ? 'info' : checkResult.correct ? 'check_circle' : 'cancel'}
                  </span>
                  <div>
                    {checkResult.error ? (
                      <p className="text-sm font-bold">Model belum tersedia</p>
                    ) : checkResult.correct ? (
                      <>
                        <p className="text-sm font-bold text-green-700">Benar! Huruf {selectedLetter.name} terdeteksi</p>
                        <p className="text-xs text-green-600 mt-0.5">Keyakinan: {(checkResult.confidence * 100).toFixed(0)}%</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold text-red-600">Belum tepat — coba lagi</p>
                        <p className="text-xs text-red-500 mt-0.5">Terdeteksi: {checkResult.label ?? '?'} ({(checkResult.confidence * 100).toFixed(0)}%)</p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Tips & Info */}
          <div className="xl:col-span-3">
            {/* Writing Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#a9aeb1]/10 mb-6">
              <h3 className="text-lg font-bold text-[#2a2f32] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffd700]" aria-hidden="true">tips_and_updates</span>
                Tips Menulis
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#800000]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-black text-[#800000]">1</span>
                  </div>
                  <p className="text-sm text-[#575c60] leading-relaxed">
                    Tulis huruf Arab <strong className="text-[#2a2f32]">dari kanan ke kiri</strong>, mulai dari titik awal yang benar.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#800000]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-black text-[#800000]">2</span>
                  </div>
                  <p className="text-sm text-[#575c60] leading-relaxed">
                    Perhatikan <strong className="text-[#2a2f32]">proporsi</strong> huruf — ikuti garis panduan di papan.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#800000]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-black text-[#800000]">3</span>
                  </div>
                  <p className="text-sm text-[#575c60] leading-relaxed">
                    Jangan lupa <strong className="text-[#2a2f32]">titik-titik</strong> pada huruf yang membutuhkannya.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-[#800000]/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm font-black text-[#800000]">4</span>
                  </div>
                  <p className="text-sm text-[#575c60] leading-relaxed">
                    Aktifkan <strong className="text-[#2a2f32]">Panduan</strong> untuk melihat bentuk huruf transparan sebagai acuan.
                  </p>
                </div>
              </div>
            </div>

            {/* Huruf Info Card */}
            <div className="bg-gradient-to-br from-[#800000] to-[#00897b] rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Noto Naskh Arabic', 'Amiri', serif" }}>
                    {selectedLetter.letter}
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold">Huruf {selectedLetter.name}</h4>
                  <p className="text-sm text-white/70">Hijaiyah #{HIJAIYAH_LETTERS.findIndex(l => l.name === selectedLetter.name) + 1}</p>
                </div>
              </div>
              <div className="p-4 border bg-white/10 rounded-xl backdrop-blur-sm border-white/10">
                <p className="text-sm leading-relaxed text-white/90">
                  Latih menulis huruf <strong>{selectedLetter.name}</strong> berulang kali untuk melatih memori otot tanganmu. Konsistensi adalah kunci!
                </p>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#a9aeb1]/10 mt-6">
              <h3 className="text-sm font-bold text-[#a9aeb1] uppercase tracking-wider mb-3">Shortcut</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#575c60]">Hapus semua</span>
                  <kbd className="px-2 py-1 bg-[#ecf1f6] rounded text-xs font-bold text-[#575c60]">Del</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#575c60]">Undo</span>
                  <kbd className="px-2 py-1 bg-[#ecf1f6] rounded text-xs font-bold text-[#575c60]">Ctrl+Z</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#575c60]">Penghapus</span>
                  <kbd className="px-2 py-1 bg-[#ecf1f6] rounded text-xs font-bold text-[#575c60]">E</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#575c60]">Panduan</span>
                  <kbd className="px-2 py-1 bg-[#ecf1f6] rounded text-xs font-bold text-[#575c60]">G</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c0d0cc;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #800000;
        }
      `}</style>
    </div>
  );
}

export default MenulisHijaiyah;
