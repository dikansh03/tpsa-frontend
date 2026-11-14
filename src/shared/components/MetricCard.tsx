import { Card, CardContent } from '@mui/material'
import { Box, Typography } from './ui'
import type { ReactNode } from 'react'
export function MetricCard({ label, value, hint, icon, tint, hintColor = '#08A765' }: { label: string; value: string; hint: string; icon: ReactNode; tint: string; hintColor?: string }) {
  return <Card><CardContent sx={{ p: 2.4, '&:last-child': { pb: 2.4 } }}>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1.8}>
      <Box sx={{ width: 40, height: 40, borderRadius: '13px', bgcolor: tint, display: 'grid', placeItems: 'center' }}>{icon}</Box>
      <Box sx={{ bgcolor: `${hintColor}18`, color: hintColor, borderRadius: 99, px: 1.2, py: 0.55, fontSize: 11.5, fontWeight: 650 }}>{hint}</Box>
    </Box>
    <Typography fontSize={12.5} color="text.secondary" mb={0.4}>{label}</Typography>
    <Typography sx={{ fontSize: { xs: 23, sm: 26 }, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}>{value}</Typography>
  </CardContent></Card>
}
