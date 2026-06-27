import { STUDENT } from '@/consts/api-url';
import { useQueryData } from '@/hooks/use-global-fetch';
import type { Student } from '@/types/teacher-type';
import { createFileRoute, Link, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect } from 'react';
import Chart from 'react-apexcharts';

export const Route = createFileRoute('/_teacher-dashboard/guru/monitoring/$studentId/')({
  component: RouteComponent,
})

const detailChartOptions = {
  chart: { type: 'donut' as const },
  labels: ['Iqra', 'Ayat Pendek', 'Menulis Hijaiyah', 'Harakat'],
  colors: ['#800000', '#1050c0', '#fad538', '#00a86b'],
  legend: { position: 'bottom' as const },
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: { size: '60%' },
    },
  },
};


function RouteComponent() {
  const { studentId } = useParams({ from: '/_teacher-dashboard/guru/monitoring/$studentId/' })
  const navigate = useNavigate();

  const { data: studentRes, isLoading } = useQueryData<Student, 'single'>(STUDENT.GET_SINGLE, { student_id: studentId });
  const student = studentRes?.data;

  useEffect(() => {
    if (!isLoading && !student) {
      navigate({ to: '/guru/monitoring' })
    }
  }, [student, isLoading, navigate])

  return (
    <div className="bg-[#f3f7fb] text-[#2a2f32] min-h-screen siswa-body siswa-headline flex flex-1">
        <main className="w-full p-8 ml-0 lg:ml-72 lg:p-12" id="main-content" role="main">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <span className="inline-block w-10 h-10 border-2 border-[#800000]/30 border-t-[#800000] rounded-full animate-spin" />
            </div>
          ) : (
            <div>
              <Link to='/guru/monitoring' className="flex items-center gap-2 text-[#800000] font-bold mb-6 group">
                <span className="material-symbols-outlined" aria-hidden="true">arrow_back</span>
                <span className="group-hover:underline">Kembali</span>
              </Link>

              <div className="bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#a9aeb1]/10 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#800000]/10 text-[#800000] flex items-center justify-center font-black text-2xl">
                    {student?.avatar ?? (student?.name ?? '').charAt(0).toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#2a2f32]">{student?.name || '-'}</h3>
                    <p className="text-[#575c60]">{student?.email || '-'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#f3f7fb] p-4 rounded-xl text-center">
                    <p className="text-2xl font-black text-[#800000]">{student?.progress ?? 0}%</p>
                    <p className="text-sm text-[#575c60] font-medium">Progress</p>
                  </div>
                  <div className="bg-[#f3f7fb] p-4 rounded-xl text-center">
                    <p className="text-2xl font-black text-[#800000]">{student?.module || '-'}</p>
                    <p className="text-sm text-[#575c60] font-medium">Modul Aktif</p>
                  </div>
                  <div className="bg-[#f3f7fb] p-4 rounded-xl text-center">
                    <p className="text-2xl font-black text-[#800000]">{student?.type || '-'}</p>
                    <p className="text-sm text-[#575c60] font-medium">Tipe</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#ffffff] p-8 rounded-xl shadow-sm border border-[#a9aeb1]/10">
                <h4 className="text-xl font-black text-[#2a2f32] mb-6">Distribusi Progress per Modul</h4>
                <div className="flex justify-center">
                  <Chart options={detailChartOptions} series={[40, 25, 20, 15]} type="donut" width={300} />
                </div>
              </div>
            </div>
          )}
        </main>
    </div>
  );
}
