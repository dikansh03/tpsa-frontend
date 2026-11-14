import { Box, Typography } from './ui'
import type { ReactNode } from 'react'
export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={2} mb={2.5} flexWrap="wrap">
    <Box><Typography variant="h4">{title}</Typography>{subtitle && <Typography color="text.secondary" fontSize={13} mt={0.4}>{subtitle}</Typography>}</Box>{action}
  </Box>
}
