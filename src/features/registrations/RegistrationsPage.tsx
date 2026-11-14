import { useMemo, useState } from 'react'
import { Alert, Avatar, Button, Card, CardActionArea, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import { Box, Stack, Typography } from '../../shared/components/ui'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusPill } from '../../shared/components/StatusPill'
import { samplePlayers, type PlayerCardData } from './registration.data'

const sportColors: Record<string, { bg: string; fg: string }> = { Football: { bg: '#EEEBFF', fg: '#5B4CF6' }, Swimming: { bg: '#FFF0E9', fg: '#FF7043' }, Basketball: { bg: '#E5F7EF', fg: '#08A765' } }
function PlayerDetailDialog({ player, onClose }: { player: PlayerCardData | null; onClose: () => void }) {
  return <Dialog open={Boolean(player)} onClose={onClose} maxWidth="md" fullWidth><DialogTitle sx={{ pb: 1 }}>Student profile<Typography color="text.secondary" fontSize={12}>{player?.id} · Registered 12 Sep 2026</Typography></DialogTitle><DialogContent dividers>
    {player && <><Stack direction="row" alignItems="center" spacing={2} mb={3}><Avatar sx={{ width: 64, height: 64, bgcolor: '#EEEBFF', color: '#171A31', fontWeight: 800, fontSize: 22 }}>{player.initials}</Avatar><Box><Typography variant="h6">{player.name}</Typography><Stack direction="row" spacing={0.7} mt={0.7}>{player.sport.map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: sportColors[s].bg, color: sportColors[s].fg }} />)}<StatusPill tone={player.tone}>{player.status}</StatusPill><Chip label={player.centre} size="small" /></Stack></Box></Stack>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>{[['Date of birth', '14 Mar 2016 · Age 10'], ['Gender', 'Male'], ['Nationality', 'Egyptian'], ['Emirates ID', '784-••••-•••••••-•'], ['School', 'Sharjah English School'], ['Admission no.', 'SES-20418'], ['Batch', player.group], ['Coach', 'Coach Hamza'], ['Parent', 'Ahmed Rahman'], ['Mobile', '+971 50 987 6543'], ['Email', 'ahmed.r@example.com'], ['Medical info', 'No known allergies']].map(([label, value]) => <Box key={label}><Typography color="text.secondary" fontSize={11}>{label}</Typography><Typography fontSize={12.5} fontWeight={650}>{value}</Typography></Box>)}</Box>
      <Box mt={3} p={2} bgcolor="#F4F5FA" borderRadius={3}><Typography fontSize={11} color="text.secondary">SESSIONS</Typography><Typography variant="h5">{player.sessions} <Typography component="span" color="text.secondary" fontSize={12}>of {player.totalSessions} completed · {player.totalSessions-player.sessions} remaining</Typography></Typography></Box>
    </>}
  </DialogContent><DialogActions><Button onClick={onClose}>Close</Button><Button variant="contained" disabled>Connect profile API</Button></DialogActions></Dialog>
}

function RegistrationWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0)
  const steps = ['Student', 'Parent', 'Programme', 'Payment']
  const goClose = () => { setStep(0); onClose() }
  return <Dialog open={open} onClose={goClose} maxWidth="md" fullWidth><DialogTitle sx={{ pb: 1 }}><Typography variant="h5">New registration</Typography><Typography color="text.secondary" fontSize={12}>Step {step+1} of 4 · {steps[step]} details</Typography></DialogTitle><DialogContent dividers>
    <Stack direction="row" spacing={1} mb={3}>{steps.map((label, index) => <Chip key={label} label={`${index+1} ${label}`} color={step===index ? 'primary' : 'default'} sx={{ bgcolor: step===index ? 'primary.main' : '#F1F3F8', color: step===index ? 'white' : '#687394' }} />)}</Stack>
    {step===0 && <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 2 }}><TextField label="First name" fullWidth /><TextField label="Last name" fullWidth /><TextField label="Date of birth" type="date" slotProps={{ inputLabel: { shrink: true } }} /><TextField label="Gender" select defaultValue=""><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem></TextField><TextField label="Nationality" /><TextField label="Emirates ID" placeholder="784-0000-0000000-0" /><TextField label="School" /><TextField label="Admission number" /><TextField label="Medical information" multiline minRows={2} sx={{ gridColumn: '1 / -1' }} /></Box>}
    {step===1 && <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 2 }}><TextField label="Parent full name" /><TextField label="Relationship" select defaultValue="Parent"><MenuItem value="Parent">Parent</MenuItem><MenuItem value="Guardian">Guardian</MenuItem></TextField><TextField label="Mobile number" placeholder="+971" /><TextField label="Email address" /></Box>}
    {step===2 && <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 2 }}><TextField label="Sport" select defaultValue="Football"><MenuItem value="Football">Football</MenuItem><MenuItem value="Swimming">Swimming</MenuItem><MenuItem value="Basketball">Basketball</MenuItem></TextField><TextField label="Centre" select defaultValue="Sharjah"><MenuItem value="Sharjah">Sharjah</MenuItem><MenuItem value="Ajman">Ajman</MenuItem><MenuItem value="Dubai">Dubai</MenuItem></TextField><TextField label="Age group" /><TextField label="Skill level" /></Box>}
    {step===3 && <Box p={2} bgcolor="#F4F5FA" borderRadius={3}><Typography fontWeight={700} mb={1}>Payment details</Typography><Typography color="text.secondary" fontSize={13}>Package and invoice selection will be connected when the billing API is available.</Typography></Box>}
    <Alert severity="info" sx={{ mt: 2, fontSize: 12 }}>UI preview only. The uploaded backend does not yet expose player, guardian, enrolment or payment registration APIs. No data is saved.</Alert>
  </DialogContent><DialogActions sx={{ p: 2 }}><Button onClick={goClose}>Cancel</Button><Box flex={1} /><Button disabled={step===0} onClick={() => setStep(s => s-1)}>Back</Button><Button variant="contained" onClick={() => step===3 ? goClose() : setStep(s => s+1)}>{step===3 ? 'Close preview' : 'Continue'}</Button></DialogActions></Dialog>
}

export function RegistrationsPage() {
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('All sports')
  const [centre, setCentre] = useState('All centres')
  const [status, setStatus] = useState('All statuses')
  const [selected, setSelected] = useState<PlayerCardData | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const filtered = useMemo(() => samplePlayers.filter(player => (sport==='All sports' || player.sport.includes(sport)) && (centre==='All centres' || player.centre===centre) && (status==='All statuses' || player.status===status) && `${player.name} ${player.id} ${player.centre}`.toLowerCase().includes(query.toLowerCase())), [query, sport, centre, status])
  return <Box>
    <PageTitle title="Registrations" subtitle="1,248 players across 3 sports and 3 centres. Click any card for the full profile" action={<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setWizardOpen(true)}>New registration</Button>} />
    <Alert severity="info" icon={false} sx={{ mb: 2, fontSize: 12, bgcolor: '#F0EEFF', color: '#5143E8' }}>Sample Figma data shown for layout review. Player APIs are not included in the uploaded backend yet.</Alert>
    <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={1.5} mb={2.2}>
      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>{['All sports', 'Football', 'Swimming', 'Basketball'].map(item => <Chip key={item} label={item} onClick={() => setSport(item)} color={sport===item?'primary':'default'} variant={sport===item?'filled':'outlined'} sx={{ bgcolor: sport===item ? '#101126' : '#fff', color: sport===item ? '#fff' : '#687394', borderColor: '#E3E7F2' }} />)}</Stack>
      <Stack direction="row" spacing={1}><TextField size="small" placeholder="Search name, ID or mobile…" value={query} onChange={e=>setQuery(e.target.value)} slotProps={{ input: { startAdornment: <SearchRoundedIcon sx={{ color: '#98A2BF', mr: 1 }} fontSize="small" /> } }} /><TextField size="small" select value={centre} onChange={e=>setCentre(e.target.value)} sx={{ minWidth: 125 }}><MenuItem value="All centres">All centres</MenuItem>{['Sharjah','Ajman','Dubai'].map(v=><MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField><TextField size="small" select value={status} onChange={e=>setStatus(e.target.value)} sx={{ minWidth: 130 }}><MenuItem value="All statuses">All statuses</MenuItem>{['Active','Renewal due','Overdue','Trial','Waitlist'].map(v=><MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField></Stack>
    </Stack>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0,1fr))', xl: 'repeat(4, minmax(0,1fr))' }, gap: 2 }}>
      {filtered.map(player => <Card key={player.id}><CardActionArea onClick={() => setSelected(player)} sx={{ height: '100%' }}><CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="center" spacing={1.3} mb={1.4}><Avatar sx={{ width: 44, height: 44, bgcolor: ['#EEEBFF','#FFF0E9','#E5F7EF'][player.name.length%3], color: '#171A31', fontWeight: 750 }}>{player.initials}</Avatar><Box minWidth={0}><Typography fontSize={13.5} fontWeight={750} noWrap>{player.name}</Typography><Typography color="text.disabled" fontSize={10.5}>{player.id}</Typography></Box></Stack>
        <Stack direction="row" spacing={0.6} mb={1.2} flexWrap="wrap" useFlexGap>{player.sport.map(s=><Chip key={s} label={s} size="small" sx={{ bgcolor: sportColors[s].bg, color: sportColors[s].fg, height: 24 }} />)}</Stack>
        <Typography fontSize={11} color="text.secondary" mb={1.3}>{player.centre} · {player.group}</Typography>
        <Box display="flex" justifyContent="space-between" mb={0.6}><Typography fontSize={11} color="text.secondary">Sessions</Typography><Typography fontSize={11} fontWeight={700}>{player.sessions} / {player.totalSessions}</Typography></Box>
        <Box height={6} bgcolor="#F0F1F7" borderRadius={99} overflow="hidden" mb={1.3}><Box height="100%" width={`${Math.min(100,player.sessions/player.totalSessions*100)}%`} bgcolor="#5B4CF6" borderRadius={99} /></Box><StatusPill tone={player.tone}>{player.status}</StatusPill>
      </CardContent></CardActionArea></Card>)}
      {filtered.length===0 && <Typography color="text.secondary" gridColumn="1 / -1" py={5} textAlign="center">No players match your filters.</Typography>}
    </Box>
    <PlayerDetailDialog player={selected} onClose={()=>setSelected(null)} /><RegistrationWizard open={wizardOpen} onClose={()=>setWizardOpen(false)} />
  </Box>
}
