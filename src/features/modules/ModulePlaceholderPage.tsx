import { Card, CardContent } from '@mui/material'
import { Box, Typography } from '../../shared/components/ui'
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded'
import { PageTitle } from '../../shared/components/PageTitle'
export function ModulePlaceholderPage({ title, description }: { title: string; description: string }) {
  return <Box><PageTitle title={title} subtitle={description} /><Card><CardContent sx={{ py:8,textAlign:'center' }}><ConstructionRoundedIcon sx={{fontSize:42,color:'#5B4CF6',mb:1.5}}/><Typography fontWeight={750}>Module foundation</Typography><Typography color="text.secondary" fontSize={13} maxWidth={460} mx="auto" mt={0.7}>This route is reserved in the application structure. The feature will be implemented against its backend API when that sprint is ready.</Typography></CardContent></Card></Box>
}
