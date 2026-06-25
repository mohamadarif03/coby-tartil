import { useState } from "react";

export default function AddStudentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'email' | 'details'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#ffffff] rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-[#ecf1f6]">
          <h3 className="text-2xl font-black text-[#2a2f32]">Tambah Siswa</h3>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ecf1f6] transition-colors" aria-label="Tutup">
            <span className="material-symbols-outlined text-[#575c60]">close</span>
          </button>
        </div>

        <div className="flex border-b border-[#ecf1f6]">
          <button
            onClick={() => setTab('email')}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors ${tab === 'email' ? 'text-[#800000] border-b-2 border-[#800000]' : 'text-[#575c60] hover:text-[#2a2f32]'}`}
          >
            Undang via Email
          </button>
          <button
            onClick={() => setTab('details')}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors ${tab === 'details' ? 'text-[#800000] border-b-2 border-[#800000]' : 'text-[#575c60] hover:text-[#2a2f32]'}`}
          >
            Buat Akun Baru
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {tab === 'email' ? (
            <div>
              <label htmlFor="invite-email" className="block text-sm font-bold text-[#4d0000] mb-2">Email Siswa</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
                <input
                  id="invite-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contoh@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all"
                />
              </div>
              <p className="text-sm text-[#575c60] mt-2">Siswa akan menerima undangan untuk bergabung ke kelas Anda.</p>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="student-name" className="block text-sm font-bold text-[#4d0000] mb-2">Nama Lengkap</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">person</span>
                  <input id="student-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama lengkap siswa" required className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="student-email" className="block text-sm font-bold text-[#4d0000] mb-2">Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
                  <input id="student-email" type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="contoh@email.com" required className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label htmlFor="student-password" className="block text-sm font-bold text-[#4d0000] mb-2">Kata Sandi</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">lock</span>
                  <input id="student-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Buat kata sandi" required className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-red-100 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20 focus:outline-none transition-all" />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="w-full py-4 bg-gradient-to-br from-[#800000] to-[#690000] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-[#800000]/30 transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2">
            {tab === 'email' ? 'Kirim Undangan' : 'Buat Akun'}
          </button>
        </form>
      </div>
    </div>
  );
}