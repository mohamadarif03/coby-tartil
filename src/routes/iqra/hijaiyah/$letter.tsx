import { createFileRoute } from '@tanstack/react-router'
import DetailHijaiyah from '../../../DetailHijaiyah'

export const Route = createFileRoute('/iqra/hijaiyah/$letter')({
  component: DetailHijaiyah,
})
