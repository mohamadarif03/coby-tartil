import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { STUDENT } from "@/consts/api-url";
import { useMutationAction } from "@/hooks/use-global-fetch";
import {
  inviteStudentSchema,
  createStudentSchema,
  type InviteStudentType,
  type CreateStudentType,
} from "@/validations/teacher-schema";

export default function AddStudentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'email' | 'details'>('email');

  const inviteForm = useForm<InviteStudentType>({
    resolver: zodResolver(inviteStudentSchema),
  });

  const createForm = useForm<CreateStudentType>({
    resolver: zodResolver(createStudentSchema),
  });

  const { trigger: inviteStudent, isMutating: inviting } = useMutationAction(
    STUDENT.CREATE,
    'post',
    { refreshKey: STUDENT.GET, onSuccess: () => { onClose(); inviteForm.reset(); } }
  );

  const { trigger: createStudent, isMutating: creating } = useMutationAction(
    STUDENT.CREATE,
    'post',
    { refreshKey: STUDENT.GET, onSuccess: () => { onClose(); createForm.reset(); } }
  );

  if (!open) return null;

  const handleInviteSubmit = (data: InviteStudentType) => {
    inviteStudent(data);
  };

  const handleCreateSubmit = (data: CreateStudentType) => {
    createStudent(data);
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
            onClick={() => { setTab('email'); inviteForm.clearErrors(); }}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors ${tab === 'email' ? 'text-[#800000] border-b-2 border-[#800000]' : 'text-[#575c60] hover:text-[#2a2f32]'}`}
          >
Sudah Memiliki Akun
          </button>
          <button
            onClick={() => { setTab('details'); createForm.clearErrors(); }}
            className={`flex-1 py-4 text-center font-bold text-sm transition-colors ${tab === 'details' ? 'text-[#800000] border-b-2 border-[#800000]' : 'text-[#575c60] hover:text-[#2a2f32]'}`}
          >
            Buat Akun Baru
          </button>
        </div>

        {tab === 'email' ? (
          <form onSubmit={inviteForm.handleSubmit(handleInviteSubmit)} className="p-6 space-y-5">
            <div>
              <label htmlFor="invite-email" className="block text-sm font-bold text-[#4d0000] mb-2">Email Siswa</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
                <input
                  id="invite-email"
                  type="email"
                  {...inviteForm.register('email')}
                  placeholder="contoh@email.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all ${
                    inviteForm.formState.errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                      : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                  }`}
                />
              </div>
              {inviteForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{inviteForm.formState.errors.email.message}</p>
              )}
              <p className="text-sm text-[#575c60] mt-2">Siswa sudah memiliki akun dan akan langsung ditambahkan ke kelas Anda.</p>
            </div>

            <button
              type="submit"
              disabled={inviting}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 ${
                inviting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-[#800000] to-[#690000] hover:shadow-[#800000]/30'
              }`}
            >
              {inviting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Kirim Undangan'
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={createForm.handleSubmit(handleCreateSubmit)} className="p-6 space-y-5">
            <div>
              <label htmlFor="student-name" className="block text-sm font-bold text-[#4d0000] mb-2">Nama Lengkap</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">person</span>
                <input
                  id="student-name"
                  type="text"
                  {...createForm.register('name')}
                  placeholder="Nama lengkap siswa"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all ${
                    createForm.formState.errors.name
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                      : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                  }`}
                />
              </div>
              {createForm.formState.errors.name && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{createForm.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="student-email" className="block text-sm font-bold text-[#4d0000] mb-2">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">mail</span>
                <input
                  id="student-email"
                  type="email"
                  {...createForm.register('email')}
                  placeholder="contoh@email.com"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all ${
                    createForm.formState.errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                      : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                  }`}
                />
              </div>
              {createForm.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{createForm.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="student-password" className="block text-sm font-bold text-[#4d0000] mb-2">Kata Sandi</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl" aria-hidden="true">lock</span>
                <input
                  id="student-password"
                  type="password"
                  {...createForm.register('password')}
                  placeholder="Buat kata sandi (min. 8 angka)"
                  className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] placeholder-[#800000]/30 focus:outline-none transition-all ${
                    createForm.formState.errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                      : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                  }`}
                />
              </div>
              {createForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{createForm.formState.errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="student-disability" className="block text-sm font-bold text-[#4d0000] mb-2">Tipe Disabilitas</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#800000]/40 text-xl pointer-events-none" aria-hidden="true">accessibility_new</span>
                <select
                  id="student-disability"
                  {...createForm.register('disability_type')}
                  className={`w-full pl-12 pr-10 py-3.5 bg-white border-2 rounded-xl text-[#2a2f32] focus:outline-none transition-all appearance-none cursor-pointer ${
                    createForm.formState.errors.disability_type
                      ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200'
                      : 'border-red-100 focus:border-[#800000] focus:ring-4 focus:ring-[#ffd700]/20'
                  }`}
                >
                  <option value="">Tidak Ada</option>
                  <option value="tuna_netra">Tuna Netra</option>
                  <option value="tuna_rungu_wicara">Tuna Rungu/Wicara</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#800000]/40 pointer-events-none" aria-hidden="true">
                  <span className="material-symbols-outlined text-xl">arrow_drop_down</span>
                </span>
              </div>
              {createForm.formState.errors.disability_type && (
                <p className="text-red-500 text-xs mt-1.5 font-medium">{createForm.formState.errors.disability_type.message}</p>
              )}
              <p className="text-sm text-[#575c60] mt-2">Pilih tipe disabilitas siswa jika ada, atau biarkan kosong.</p>
            </div>

            <button
              type="submit"
              disabled={creating}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2 ${
                creating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-br from-[#800000] to-[#690000] hover:shadow-[#800000]/30'
              }`}
            >
              {creating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Buat Akun'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
