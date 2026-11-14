import { useState } from 'react'
import { Alert, Button, Card, CardContent, InputAdornment, TextField } from '@mui/material'
import { Box, Stack, Typography } from '../../shared/components/ui'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import { getApiErrorMessage } from '../../shared/api/apiClient'

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(1, 'Password is required') })
type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } })
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const onSubmit = handleSubmit(async values => {
    setServerError('')
    setSubmitting(true)
    try {
      await login(values)
      const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(from || '/dashboard', { replace: true })
    } catch (error) { setServerError(getApiErrorMessage(error)) }
    finally { setSubmitting(false) }
  })

  return (
    <Box minHeight="100vh" display="grid" sx={{ gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, backgroundColor: '#F4F5FA' }}>
      <Box display="flex" alignItems="center" justifyContent="center" p={{ xs: 3, md: 7 }}>
        <Box width="100%" maxWidth={440}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={6}>
            <Box sx={{ width: 44, height: 44, borderRadius: '14px', bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center' }}><BoltRoundedIcon /></Box>
            <Box><Typography fontWeight={800} fontSize={18}>Titan Pro</Typography><Typography color="text.secondary" fontSize={12}>Sports Academy</Typography></Box>
          </Stack>
          <Typography variant="h4" mb={1}>Welcome back</Typography>
          <Typography color="text.secondary" mb={4}>Sign in to manage your academy.</Typography>
          <Card><CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack component="form" onSubmit={onSubmit} spacing={2.5}>
              {serverError && <Alert severity="error">{serverError}</Alert>}
              <Box><Typography fontSize={13} fontWeight={650} mb={0.8}>Email address</Typography><TextField fullWidth placeholder="you@titanpro.ae" autoComplete="username" {...register('email')} error={Boolean(errors.email)} helperText={errors.email?.message} slotProps={{ input: { startAdornment: <InputAdornment position="start"><MailOutlineRoundedIcon color="action" fontSize="small" /></InputAdornment> } }} /></Box>
              <Box><Typography fontSize={13} fontWeight={650} mb={0.8}>Password</Typography><TextField fullWidth type="password" placeholder="Enter your password" autoComplete="current-password" {...register('password')} error={Boolean(errors.password)} helperText={errors.password?.message} slotProps={{ input: { startAdornment: <InputAdornment position="start"><LockOutlinedIcon color="action" fontSize="small" /></InputAdornment> } }} /></Box>
              <Button type="submit" variant="contained" size="large" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</Button>
            </Stack>
          </CardContent></Card>
          {import.meta.env.DEV && <Typography textAlign="center" mt={3} fontSize={13} color="text.secondary">UI review? <RouterLink to="/preview/dashboard" style={{ color: '#5B4CF6', fontWeight: 700 }}>Open dashboard preview</RouterLink></Typography>}
          <Typography textAlign="center" mt={6} color="text.secondary" fontSize={12}>© {new Date().getFullYear()} Titan Pro Sports Academy</Typography>
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', p: 6, color: 'white', background: 'radial-gradient(circle at 75% 20%, #8478FF 0, transparent 32%), linear-gradient(140deg, #14152F, #5143E8 78%, #685AFF)' }}>
        <Box maxWidth={500}><Typography variant="h2" fontWeight={800} lineHeight={1.05} letterSpacing="-0.05em">Train like a Titan.<br/>Grow like a champion.</Typography><Typography mt={3} color="rgba(255,255,255,.78)" fontSize={16} lineHeight={1.7}>One connected workspace for registrations, academy operations and every athlete's progress.</Typography><Stack direction="row" spacing={1} mt={5}>{['Football', 'Swimming', 'Basketball'].map(item => <Box key={item} px={2} py={1} border="1px solid rgba(255,255,255,.24)" borderRadius={99} fontSize={13}>{item}</Box>)}</Stack></Box>
      </Box>
    </Box>
  )
}
