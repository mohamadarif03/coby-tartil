import { createFileRoute } from '@tanstack/react-router'
import DetailAyatIsyarat from '../../../DetailAyatIsyarat'

export const Route = createFileRoute('/ayat-pendek/isyarat/$surah')({
  component: DetailAyatIsyarat,
})
