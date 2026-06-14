import { createFileRoute } from '@tanstack/react-router'
import DetailAyat from '../../DetailAyat'

export const Route = createFileRoute('/ayat-pendek/$surah')({
  component: DetailAyat,
})
