import { createFileRoute } from '@tanstack/react-router'
import DetailHijaiyahIsyarat from '../../../../DetailHijaiyahIsyarat'

export const Route = createFileRoute('/iqra/hijaiyah/isyarat/$letter')({
  component: DetailHijaiyahIsyarat,
})
