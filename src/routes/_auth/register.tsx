import { createFileRoute, Link } from '@tanstack/react-router'
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { RoleType } from '@/types/roles-type';
import { RoleEnum } from '@/enums/roles-enum';

export const Route = createFileRoute('/_auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleType | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Kata sandi tidak cocok');
      return;
    }
    setPasswordError('');
    navigate({ to: '/siswa' });
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (passwordError && value === password) {
      setPasswordError('');
    }
  };

  const roles: { id: RoleType; label: string; icon: string; description: string }[] = [
    { id: RoleEnum.STUDENT, label: 'Siswa', icon: 'school', description: 'Belajar mengaji interaktif' },
    { id: RoleEnum.TEACHER, label: 'Guru', icon: 'supervisor_account', description: 'Pantau & bimbing siswa' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="md:hidden w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#800000] to-[#690000] rounded-3xl flex items-center justify-center shadow-lg">
        <span className="text-5xl text-white material-symbols-outlined">person_add</span>
      </div>

      <h2 className="text-3xl font-bold text-[#4d0000] mb-2 font-headline">Daftar</h2>
      <p className="text-[#800000]/70 mb-8 text-base">Buat akun baru untuk memulai belajar</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="register-name" className="block text-sm font-bold text-[#4d0000] mb-2 font-['Plus_Jakarta_Sans']">
            Nama Lengkap
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">person</span>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans']"
            />
          </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@email.com"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans']"
            />
          </div>
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
                onClick={() => setRole(r.id)}
                className={`p-5 rounded-xl border-2 transition-all duration-300 text-left group ${
                  role === r.id
                    ? 'border-[#800000] bg-red-50 shadow-md scale-[1.02]'
                    : 'border-red-50 hover:border-red-200 hover:bg-red-50/30 bg-white'
                }`}
                aria-label={`Pilih peran ${r.label}`}
                aria-pressed={role === r.id}
              >
                <div className={`p-3 rounded-full inline-flex transition-colors mb-3 ${
                  role === r.id
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat kata sandi"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans']"
            />
          </div>
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
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)}
              placeholder="Ulangi kata sandi"
              required
              className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all font-['Plus_Jakarta_Sans'] ${
                passwordError ? 'border-red-400 focus:border-red-500' : 'border-red-100 focus:border-[#800000]'
              }`}
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1.5 font-medium font-['Plus_Jakarta_Sans']">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!role}
          className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 font-['Plus_Jakarta_Sans'] ${
            role
              ? 'bg-gradient-to-br from-[#800000] to-[#690000] hover:shadow-[#800000]/30'
              : 'bg-gray-300 cursor-not-allowed shadow-none'
          }`}
        >
          Daftar
        </button>
      </form>

      <p className="text-center text-sm text-[#800000]/60 mt-8 font-['Plus_Jakarta_Sans']">
        Sudah punya akun?{' '}
        <Link to='/login' className="text-[#800000] font-bold hover:underline focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 rounded">
          Masuk Sekarang
        </Link>
      </p>
    </div>
  );
}
