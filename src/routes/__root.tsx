import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { apiClient } from '@/libs/api-client'
import { getToken } from '@/libs/token-handler'
import { useAuthStore } from '@/stores/auth-store'
import { AUTH } from '@/consts/api-url'

async function initializeAuth() {
  const token = getToken()
  if (!token) return

  const { isAuthenticated, login } = useAuthStore.getState()
  if (isAuthenticated) return

  try {
    const res = await apiClient.get(AUTH.ME)
    console.log(res.data)
    login(res.data, true)
  } catch {
    // Token is invalid/expired — the 401 response interceptor already
    // clears the auth store and removes the token, so nothing extra needed.
  }
}

export const Route = createRootRoute({
  beforeLoad: initializeAuth,
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
})
