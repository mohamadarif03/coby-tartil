import { redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { ROLE } from '@/enums/roles-enum'

/**
 * Guard for auth pages (login/register).
 * Redirects authenticated users away to their appropriate dashboard.
 */
export function redirectAuthenticatedUser() {
  const { isAuthenticated, role } = useAuthStore.getState()
  if (isAuthenticated) {
    if (role === ROLE.TEACHER) {
      throw redirect({ to: '/guru' })
    }
    throw redirect({ to: '/siswa' })
  }
}

/**
 * Guard for student-only pages.
 * Blocks users with the "teacher" role and redirects them to the teacher dashboard.
 * Unauthenticated users are allowed through (guest access).
 */
export function requireStudentRole() {
  const { isAuthenticated, role } = useAuthStore.getState()
  if (isAuthenticated && role === ROLE.TEACHER) {
    throw redirect({ to: '/guru' })
  }
}

/**
 * Guard for teacher-only pages.
 * Redirects unauthenticated users to login,
 * and non-teacher authenticated users to the student dashboard.
 */
export function requireTeacherRole() {
  const { isAuthenticated, role } = useAuthStore.getState()
  if (!isAuthenticated) {
    throw redirect({ to: '/login' })
  }
  if (role !== ROLE.TEACHER) {
    throw redirect({ to: '/siswa' })
  }
}
