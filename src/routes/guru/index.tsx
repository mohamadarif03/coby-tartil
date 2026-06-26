import { createFileRoute } from '@tanstack/react-router'
import { requireTeacherRole } from '@/libs/route-guards'
import React from 'react';
import Sidebar from '@/components/layouts/Sidebar';
import useAccessibility from '@/hooks/use-accessibility';
import Chart from 'react-apexcharts';
import { useQueryData } from '@/hooks/use-global-fetch';
import { DASHBOARD_STATS } from '@/consts/api-url';
import type { TopStudent, DashboardCount } from '@/types/teacher-type';

export const Route = createFileRoute('/guru/')({
  beforeLoad: requireTeacherRole,
  component: GuruDashboard,
})

function GuruDashboard() {
  useAccessibility('Dashboard Guru');

  const { data: topStudentsRes, isLoading: topLoading } = useQueryData<TopStudent>(DASHBOARD_STATS.GET_TOP_STUDENTS);
  const { data: countDataRes, isLoading: countLoading } = useQueryData<DashboardCount, 'single'>(DASHBOARD_STATS.GET_COUNT_STUDENTS);

  const topStudents = topStudentsRes?.data;
  const countData = countDataRes?.data;

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex">
      <Sidebar activeMenu="Dashboard" role="teacher" />

      <main className="w-full p-8 ml-0 lg:ml-72 lg:p-12" id="main-content" role="main">
        <header className="flex justify-between gap-10 mb-12 items-justify">
          <div className='bg-[#ffffff] p-6 rounded-xl shadow-sm border border-[#a9aeb1]/10 w-full'>
            <h2 className="text-4xl font-black text-[#800000] tracking-tight mb-2">Halo, Guru! 👋</h2>
            <p className="text-lg text-[#575c60] font-medium">Pantau perkembangan siswa Anda</p>
          </div>
          <div className="bg-[#800000] p-6 rounded-xl shadow-sm border border-[#a9aeb1]/10 min-w-50 text-center">
            {countLoading ? (
              <div className="flex items-center justify-center py-2">
                <span className="inline-block w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <div className="text-5xl font-black text-[#ffffff]">{countData?.total_students ?? 0}</div>
                <p className="text-sm font-medium text-[#ffffff] mb-1">Total Siswa</p>
              </>
            )}
          </div>
        </header>

        <section className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-12">
          <div className="lg:col-span-7 bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#a9aeb1]/10">
            <h3 className="text-2xl font-black text-[#2a2f32] mb-6">Siswa dengan Progress Terbaik</h3>
            {topLoading ? (
              <div className="flex items-center justify-center py-16">
                <span className="inline-block w-8 h-8 border-2 border-[#800000]/30 border-t-[#800000] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ecf1f6]">
                      <th className="text-left py-4 px-2 text-sm font-bold text-[#575c60]">Siswa</th>
                      <th className="text-left py-4 px-2 text-sm font-bold text-[#575c60]">Modul</th>
                      <th className="text-right py-4 px-2 text-sm font-bold text-[#575c60]">Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(topStudents ?? []).slice(0, 5).map((student) => (
                      <tr key={student.id} className="border-b border-[#ecf1f6] last:border-b-0 hover:bg-[#f3f7fb] transition-colors">
                        <td className="px-2 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center font-bold text-sm">
                              {student.avatar ?? student.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-[#2a2f32]">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-2 py-4">
                          <span className="text-sm font-medium text-[#575c60]">{student.module}</span>
                        </td>
                        <td className="px-2 py-4 text-right">
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
                    {(!topStudents || topStudents.length === 0) && (
                      <tr>
                        <td colSpan={3} className="text-center py-16 text-[#575c60] font-medium">
                          Belum ada data siswa
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#a9aeb1]/10 flex flex-col items-center">
            <h3 className="text-2xl font-black text-[#2a2f32] mb-6 self-start">Statistik Siswa</h3>
            <div className="flex justify-center w-full">
              <Chart 
                options={{ 
                  chart: { type: 'donut' as const },
                  labels: ['Tuna Netra', 'Tuna Rungu', 'Reguler'],
                  colors: ['#00a86b', '#fad538', '#800000'],
                  legend: { position: 'bottom' as const },
                  dataLabels: { enabled: false },
                  plotOptions: {
                    pie: {
                      donut: { size: '60%' },
                    },
                  },
                  responsive: [{
                    breakpoint: 768,
                    options: { chart: { width: 280 }, legend: { position: 'bottom' } },
                  }],
                }}
                series={[32, 26, 60]} type="donut" width={320}
              />
            </div>
          </div>
        </section>
      </main>

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

export default GuruDashboard;
