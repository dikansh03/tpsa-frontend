import { apiClient } from '../../shared/api/apiClient'
import type { CurrentUserResponse, LoginRequest, LoginResponse } from './auth.types'

export const authApi = {
  login: async (payload: LoginRequest) => (await apiClient.post<LoginResponse>('/auth/login', payload)).data,
  refresh: async (refreshToken: string) => (await apiClient.post<LoginResponse>('/auth/refresh', { refreshToken })).data,
  logout: async (refreshToken: string) => apiClient.post('/auth/logout', { refreshToken }),
  me: async () => (await apiClient.get<CurrentUserResponse>('/users/me')).data,
}
