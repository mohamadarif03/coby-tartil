import { createFileRoute, Outlet } from '@tanstack/react-router'
import { redirectAuthenticatedUser } from '@/libs/route-guards'
import { APP_TITLE } from '@/consts/config'

export const Route = createFileRoute('/_auth')({
  beforeLoad: redirectAuthenticatedUser,
  component: Auth,
})

function Auth() {
  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#800000] via-[#690000] to-[#4d0000] flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-400/20 via-transparent to-transparent" />
        <div className="absolute inset-0 islamic-pattern opacity-[0.03]" />
        <img src='/maskot.png' alt="Coby Tata Letak" className="h-56 object-contain relative z-10 hero-coby drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" />
        <div className="relative z-10 mt-8 text-center">
          <h3 className="mb-2 text-3xl font-bold text-white font-headline">Selamat Datang! 👋</h3>
          <p className="tracking-wider text-red-100/90 text-md">Belajar mengaji bersama Coby</p>
        </div>
      </div>

      <div className="w-full md:w-7/12 flex items-center justify-center bg-[#f8fdfc] p-8 md:p-16 relative">
        <div className="absolute top-6 left-8 md:hidden">
          <div className="flex items-center gap-2">
            <img src='/maskot.png' alt="" className="object-contain h-10" />
            <span className="text-xl font-bold text-[#800000] font-headline tracking-tighter">{APP_TITLE}</span>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}