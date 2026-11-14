import { Card, CardContent } from '@mui/material'
import type { ReactNode } from 'react'
export function SectionCard({ children, sx }: { children: ReactNode; sx?: object }) {
  return <Card sx={{ height: '100%', ...sx }}><CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>{children}</CardContent></Card>
}
