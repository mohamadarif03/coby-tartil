import { createFileRoute } from '@tanstack/react-router'
import AyatPendek from '../../AyatPendek'

export const Route = createFileRoute('/ayat-pendek/')({
  component: AyatPendek,
})
