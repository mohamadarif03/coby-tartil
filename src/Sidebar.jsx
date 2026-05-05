import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './assets/logo.png'; // ADDED: import logo

function Sidebar({ activeMenu }) {
  const navigate = useNavigate();

  const getLinkClass = (menuName) => {
    const focusRing = "focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2"; // ADDED: focus ring
    if (menuName === activeMenu) {
      return `flex items-center gap-4 bg-white text-[#006b5c] rounded-full px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg scale-95 active:scale-90 transition-transform shadow-lg shadow-black/10 ${focusRing}`;
    }
    return `flex items-center gap-4 text-white/90 px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg hover:bg-white/10 hover:text-white transition-colors duration-200 scale-95 active:scale-90 rounded-full transition-transform ${focusRing}`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-8 w-72 rounded-r-[3rem] bg-[#006b5c] shadow-[40px_0_60px_-15px_rgba(42,47,50,0.15)] z-50 text-white border-r border-[#006b5c]/20" role="navigation" aria-label="Navigasi Sidebar Dashboard"> {/* ADDED: role, aria-label */}
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')} tabIndex="0" role="link" aria-label="Kembali ke halaman utama CobyTartil">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tighter focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2">CobyTartil</h1> {/* ADDED: tabIndex, role, aria-label, focus ring */}
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-white/70 font-bold opacity-80">Arabic Sandbox</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto" aria-label="Menu Utama"> {/* ADDED: aria-label */}
        <Link to="/siswa" className={getLinkClass('home')} aria-label="Menu Home" aria-current={activeMenu === 'home' ? 'page' : undefined}> {/* ADDED: aria-label, aria-current */}
          <span className="material-symbols-outlined" aria-hidden="true">home</span> {/* ADDED: aria-hidden */}
          <span>Home</span>
        </Link>
        <Link to="/iqra" className={getLinkClass('iqra')} aria-label="Menu Iqra" aria-current={activeMenu === 'iqra' ? 'page' : undefined}> {/* ADDED: aria-label, aria-current */}
          <span className="material-symbols-outlined" aria-hidden="true">menu_book</span> {/* ADDED: aria-hidden */}
          <span>Iqra'</span>
        </Link>
        <Link to="/ayat-pendek" className={getLinkClass('short-verses')} aria-label="Menu Ayat Pendek" aria-current={activeMenu === 'short-verses' ? 'page' : undefined}> {/* ADDED: aria-label, aria-current */}
          <span className="material-symbols-outlined" aria-hidden="true">auto_stories</span> {/* ADDED: aria-hidden */}
          <span>Ayat Pendek</span>
        </Link>
        <Link to="/menulis-hijaiyah" className={getLinkClass('menulis-hijaiyah')} aria-label="Menu Menulis Hijaiyah" aria-current={activeMenu === 'menulis-hijaiyah' ? 'page' : undefined}>
          <span className="material-symbols-outlined" aria-hidden="true">draw</span>
          <span>Menulis Hijaiyah</span>
        </Link>
      </nav>

      <div className="px-8 mt-auto pt-8 border-t border-white/10">
        <div className="flex items-center gap-3 mb-6 bg-white/10 p-3 rounded-2xl backdrop-blur-sm border border-white/5" aria-label="Profil pengguna: Ahmad, Level 2 Learner"> {/* ADDED: aria-label */}
          <img alt="Foto profil Ahmad" className="w-10 h-10 rounded-full bg-[#5de3fc] object-cover ring-2 ring-white/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyE3lQgCqr7CzFqAJl05HJAXvZv-oai9xp86nioLwRxMXYN-gAD9x2kExSuTGJQadOgQ6dNVY1dNYt0r-7UO1WnjN_TQjk7Drz9nSmXe6I4GN5wCgvBGgFwkJgjwpD8j-FXwCK7slPWUmvEQS7JF8SAhMghRR22zMazMrduTLH4vD5xOrehfn0PwlmHtHHhDCQ1BdzYFabWiPe9TEBeJFQoQ5ke9HVXz0ApyDiHETxKlkxjmZjfMiXcL3YgHYsLyG1C7sNb_CxUJM" /> {/* ADDED: alt text yang deskriptif */}
          <div className="overflow-hidden">
            <p className="font-bold text-sm truncate text-white">Ahmad</p>
            <p className="text-xs text-white/70">Level 2 Learner</p>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/5 text-white/80 font-bold hover:bg-white/20 hover:text-white border border-white/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#D4A017] focus:ring-offset-2" aria-label="Logout dari dashboard"> {/* ADDED: aria-label, focus ring */}
          <span className="material-symbols-outlined text-xl" aria-hidden="true">logout</span> {/* ADDED: aria-hidden */}
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
