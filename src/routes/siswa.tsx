import { createFileRoute } from '@tanstack/react-router'
import Siswa from '../Siswa'

export const Route = createFileRoute('/siswa')({
  component: Siswa,
})
