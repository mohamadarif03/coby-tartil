import { createFileRoute, Link } from '@tanstack/react-router'
import React from 'react';
import { ROLE } from '@/enums/roles-enum';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterType } from '@/validations/auth-schema';
import { useRegister } from '@/hooks/use-auth-fetch';

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });
  const { trigger: registerUser, isMutating } = useRegister();

  const selectedRole = watch('role');

  const onSubmit = (data: RegisterType) => {
    registerUser(data);
  };

  const roles: { id: ROLE; label: string; icon: string; description: string }[] = [
    { id: ROLE.STUDENT, label: 'Siswa', icon: 'school', description: 'Belajar mengaji interaktif' },
    { id: ROLE.TEACHER, label: 'Guru', icon: 'supervisor_account', description: 'Pantau & bimbing siswa' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="md:hidden w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#800000] to-[#690000] rounded-3xl flex items-center justify-center shadow-lg">
        <span className="text-5xl text-white material-symbols-outlined">person_add</span>
      </div>

      <h2 className="text-3xl font-bold text-[#4d0000] mb-2 font-headline">Daftar</h2>
      <p className="text-[#800000]/70 mb-8 text-base">Buat akun baru untuk memulai belajar</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="register-name" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Nama Lengkap
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">person</span>
            <input
              id="register-name"
              type="text"
              {...register('name')}
              placeholder="Masukkan nama lengkap"
              className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                errors.name ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="register-email" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Email
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
            <input
              id="register-email"
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
          <label className="block text-sm font-bold text-[#4d0000] mb-3 font-['Plus_Jakarta_Sans']">
            Peran
          </label>
          <div className="grid grid-cols-2 gap-4">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setValue('role', r.id, { shouldValidate: true })}
                className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${
                  selectedRole === r.id
                    ? 'border-[#800000] bg-red-50 shadow-md scale-[1.02]'
                    : 'border-red-50 hover:border-red-200 hover:bg-red-50/30 bg-white'
                }`}
                aria-label={`Pilih peran ${r.label}`}
                aria-pressed={selectedRole === r.id}
              >
                <div className={`p-3 rounded-full inline-flex transition-colors mb-3 ${
                  selectedRole === r.id
                    ? 'bg-[#800000] text-white'
                    : 'bg-red-100 text-[#800000] group-hover:bg-red-200'
                }`}>
                  <span className="text-xl material-symbols-outlined" aria-hidden="true">{r.icon}</span>
                </div>
                <div className="font-bold text-[#4d0000] text-base mb-1 font-['Plus_Jakarta_Sans']">{r.label}</div>
                <div className="text-xs text-[#800000]/60 leading-relaxed">{r.description}</div>
              </button>
            ))}
          </div>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="register-password" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Kata Sandi
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">lock</span>
            <input
              id="register-password"
              type="password"
              {...register('password')}
              placeholder="Buat kata sandi (min. 8 angka)"
              className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                errors.password ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200' : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
              }`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="register-confirm-password" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Konfirmasi Kata Sandi
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">lock</span>
            <input
              id="register-confirm-password"
              type="password"
              {...register('password_confirmation')}
              placeholder="Ulangi kata sandi"
              className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                errors.password_confirmation || errors.confirm_password
                  ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                  : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
              }`}
            />
          </div>
          {(errors.password_confirmation || errors.confirm_password) && (
            <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">
              {(errors.password_confirmation?.message || errors.confirm_password?.message) as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isMutating || !selectedRole}
          className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 font-['Plus_Jakarta_Sans'] ${
            isMutating || !selectedRole
              ? 'bg-gray-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-br from-[#800000] to-[#690000] hover:shadow-[#800000]/30'
          }`}
        >
          {isMutating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Memproses...
            </span>
          ) : (
            'Daftar'
          )}
        </button>
      </form>        <p className="text-center text-sm text-[#800000]/60 mt-8 font-['Plus_Jakarta_Sans']">
        Sudah punya akun?{' '}
        <Link to='/login' className="text-[#800000] font-bold hover:underline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 rounded">
          Masuk Sekarang
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
