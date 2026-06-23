import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: '/siswa' });
  };

  return (
    <div className="w-full max-w-md">
        <div className="md:hidden w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#800000] to-[#690000] rounded-3xl flex items-center justify-center shadow-lg">
        <span className="text-5xl text-white material-symbols-outlined">login</span>
        </div>

        <h2 className="text-3xl font-bold text-[#4d0000] mb-2 font-headline">Masuk</h2>
        <p className="text-[#800000]/70 mb-8 text-base">Masuk ke akunmu untuk melanjutkan belajar</p>

        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label htmlFor="login-email" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Email
            </label>
            <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
            <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contoh@email.com"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans']"
            />
            </div>
        </div>

        <div>
            <label htmlFor="login-password" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Kata Sandi
            </label>
            <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">lock</span>
            <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans']"
            />
            </div>
        </div>

        <div className="flex items-center gap-3">
            <input
            id="login-remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="w-5 h-5 rounded-md border-2 border-red-200 text-[#800000] focus:ring-[#ffd700] focus:ring-offset-2 cursor-pointer accent-[#800000]"
            />
            <label htmlFor="login-remember" className="text-sm font-medium text-[#4d0000] cursor-pointer font-['Plus_Jakarta_Sans']">
            Ingat Saya
            </label>
        </div>

        <button
            type="submit"
            className="w-full py-4 bg-gradient-to-br from-[#800000] to-[#690000] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-[#800000]/30 transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 font-['Plus_Jakarta_Sans']"
        >
            Masuk
        </button>
        </form>

        <p className="text-center text-sm text-[#800000]/60 mt-8 font-['Plus_Jakarta_Sans']">
        Belum punya akun?{' '}
        <Link to='/register' className="text-[#800000] font-bold hover:underline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 rounded">
            Daftar Sekarang
        </Link>
        </p>
    </div>
  );
}