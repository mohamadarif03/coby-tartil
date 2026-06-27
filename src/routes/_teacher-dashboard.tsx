import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import Sidebar from '@/components/layouts/Sidebar'
import { requireTeacherRole } from '@/libs/route-guards'

export const Route = createFileRoute('/_teacher-dashboard')({
  beforeLoad: requireTeacherRole,
  component: TeacherDashboardLayout,
})

function TeacherDashboardLayout() {
  const { pathname } = useLocation()

  const activeMenu = (() => {
    if (pathname.startsWith('/guru/monitoring')) return 'Monitoring'
    if (pathname === '/guru' || pathname === '/guru/') return 'Dashboard'
    return 'Dashboard'
  })()

  return (
    <div className="flex">
      <Sidebar activeMenu={activeMenu} role="teacher" />
      <Outlet />
    </div>
  )
}
