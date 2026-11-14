import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { Box, Stack, Typography } from '../shared/components/ui'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded'
import SportsSoccerRoundedIcon from '@mui/icons-material/SportsSoccerRounded'
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded'
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded'
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: DashboardRoundedIcon },
  { label: 'Registrations', path: '/registrations', icon: PersonAddAlt1RoundedIcon },
  { label: 'CRM & Leads', path: '/crm', icon: Groups2RoundedIcon },
  { label: 'Attendance', path: '/attendance', icon: EventAvailableRoundedIcon },
  { label: 'Payments', path: '/payments', icon: CreditCardRoundedIcon },
  { label: 'Sports Camps', path: '/sports-camps', icon: SportsSoccerRoundedIcon },
  { label: 'Transport', path: '/transport', icon: AirportShuttleRoundedIcon },
  { label: 'Reports', path: '/reports', icon: AssessmentRoundedIcon },
]

function SidebarContents({ onNavigate, preview }: { onNavigate?: () => void; preview: boolean }) {
  const location = useLocation()
  const base = preview ? '/preview' : ''
  return <Box sx={{ width: 248, height: '100%', bgcolor: '#101126', color: '#FFFFFF', display: 'flex', flexDirection: 'column', p: 2.5 }}>
    <Stack direction="row" alignItems="center" spacing={1.5} mb={4.2}>
      <Box sx={{ width: 40, height: 40, bgcolor: '#5B4CF6', borderRadius: '13px', display: 'grid', placeItems: 'center' }}><BoltRoundedIcon sx={{ fontSize: 25 }} /></Box>
      <Box><Typography fontWeight={800} fontSize={16} lineHeight={1.1}>Titan Pro</Typography><Typography fontSize={11} color="#8D93B1" mt={0.4}>Sports Academy</Typography></Box>
    </Stack>
    <Typography fontSize={10} fontWeight={750} letterSpacing=".14em" color="#8D93B1" mb={1.2}>MENU</Typography>
    <List disablePadding sx={{ display: 'grid', gap: 0.45 }}>
      {navItems.map(item => {
        const path = `${base}${item.path}`
        const active = location.pathname === path || (item.path !== '/dashboard' && location.pathname.startsWith(path))
        const Icon = item.icon
        return <ListItemButton key={item.path} component={NavLink} to={path} onClick={onNavigate} sx={{ borderRadius: '12px', minHeight: 40, color: active ? '#FFFFFF' : '#9AA0BC', px: 1.4, '&.active': { bgcolor: '#5B4CF6', color: '#FFFFFF' }, '&:hover': { bgcolor: active ? '#5B4CF6' : 'rgba(255,255,255,.07)' } }}>
          <ListItemIcon sx={{ minWidth: 31, color: 'inherit' }}><Icon sx={{ fontSize: 19 }} /></ListItemIcon><ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: 13.5, fontWeight: active ? 700 : 550 } } }} />
        </ListItemButton>
      })}
    </List>
    <Box mt={3}><Typography fontSize={10} fontWeight={750} letterSpacing=".14em" color="#8D93B1" mb={1.1}>SETUP</Typography>
      <List disablePadding><ListItemButton component={NavLink} to={`${base}/centres`} onClick={onNavigate} sx={{ borderRadius: '12px', minHeight: 40, color: location.pathname.endsWith('/centres') ? '#fff' : '#9AA0BC', px: 1.4, '&.active': { bgcolor: '#5B4CF6', color: '#fff' }, '&:hover': { bgcolor: 'rgba(255,255,255,.07)' } }}><ListItemIcon sx={{ minWidth: 31, color: 'inherit' }}><ApartmentRoundedIcon sx={{ fontSize: 19 }} /></ListItemIcon><ListItemText primary="Centres" slotProps={{ primary: { sx: { fontSize: 13.5, fontWeight: 550 } } }} /></ListItemButton></List>
    </Box>
    <Box sx={{ flex: 1 }} />
    <Stack direction="row" alignItems="center" spacing={1.2} sx={{ bgcolor: '#1D203F', borderRadius: '14px', p: 1.2 }}>
      <Avatar sx={{ width: 36, height: 36, bgcolor: '#FF7043', fontSize: 12, fontWeight: 800 }}>AR</Avatar>
      <Box minWidth={0}><Typography fontSize={12} fontWeight={700} noWrap>Akmal Rafeek</Typography><Typography fontSize={10} color="#9298B5">CRE / Admin</Typography></Box>
    </Stack>
  </Box>
}

export function Sidebar({ mobileOpen, onClose, preview }: { mobileOpen: boolean; onClose: () => void; preview: boolean }) {
  return <>
    <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'fixed', inset: '0 auto 0 0', zIndex: 1200 }}><SidebarContents preview={preview} /></Box>
    <Drawer open={mobileOpen} onClose={onClose} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 248, bgcolor: '#101126', border: 0 } }}><SidebarContents preview={preview} onNavigate={onClose} /></Drawer>
  </>
}
