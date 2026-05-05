import { useEffect } from 'react';

/**
 * Custom hook aksesibilitas untuk halaman dashboard CobyTartil.
 * Menambahkan fitur:
 * 1. Auto-speak saat halaman dibuka
 * 2. Speak-on-focus saat Tab berpindah elemen
 * 3. Keyboard shortcut H untuk bantuan
 *
 * @param {string} pageName - Nama halaman yang sedang aktif (untuk pesan kontekstual)
 */
export default function useAccessibility(pageName = 'Dashboard') {

  // Auto-focus ke konten utama saat halaman dibuka
  // Agar Tab pertama langsung ke konten, bukan ke sidebar
  useEffect(() => {
    const focusMain = () => {
      const mainContent = document.getElementById('main-content');
      if (!mainContent) return;

      // Cari elemen interaktif pertama di dalam main-content
      const firstFocusable = mainContent.querySelector(
        'a[href], button, [tabindex="0"], input, select, textarea'
      );

      if (firstFocusable) {
        firstFocusable.focus({ preventScroll: true });
      } else {
        // Fallback: fokus ke main itu sendiri
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus({ preventScroll: true });
      }
    };

    // Double-ensure: tunggu DOM sepenuhnya siap
    requestAnimationFrame(() => {
      setTimeout(focusMain, 100);
    });
  }, []);

  // Auto-speak saat halaman dibuka
  useEffect(() => {
    const msg = new SpeechSynthesisUtterance();
    msg.lang = 'id-ID';
    msg.rate = 0.9;
    msg.pitch = 1.05;
    msg.text = `Kamu sekarang di halaman ${pageName}. Gunakan Tab untuk berpindah antar tombol. Tekan Enter untuk memilih. Tekan H untuk bantuan.`;

    setTimeout(() => {
      window.speechSynthesis.speak(msg);
    }, 800);
  }, [pageName]);

  // Speak-on-focus — mengucapkan nama elemen saat Tab berpindah focus
  useEffect(() => {
    const handleFocus = (e) => {
      const el = e.target;
      // Proses elemen interaktif (a, button) dan elemen apapun yang punya tabIndex / role
      const isInteractive = el.tagName === 'A' || el.tagName === 'BUTTON';
      const isFocusable = el.hasAttribute('tabindex') || el.hasAttribute('role');
      if (!isInteractive && !isFocusable) return;

      // Ambil teks yang akan diucapkan: prioritas aria-label > textContent
      const label = el.getAttribute('aria-label') || el.textContent?.trim();
      if (!label) return;

      // Cancel ucapan sebelumnya agar tidak tumpang tindih
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(label);
      utterance.lang = 'id-ID';
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  // Keyboard shortcut H untuk bantuan
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'h' || e.key === 'H') {
        window.speechSynthesis.cancel();
        const help = new SpeechSynthesisUtterance(
          `Kamu ada di halaman ${pageName}. Gunakan Tab untuk berpindah antar tombol. Tekan Enter untuk memilih. Tekan H kapanpun butuh bantuan.`
        );
        help.lang = 'id-ID';
        help.rate = 0.85;
        window.speechSynthesis.speak(help);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [pageName]);
}
