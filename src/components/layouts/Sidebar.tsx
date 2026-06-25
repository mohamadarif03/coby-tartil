import { useNavigate, Link } from '@tanstack/react-router';
import { StudentSidebarDatas, TeacherSidebarDatas } from '@/consts/sidebar-data';
import { SidebarType } from '@/types/sidebar-type';

interface SidebarProps {
  activeMenu: string;
  role?: 'student' | 'teacher';
}

function Sidebar({ activeMenu, role = 'student' }: SidebarProps) {
  const navigate = useNavigate();
  const sidebarData: SidebarType[] = role === 'teacher' ? TeacherSidebarDatas : StudentSidebarDatas;

  const getLinkClass = (menuName: string) => {
    const focusRing = "focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2";
    if (menuName === activeMenu) {
      return `flex items-center gap-4 bg-white text-[#800000] rounded-full px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg scale-95 active:scale-90 transition-transform shadow-lg shadow-black/10 ${focusRing}`;
    }
    return `flex items-center gap-4 text-white/90 px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg hover:bg-white/10 hover:text-white transition-colors duration-200 scale-95 active:scale-90 rounded-full transition-transform ${focusRing}`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-8 w-72 rounded-r-[3rem] bg-[#800000] shadow-[40px_0_60px_-15px_rgba(42,47,50,0.15)] z-50 text-white border-r border-[#800000]/20" role="navigation" aria-label="Navigasi Sidebar Dashboard">
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate({ to: '/' })} tabIndex={0} role="link" aria-label="Kembali ke halaman utama CobyTartil">
          <img src='/logo.png' alt="Logo" className="object-contain w-12 h-12" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-white tracking-tighter focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">CobyTartil</h1>
            <p className="text-xs font-['Plus_Jakarta_Sans'] text-white/70 font-bold opacity-80">Arabic Sandbox</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto" aria-label="Menu Utama">
        {sidebarData.map((item) => (
          <Link to={item.url} key={item.title} className={getLinkClass(item.title)} aria-label={item.title} aria-current={activeMenu === item.title ? 'page' : undefined}>
            <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="px-8 pt-8 mt-auto border-t border-white/10">
        <div className="flex items-center gap-3 p-3 mb-6 border bg-white/10 rounded-2xl backdrop-blur-sm border-white/5" aria-label="Profil pengguna: Ahmad, Level 2 Learner">
          <img alt="Foto profil Ahmad" className="w-10 h-10 rounded-full bg-[#5de3fc] object-cover ring-2 ring-white/50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyE3lQgCqr7CzFqAJl05HJAXvZv-oai9xp86nioLwRxMXYN-gAD9x2kExSuTGJQadOgQ6dNVY1dNYt0r-7UO1WnjN_TQjk7Drz9nSmXe6I4GN5wCgvBGgFwkJgjwpD8j-FXwCK7slPWUmvEQS7JF8SAhMghRR22zMazMrduTLH4vD5xOrehfn0PwlmHtHHhDCQ1BdzYFabWiPe9TEBeJFQoQ5ke9HVXz0ApyDiHETxKlkxjmZjfMiXcL3YgHYsLyG1C7sNb_CxUJM" />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Ahmad</p>
            <p className="text-xs text-white/70">Level 2 Learner</p>
          </div>
        </div>
        <button onClick={() => navigate({ to: '/' })} className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/5 text-white/80 font-bold hover:bg-white/20 hover:text-white border border-white/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2" aria-label="Logout dari dashboard">
          <span className="text-xl material-symbols-outlined" aria-hidden="true">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

