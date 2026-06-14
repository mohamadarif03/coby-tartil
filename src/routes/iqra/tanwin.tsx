import { createFileRoute } from '@tanstack/react-router'
import IqraTanwin from '../../IqraTanwin'

export const Route = createFileRoute('/iqra/tanwin')({
  component: IqraTanwin,
})
