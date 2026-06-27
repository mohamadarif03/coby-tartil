import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import '@/index.css'

import { routeTree } from '@/routeTree.gen'
import { APP_TITLE } from '@/consts/config'
import z from 'zod'
import { id } from 'zod/v4/locales'

// config
z.config(id())

// Set dynamic document title
document.title = `${APP_TITLE} | Belajar Al-Qur'an`

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
