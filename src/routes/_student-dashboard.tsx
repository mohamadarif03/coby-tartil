import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import Sidebar from '@/components/layouts/Sidebar'
import { requireStudentRole } from '@/libs/route-guards'

export const Route = createFileRoute('/_student-dashboard')({
  beforeLoad: requireStudentRole,
  component: StudentDashboardLayout,
})

function StudentDashboardLayout() {
  const { pathname } = useLocation()

  const activeMenu = (() => {
    if (pathname.startsWith('/siswa/iqra')) return 'iqra'
    if (pathname.startsWith('/siswa/menulis-hijaiyah')) return 'menulis-hijaiyah'
    if (pathname.startsWith('/siswa/ayat-pendek')) return 'short-verses'
    if (pathname === '/siswa' || pathname === '/siswa/') return 'home'
    return 'home'
  })()

  return (
    <div className="flex">
      <Sidebar activeMenu={activeMenu} role="student" />
      <Outlet />
    </div>
  )
}
