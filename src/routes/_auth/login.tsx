import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginType } from '@/validations/auth-schema';
import { useLogin } from '@/hooks/use-auth-fetch';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [remember, setRemember] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });
  const { trigger: login, isMutating } = useLogin();

  const onSubmit = (data: LoginType) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md">
        <div className="md:hidden w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#800000] to-[#690000] rounded-3xl flex items-center justify-center shadow-lg">
        <span className="text-5xl text-white material-symbols-outlined">login</span>
        </div>

        <h2 className="text-3xl font-bold text-[#4d0000] mb-2 font-headline">Masuk</h2>
        <p className="text-[#800000]/70 mb-8 text-base">Masuk ke akunmu untuk melanjutkan belajar</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
            <label htmlFor="login-email" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Email
            </label>
            <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
            <input
                id="login-email"
                type="email"
                {...register('email')}
                placeholder="contoh@email.com"
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                  errors.email ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                }`}
            />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{errors.email.message}</p>
            )}
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
                {...register('password')}
                placeholder="Masukkan kata sandi"
                className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                  errors.password ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                }`}
            />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{errors.password.message}</p>
            )}
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
            disabled={isMutating}
            className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 font-['Plus_Jakarta_Sans'] ${
              isMutating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-[#800000] to-[#690000] hover:shadow-[#800000]/30'
            }`}
        >
          {isMutating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            'Masuk'
          )}
        </button>
        </form>

        <p className="text-center text-sm text-[#800000]/60 mt-8 font-['Plus_Jakarta_Sans']">
        Belum punya akun?{' '}
        <Link to='/register' className="text-[#800000] font-bold hover:underline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 rounded">
            Daftar Sekarang
        </Link>
        </p>

        <div className="mt-6 text-center">
          <Link to='/siswa' className="text-sm text-[#800000]/50 hover:text-[#800000] underline underline-offset-4 transition-colors font-['Plus_Jakarta_Sans'] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 rounded">
            Lewati, masuk sebagai tamu
          </Link>
        </div>
    </div>
  );
}
