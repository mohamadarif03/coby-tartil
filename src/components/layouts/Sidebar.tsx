import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAuthStore } from '@/stores/auth-store';
import { useLogout } from '@/hooks/use-auth-fetch';
import { ROLE } from '@/enums/roles-enum';
import { StudentSidebarDatas, TeacherSidebarDatas } from '@/consts/sidebar-data';
import { SidebarType } from '@/types/sidebar-type';
import { APP_TITLE } from '@/consts/config';

interface SidebarProps {
  activeMenu: string;
  role?: 'student' | 'teacher';
}

function Sidebar({ activeMenu, role = 'student' }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, role: storeRole } = useAuthStore();
  const { trigger: logout, isMutating: isLoggingOut } = useLogout();

  const sidebarData: SidebarType[] = role === 'teacher' ? TeacherSidebarDatas : StudentSidebarDatas;

  const closeSidebar = () => setIsOpen(false);

  const getLinkClass = (menuName: string) => {
    const focusRing = "focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2";
    if (menuName === activeMenu) {
      return `flex items-center gap-4 bg-white text-[#800000] rounded-full px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg scale-95 active:scale-90 transition-transform shadow-lg shadow-black/10 ${focusRing}`;
    }
    return `flex items-center gap-4 text-white/90 px-6 py-3 mx-4 my-1 font-['Plus_Jakarta_Sans'] font-bold text-lg hover:bg-white/10 hover:text-white transition-colors duration-200 scale-95 active:scale-90 rounded-full transition-transform ${focusRing}`;
  };

  // Determine user display info
  const isGuest = !isAuthenticated;
  const userName = isGuest ? 'siswa tamu' : (user?.name || 'Pengguna');
  const userLabel = (() => {
    if (isGuest) return 'Tamu';
    if (storeRole === ROLE.TEACHER) return 'Guru';
    return 'Siswa';
  })();
  const avatarSrc = isGuest
    ? '/img/profile/default.png'
    : (user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=5de3fc&color=fff&size=40`);

  return (
    <>
      {/* Mobile toggle button — visible only on small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-[60] lg:hidden flex items-center justify-center w-12 h-12 bg-[#800000] text-white rounded-xl shadow-lg hover:bg-[#690000] transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2"
        aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {/* Backdrop overlay — shown on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed left-0 top-0 h-screen flex flex-col py-8 w-72
          rounded-r-[3rem] bg-[#800000]
          shadow-[40px_0_60px_-15px_rgba(42,47,50,0.15)] z-50
          text-white border-r border-[#800000]/20
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        role="navigation"
        aria-label="Navigasi Sidebar Dashboard"
      >
        <div className="px-8 mb-12">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => { navigate({ to: '/' }); closeSidebar(); }}
              tabIndex={0}
              role="link"
              aria-label={`Kembali ke halaman utama ${APP_TITLE}`}
            >
              <img src='/logo.png' alt="Logo" className="object-contain w-12 h-12" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-white tracking-tighter focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">{APP_TITLE}</h1>
                <p className="text-xs font-['Plus_Jakarta_Sans'] text-white/70 font-bold opacity-80">Arabic Sandbox</p>
              </div>
            </div>
            {/* Close button inside sidebar for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-4 focus:ring-[#ffd700]"
              aria-label="Tutup navigasi"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto" aria-label="Menu Utama">
          {sidebarData.map((item) => (
            <Link
              to={item.url}
              key={item.title}
              className={getLinkClass(item.title)}
              aria-label={item.title}
              aria-current={activeMenu === item.title ? 'page' : undefined}
              onClick={closeSidebar}
            >
              <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="px-8 pt-8 mt-auto border-t border-white/10">
          <div
            className="flex items-center gap-3 p-3 mb-6 border bg-white/10 rounded-2xl backdrop-blur-sm border-white/5"
            aria-label={`Profil pengguna: ${userName}, ${userLabel}`}
          >
            <img
              alt={`Foto profil ${userName}`}
              className="w-10 h-10 rounded-full bg-[#5de3fc] object-cover ring-2 ring-white/50"
              src={avatarSrc}
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{userName}</p>
              <p className="text-xs text-white/70">{userLabel}</p>
            </div>
          </div>
          {!isGuest && (
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/5 text-white/80 font-bold hover:bg-white/20 hover:text-white border border-white/10 transition-all focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Logout dari dashboard"
            >
              {isLoggingOut ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-xl material-symbols-outlined" aria-hidden="true">logout</span>
                  <span>Logout</span>
                </>
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
