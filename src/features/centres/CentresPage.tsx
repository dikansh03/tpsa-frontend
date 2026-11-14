import { useState } from 'react'
import { Alert, Button, Card, CardContent, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material'
import { Box, Stack, Typography } from '../../shared/components/ui'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PageTitle } from '../../shared/components/PageTitle'
import { centresApi, type CentreRequest } from './centres.api'
import { getApiErrorMessage } from '../../shared/api/apiClient'

export function CentresPage() {
  const queryClient = useQueryClient()
  const { data: centres = [], isLoading, error } = useQuery({ queryKey: ['centres'], queryFn: centresApi.list })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CentreRequest>({ name: '', emirate: 'Sharjah', address: '', active: true })
  const [formError, setFormError] = useState('')
  const createMutation = useMutation({ mutationFn: centresApi.create, onSuccess: async () => { await queryClient.invalidateQueries({ queryKey:['centres'] }); setOpen(false); setForm({ name:'',emirate:'Sharjah',address:'',active:true }) }, onError: e => setFormError(getApiErrorMessage(e)) })
  const save = () => { setFormError(''); if (!form.name.trim()) { setFormError('Centre name is required'); return } createMutation.mutate(form) }
  return <Box><PageTitle title="Centres" subtitle="Manage academy centres and emirates" action={<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={()=>setOpen(true)}>Add centre</Button>} />
    <Alert severity="info" icon={false} sx={{ mb:2,fontSize:12 }}>This screen is connected to the current Spring Boot API: GET and POST /centres. Update is available in the API but the edit action will be added after the first review.</Alert>
    {isLoading ? <Box display="grid" minHeight={200} sx={{placeItems:'center'}}><CircularProgress /></Box> : error ? <Alert severity="error">{getApiErrorMessage(error)}</Alert> : <Card><CardContent><Stack direction="row" justifyContent="space-between" mb={2}><Typography fontWeight={750}>All centres</Typography><Chip label={`${centres.length} centres`} /></Stack>{centres.map(c=><Box key={c.id} display="flex" alignItems="center" gap={2} py={1.8} borderTop="1px solid #E3E7F2"><Box flex={1}><Typography fontWeight={700} fontSize={14}>{c.name}</Typography><Typography color="text.secondary" fontSize={12}>{c.emirate}{c.address ? ` · ${c.address}` : ''}</Typography></Box><Chip size="small" label={c.active?'Active':'Inactive'} color={c.active?'success':'default'} /></Box>)}</CardContent></Card>}
    <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="sm"><DialogTitle>Add centre</DialogTitle><DialogContent><Stack spacing={2} pt={1}>{formError && <Alert severity="error">{formError}</Alert>}<TextField label="Centre name" value={form.name} onChange={e=>setForm(v=>({...v,name:e.target.value}))} required /><TextField label="Emirate" select value={form.emirate} onChange={e=>setForm(v=>({...v,emirate:e.target.value}))}>{['Sharjah','Ajman','Dubai','Abu Dhabi','Ras Al Khaimah','Fujairah','Umm Al Quwain'].map(v=><MenuItem key={v} value={v}>{v}</MenuItem>)}</TextField><TextField label="Address" multiline minRows={2} value={form.address} onChange={e=>setForm(v=>({...v,address:e.target.value}))} /></Stack></DialogContent><DialogActions><Button onClick={()=>setOpen(false)}>Cancel</Button><Button variant="contained" disabled={createMutation.isPending} onClick={save}>{createMutation.isPending?'Saving…':'Save centre'}</Button></DialogActions></Dialog>
  </Box>
}
