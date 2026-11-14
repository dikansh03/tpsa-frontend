import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { Box } from '../../shared/components/ui'
import { useAuth } from './useAuth'

export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <Box minHeight="100vh" display="grid" sx={{ placeItems: 'center' }}><CircularProgress /></Box>
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />
  return <Outlet />
}
