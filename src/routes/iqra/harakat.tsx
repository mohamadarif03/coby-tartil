import { createFileRoute } from '@tanstack/react-router'
import IqraHarakat from '../../IqraHarakat'

export const Route = createFileRoute('/iqra/harakat')({
  component: IqraHarakat,
})
