import { createFileRoute } from '@tanstack/react-router'
import IqraMad from '../../IqraMad'

export const Route = createFileRoute('/iqra/mad')({
  component: IqraMad,
})
