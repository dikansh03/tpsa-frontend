import { Box } from './ui'
import type { ReactNode } from 'react'
const tones: Record<string, { bg: string; color: string; dot: string }> = {
  success: { bg: '#E5F7EF', color: '#08A765', dot: '#08B76B' },
  warning: { bg: '#FFF3DD', color: '#D88700', dot: '#FF9F1C' },
  error: { bg: '#FFECEB', color: '#E34F4B', dot: '#F05252' },
  purple: { bg: '#EEEBFF', color: '#5B4CF6', dot: '#5B4CF6' },
  neutral: { bg: '#F1F3F8', color: '#687394', dot: '#7A839D' },
  orange: { bg: '#FFF0E9', color: '#F26A3D', dot: '#FF7043' },
}
export function StatusPill({ children, tone = 'neutral', dot = true }: { children: ReactNode; tone?: keyof typeof tones; dot?: boolean }) {
  const style = tones[tone]
  return <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.7, px: 1.15, py: 0.52, borderRadius: 99, bgcolor: style.bg, color: style.color, fontSize: 11.5, lineHeight: 1.2, fontWeight: 650, whiteSpace: 'nowrap' }}>
    {dot && <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: style.dot }} />}{children}
  </Box>
}
