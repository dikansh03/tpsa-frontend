import { useState } from 'react'
import { Alert, Button, Chip, Divider, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Box, Stack, Typography } from '../../shared/components/ui'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import AirportShuttleRoundedIcon from '@mui/icons-material/AirportShuttleRounded'
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useNavigate, useLocation } from 'react-router-dom'
import { MetricCard } from '../../shared/components/MetricCard'
import { SectionCard } from '../../shared/components/SectionCard'
import { StatusPill } from '../../shared/components/StatusPill'

const revenue = [{ week: 'W1', amount: 18 }, { week: 'W2', amount: 25 }, { week: 'W3', amount: 21 }, { week: 'W4', amount: 31 }, { week: 'W5', amount: 27 }, { week: 'W6', amount: 38 }, { week: 'W7', amount: 33 }, { week: 'Now', amount: 43 }]
const sports = [{ name: 'Football', value: 649, color: '#5B4CF6' }, { name: 'Swimming', value: 387, color: '#FF7043' }, { name: 'Basketball', value: 212, color: '#08B76B' }]
const sessions = [
  { time: '4:00 PM', title: 'Football U10 · Beginner', details: 'Sharjah · Coach Hamza', count: '18 / 20 present', status: 'In progress', tone: 'success' as const },
  { time: '5:00 PM', title: 'Swimming · Level 2', details: 'Ajman · Coach Reem', count: '12 / 12 booked', status: 'Full', tone: 'warning' as const },
  { time: '5:30 PM', title: 'Basketball U14', details: 'Dubai · Coach Marcus', count: '9 / 16 booked', status: 'Upcoming', tone: 'neutral' as const },
]

export function DashboardPage() {
  const [centre, setCentre] = useState('All centres')
  const navigate = useNavigate()
  const location = useLocation()
  const previewBase = location.pathname.startsWith('/preview') ? '/preview' : ''
  const [period, setPeriod] = useState('Weekly')
  return <Box>
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2} flexWrap="wrap" mb={2.5}>
      <Box><Typography variant="h4">Good evening, Akmal</Typography><Typography color="text.secondary" fontSize={13} mt={0.4}>Saturday, 24 October · Here is what is happening across your academy</Typography></Box>
      <Button variant="contained" startIcon={<PersonAddAlt1RoundedIcon />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }} onClick={() => navigate(`${previewBase}/registrations`)}>New registration</Button>
    </Box>
    <Stack direction="row" spacing={1} mb={2.5} flexWrap="wrap" useFlexGap>
      {['All centres', 'Sharjah', 'Ajman', 'Dubai'].map(item => <Chip key={item} label={item} onClick={() => setCentre(item)} color={centre === item ? 'primary' : 'default'} variant={centre === item ? 'filled' : 'outlined'} sx={{ bgcolor: centre === item ? '#101126' : '#FFFFFF', color: centre === item ? '#FFFFFF' : '#687394', borderColor: '#E3E7F2', px: 0.5, height: 34 }} />)}
      <Typography color="text.disabled" fontSize={11} ml="auto" alignSelf="center">◷ &nbsp; Live · synced 2 min ago</Typography>
    </Stack>
    <Alert severity="info" icon={false} sx={{ mb: 2, py: 0.2, fontSize: 12, bgcolor: '#F0EEFF', color: '#5143E8', border: '1px solid #E4E0FF' }}>Design preview using sample dashboard data. Dashboard aggregation APIs are not included in the uploaded backend yet.</Alert>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }, gap: 2.2, mb: 2.5 }}>
      <MetricCard label="Active players" value="1,248" hint="↑ +8.2%" icon={<PeopleAltRoundedIcon sx={{ color: '#5B4CF6' }} />} tint="#EEEBFF" />
      <MetricCard label="Revenue · October" value="AED 186,400" hint="↑ +12.4%" icon={<TrendingUpRoundedIcon sx={{ color: '#FF7043' }} />} tint="#FFF0E9" />
      <MetricCard label="Attendance today" value="92%" hint="3 absent" icon={<EventAvailableRoundedIcon sx={{ color: '#08B76B' }} />} tint="#E5F7EF" hintColor="#687394" />
      <MetricCard label="Pending payments" value="AED 24,750" hint="18 overdue" icon={<ScheduleRoundedIcon sx={{ color: '#F59E0B' }} />} tint="#FFF3DD" hintColor="#F05252" />
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1.65fr 1fr' }, gap: 2.2, mb: 2.5 }}>
      <SectionCard>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={2}>
          <Box><Typography fontWeight={750}>Revenue overview</Typography><Typography fontSize={12} color="text.secondary">Last 8 weeks · {centre.toLowerCase()}</Typography></Box>
          <ToggleButtonGroup size="small" exclusive value={period} onChange={(_, value: string | null) => value && setPeriod(value)} sx={{ bgcolor: '#F4F5FA', borderRadius: 99, '& .MuiToggleButton-root': { border: 0, borderRadius: '99px !important', px: 1.7, py: 0.6, fontSize: 11 } }}><ToggleButton value="Weekly">Weekly</ToggleButton><ToggleButton value="Monthly">Monthly</ToggleButton></ToggleButtonGroup>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1.2} mt={1.6} mb={0.5}><Typography variant="h5">AED 186,400</Typography><StatusPill tone="success">+12.4% vs September</StatusPill></Stack>
        <Box height={190} mt={1}>
          <ResponsiveContainer width="100%" height="100%"><BarChart data={revenue} margin={{ top: 8, right: 10, left: -18, bottom: 0 }}><XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#98A2BF', fontSize: 11 }} /><YAxis hide /><Tooltip cursor={{ fill: '#F4F5FA' }} formatter={(value) => [`AED ${Number(value) * 1000}`, 'Revenue']} /><Bar dataKey="amount" radius={[10, 10, 10, 10]} barSize={34}>{revenue.map((item, index) => <Cell key={item.week} fill={index === revenue.length - 1 ? '#5B4CF6' : '#EDEBFF'} />)}</Bar></BarChart></ResponsiveContainer>
        </Box>
      </SectionCard>
      <SectionCard>
        <Typography fontWeight={750}>Players by sport</Typography><Typography fontSize={12} color="text.secondary">1,248 active · 3 sports running</Typography>
        <Box display="flex" alignItems="center" gap={1} mt={1} flexWrap="wrap">
          <Box width={150} height={150} position="relative" flexShrink={0}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={sports} dataKey="value" nameKey="name" innerRadius={49} outerRadius={69} paddingAngle={2} stroke="#FFFFFF" strokeWidth={3}>{sports.map(item => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer><Box position="absolute" inset={0} display="flex" alignItems="center" justifyContent="center" flexDirection="column" pointerEvents="none"><Typography fontSize={20} fontWeight={800}>1,248</Typography><Typography fontSize={10} color="text.secondary">players</Typography></Box></Box>
          <Box flex={1} minWidth={130}>{sports.map(item => <Box key={item.name} display="flex" alignItems="center" justifyContent="space-between" mb={1.1}><Stack direction="row" alignItems="center" spacing={0.8}><Box width={8} height={8} borderRadius="50%" bgcolor={item.color} /><Typography fontSize={12}>{item.name}</Typography></Stack><Typography fontSize={12} fontWeight={700}>{item.value}</Typography></Box>)}</Box>
        </Box>
        <Typography fontSize={10} color="text.disabled" fontWeight={750} letterSpacing=".12em" mt={0.5} mb={0.8}>BY CENTRE</Typography>
        <Box display="flex" gap={0.4} height={8} borderRadius={99} overflow="hidden"><Box width="54%" bgcolor="#5B4CF6" /><Box width="28%" bgcolor="#FF7043" /><Box width="18%" bgcolor="#08B76B" /></Box>
        <Stack direction="row" justifyContent="space-between" mt={0.8}><Typography fontSize={10.5} color="text.secondary">Sharjah 54%</Typography><Typography fontSize={10.5} color="text.secondary">Dubai 28%</Typography><Typography fontSize={10.5} color="text.secondary">Ajman 18%</Typography></Stack>
      </SectionCard>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', xl: '1.65fr 1fr' }, gap: 2.2 }}>
      <SectionCard>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.2}><Typography fontWeight={750}>Today's sessions</Typography><Button size="small">View all</Button></Box>
        {sessions.map((item, index) => <Box key={item.time}><Box display="grid" alignItems="center" gap={1.5} sx={{ gridTemplateColumns: { xs: '65px 1fr', sm: '70px 1.5fr 1fr auto' }, py: 1.5 }}>
          <Typography fontSize={12} fontWeight={750}>{item.time}</Typography><Box><Typography fontSize={12.5} fontWeight={700}>{item.title}</Typography><Typography fontSize={11} color="text.secondary">{item.details}</Typography></Box><Typography fontSize={11} color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>{item.count}</Typography><Box sx={{ gridColumn: { xs: '2', sm: 'auto' } }}><StatusPill tone={item.tone}>{item.status}</StatusPill></Box>
        </Box>{index !== sessions.length - 1 && <Divider />}</Box>)}
      </SectionCard>
      <SectionCard>
        <Typography fontWeight={750} mb={1.5}>Needs attention</Typography>
        {[
          { label: 'Renewals due this week', count: '34', icon: <AutorenewRoundedIcon />, tone: '#FFF3DD', color: '#D88700' },
          { label: 'Trial confirmations', count: '12', icon: <PersonAddAlt1RoundedIcon />, tone: '#EEEBFF', color: '#5B4CF6' },
          { label: 'Transport requests', count: '9', icon: <AirportShuttleRoundedIcon />, tone: '#FFF0E9', color: '#FF7043' },
          { label: 'Certificates to collect', count: '21', icon: <WorkspacePremiumRoundedIcon />, tone: '#E5F7EF', color: '#08B76B' },
        ].map(item => <Box key={item.label} display="flex" alignItems="center" gap={1.4} py={1.05}><Box sx={{ width: 36, height: 36, borderRadius: '11px', bgcolor: item.tone, color: item.color, display: 'grid', placeItems: 'center' }}>{item.icon}</Box><Typography fontSize={12} fontWeight={600} flex={1}>{item.label}</Typography><Chip size="small" label={item.count} sx={{ bgcolor: item.tone, color: item.color, fontWeight: 750 }} /></Box>)}
      </SectionCard>
    </Box>
  </Box>
}
