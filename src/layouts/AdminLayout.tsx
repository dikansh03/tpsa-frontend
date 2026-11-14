import { useState } from 'react'
import { IconButton, InputAdornment, TextField, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '../shared/components/ui'
import { Outlet } from 'react-router-dom'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Sidebar } from './Sidebar'

export function AdminLayout({ preview = false }: { preview?: boolean }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} preview={preview} />
      <Box sx={{ ml: { xs: 0, md: '248px' }, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ height: 84, px: { xs: 2, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
          {isMobile && <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 'auto', bgcolor: 'white', border: '1px solid', borderColor: 'divider' }}><MenuRoundedIcon /></IconButton>}
          <TextField size="small" placeholder="Search players, inquiries…" sx={{ width: { xs: 190, sm: 260 } }} slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: '#98A2BF' }} /></InputAdornment> } }} />
          <IconButton sx={{ bgcolor: 'white', border: '1px solid', borderColor: 'divider', width: 42, height: 42 }} aria-label="Notifications"><NotificationsNoneRoundedIcon /></IconButton>
        </Box>
        <Box component="main" sx={{ px: { xs: 2, sm: 3, xl: 4 }, pb: 4, flex: 1, minWidth: 0 }}><Outlet /></Box>
      </Box>
    </Box>
  )
}
