import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';
import { StudentPlaceholders } from '@/consts/students-placeholder';
import AddStudentModal from './-components/add-student-modal';


export const Route = createFileRoute('/guru/monitoring/')({
  component: GuruMonitoring,
})


function GuruMonitoring() {
  useAccessibility('Monitoring Siswa');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="Monitoring" role="teacher" />

      <main className="w-full p-8 ml-72 lg:p-12" id="main-content" role="main">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-black text-[#800000] tracking-tight mb-2">Monitoring Siswa</h2>
            <p className="text-lg text-[#575c60] font-medium">Pantau perkembangan belajar siswa</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-br from-[#800000] to-[#690000] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-[#800000]/30 transition-all active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#ffd700] focus:ring-offset-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">person_add</span>
            Tambah Siswa
          </button>
        </header>

        <div className="bg-[#ffffff] rounded-xl shadow-sm border border-[#a9aeb1]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f3f7fb] border-b border-[#ecf1f6]">
                  <th className="text-left py-4 px-6 text-sm font-bold text-[#575c60]">Siswa</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-[#575c60]">Email</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-[#575c60]">Modul</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-[#575c60]">Tipe</th>
                  <th className="text-right py-4 px-6 text-sm font-bold text-[#575c60]">Progress</th>
                </tr>
              </thead>
              <tbody>
                {StudentPlaceholders.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => navigate({to : '/guru/monitoring/$studentId', params : { studentId : String(student.id) } })}
                    className="border-b border-[#ecf1f6] last:border-b-0 hover:bg-[#f3f7fb] transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center font-bold text-sm">
                          {student.avatar}
                        </div>
                        <span className="font-bold text-[#2a2f32]">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#575c60]">{student.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#2a2f32]">{student.module}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#800000]/5 text-[#800000]">{student.type}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-24 h-2 bg-[#ecf1f6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#800000] rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-[#800000] min-w-[40px]">{student.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div className="fixed top-0 right-0 pointer-events-none -z-10 opacity-20" aria-hidden="true">
        <svg fill="none" height="400" viewBox="0 0 400 400" width="400" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="100" fill="url(#paint0_linear)" r="150"></circle>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="150" x2="450" y1="-50" y2="250">
              <stop stopColor="#5de3fc"></stop>
              <stop offset="1" stopColor="#800000"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}