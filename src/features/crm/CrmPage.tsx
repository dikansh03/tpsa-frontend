import { useState } from 'react'
import { Alert, Avatar, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { Box, Stack, Typography } from '../../shared/components/ui'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded'
import { PageTitle } from '../../shared/components/PageTitle'
import { StatusPill } from '../../shared/components/StatusPill'

const columns = [
  { title: 'New inquiries', color: '#5B4CF6', items: [{ id:'INQ-0148',name:'Zayan Ali',sport:'Football',centre:'Sharjah',age:9,source:'Meta Ads',time:'Received 8 min ago',owner:'AR' },{ id:'INQ-0147',name:'Mariam Khan',sport:'Swimming',centre:'Dubai',age:6,source:'Website',time:'Received 1 hr ago',owner:'SK' },{ id:'INQ-0146',name:'Omar Hassan',sport:'Basketball',centre:'Ajman',age:13,source:'Referral',time:'Received 3 hr ago',owner:'AR' },{ id:'INQ-0145',name:'Lina Farouk',sport:'Swimming',centre:'Sharjah',age:3,source:'School',time:'Received yesterday',owner:'HM' }] },
  { title: 'Trial booked', color: '#FF7043', items: [{ id:'INQ-0141',name:'Yusuf Rahman',sport:'Football',centre:'Sharjah',age:10,source:'Website',time:'Sat 1 Nov · 4:00 PM',owner:'SK' },{ id:'INQ-0139',name:'Sara Nair',sport:'Swimming',centre:'Dubai',age:7,source:'Meta Ads',time:'Sun 2 Nov · 5:00 PM',owner:'AR' },{ id:'INQ-0136',name:'Adam Malik',sport:'Basketball',centre:'Ajman',age:12,source:'Referral',time:'Mon 3 Nov · 5:30 PM',owner:'HM' }] },
  { title: 'Trial attended', color: '#F59E0B', items: [{ id:'INQ-0132',name:'Aisha Qadir',sport:'Football',centre:'Sharjah',age:8,source:'School',time:'Follow-up due today',owner:'SK' },{ id:'INQ-0128',name:'Rayan Saleh',sport:'Basketball',centre:'Ajman',age:9,source:'Website',time:'Awaiting decision',owner:'AR' },{ id:'INQ-0125',name:'Noor Iqbal',sport:'Basketball',centre:'Dubai',age:14,source:'Meta Ads',time:'Payment link sent',owner:'HM' }] },
  { title: 'Registered', color: '#08B76B', items: [{ id:'INQ-0119',name:'Hamdan Yusuf',sport:'Football',centre:'Sharjah',age:11,source:'Referral',time:'12 sessions · Paid',owner:'SK' },{ id:'INQ-0117',name:'Dana Aziz',sport:'Swimming',centre:'Dubai',age:8,source:'Website',time:'8 sessions · Paid',owner:'AR' },{ id:'INQ-0112',name:'Karim Tariq',sport:'Basketball',centre:'Ajman',age:13,source:'Meta Ads',time:'16 sessions · Paid',owner:'HM' }] },
]
const sourceTone: Record<string, 'purple'|'orange'|'warning'|'success'> = { Website:'purple','Meta Ads':'orange',Referral:'success',School:'warning' }

export function CrmPage() {
  const [selected, setSelected] = useState<(typeof columns)[number]['items'][number] | null>(null)
  return <Box>
    <PageTitle title="CRM & Leads" subtitle="Every inquiry from website, Meta ads, referrals and schools in one pipeline" action={<Stack direction="row" spacing={1}><Button variant="outlined" startIcon={<MessageRoundedIcon />}>Message parents</Button><Button variant="contained" startIcon={<AddRoundedIcon />}>Add inquiry</Button></Stack>} />
    <Alert severity="info" icon={false} sx={{ mb: 2, fontSize: 12, bgcolor: '#F0EEFF', color: '#5143E8' }}>Sample Figma pipeline data. CRM and inquiry APIs are not included in the uploaded backend yet.</Alert>
    <Stack direction="row" spacing={1} mb={2.5} flexWrap="wrap" useFlexGap>{['All sources','Website','Meta Ads','Referral','School'].map((v,i)=><Chip key={v} label={v} variant={i===0?'filled':'outlined'} sx={{ bgcolor: i===0?'#101126':'#fff', color: i===0?'#fff':'#687394', borderColor:'#E3E7F2' }} />)}</Stack>
    <Box sx={{ display:'grid', gridTemplateColumns:{ xs:'repeat(2,minmax(250px,1fr))', xl:'repeat(4,minmax(0,1fr))' }, gap:2, overflowX:'auto', pb:1 }}>
      {columns.map(column => <Box key={column.title} minWidth={0}>
        <Stack direction="row" alignItems="center" spacing={0.8} mb={1.3}><Box width={8} height={8} borderRadius="50%" bgcolor={column.color}/><Typography fontSize={13} fontWeight={750}>{column.title}</Typography><Typography color="text.secondary" fontSize={11} ml="auto !important">{column.items.length}</Typography></Stack>
        <Stack spacing={1.2}>{column.items.map(item=><Card key={item.id}><CardContent sx={{ p:1.8,'&:last-child':{pb:1.8} }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}><Typography fontSize={10} color="text.disabled" letterSpacing=".1em">{item.id}</Typography><StatusPill tone={sourceTone[item.source]}>{item.source}</StatusPill></Stack>
          <Box component="button" onClick={()=>setSelected(item)} sx={{ p:0,border:0,bgcolor:'transparent',cursor:'pointer',textAlign:'left',color:'inherit' }}><Typography fontWeight={750} fontSize={13}>{item.name}</Typography></Box>
          <Typography color="text.secondary" fontSize={11} mt={0.3}>{item.sport} · {item.centre} · Age {item.age}</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mt={1.2}><Typography color="text.secondary" fontSize={10.5}>◷ &nbsp;{item.time}</Typography><Avatar sx={{ width:24,height:24,fontSize:9,bgcolor:'#EEEBFF',color:'#5143E8' }}>{item.owner}</Avatar></Stack>
        </CardContent></Card>)}</Stack>
      </Box>)}
    </Box>
    <Dialog open={Boolean(selected)} onClose={()=>setSelected(null)} maxWidth="sm" fullWidth><DialogTitle>{selected?.name}<Typography color="text.secondary" fontSize={12}>{selected?.id} · Inquiry details</Typography></DialogTitle><DialogContent dividers>{selected && <Stack spacing={2}><Stack direction="row" spacing={1}><StatusPill tone="purple">New inquiry</StatusPill><StatusPill tone={sourceTone[selected.source]}>{selected.source}</StatusPill><StatusPill tone="warning">Follow-up due</StatusPill></Stack><Box sx={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:2}}>{[['Sport',selected.sport],['Centre',selected.centre],['Age group',`Age ${selected.age}`],['Assigned to','Akmal Rafeek'],['Parent','Hala Ali'],['Mobile','+971 50 123 4567']].map(([k,v])=><Box key={k}><Typography fontSize={11} color="text.secondary">{k}</Typography><Typography fontSize={13} fontWeight={650}>{v}</Typography></Box>)}</Box><Box p={2} bgcolor="#F4F5FA" borderRadius={3}><Typography fontSize={10} color="text.secondary" fontWeight={750}>FOLLOW-UP NOTES</Typography><Typography fontSize={12} mt={1}>Parent prefers Saturday evening. Asked about sibling discount and transport.</Typography></Box><Typography fontSize={12} fontWeight={700}>ACTIVITY</Typography><Typography fontSize={12} color="text.secondary">Inquiry created · Auto-confirmation sent · Assigned to Akmal Rafeek</Typography></Stack>}</DialogContent><DialogActions><Button onClick={()=>setSelected(null)}>Close</Button><Button variant="contained" disabled>Connect inquiry API</Button></DialogActions></Dialog>
  </Box>
}
