import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from './auth.api'
import type { AuthUser, LoginRequest } from './auth.types'
import { AuthContext, type AuthContextValue } from './auth.context'
import { getRefreshToken, setAccessToken, setRefreshToken } from '../../shared/api/apiClient'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadSession = useCallback(async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) { setIsLoading(false); return }
    try {
      const refreshed = await authApi.refresh(refreshToken)
      setAccessToken(refreshed.accessToken)
      setRefreshToken(refreshed.refreshToken)
      const current = await authApi.me()
      setUser({ userId: current.userId, fullName: refreshed.fullName, userType: current.userType, permissions: current.permissions || [] })
    } catch {
      setAccessToken(null)
      setRefreshToken(null)
      setUser(null)
    } finally { setIsLoading(false) }
  }, [])

  // This one-time bootstrap restores a previously issued refresh token into React state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void loadSession() }, [loadSession])

  const login = useCallback(async (payload: LoginRequest) => {
    const response = await authApi.login(payload)
    setAccessToken(response.accessToken)
    setRefreshToken(response.refreshToken)
    try {
      const current = await authApi.me()
      setUser({ userId: current.userId, fullName: response.fullName, userType: current.userType, permissions: current.permissions || [] })
    } catch (error) {
      setAccessToken(null)
      setRefreshToken(null)
      throw error
    }
  }, [])

  const logout = useCallback(async () => {
    const token = getRefreshToken()
    try { if (token) await authApi.logout(token) } finally {
      setAccessToken(null)
      setRefreshToken(null)
      setUser(null)
    }
  }, [])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
    hasPermission: (permission: string) => user?.permissions.includes(permission) ?? false,
  }), [user, isLoading, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

