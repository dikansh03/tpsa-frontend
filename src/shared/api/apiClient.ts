import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
let accessToken: string | null = null
let refreshPromise: Promise<string | null> | null = null

export const setAccessToken = (token: string | null) => { accessToken = token }
export const getRefreshToken = () => sessionStorage.getItem('tpsa.refreshToken')
export const setRefreshToken = (token: string | null) => {
  if (token) sessionStorage.setItem('tpsa.refreshToken', token)
  else sessionStorage.removeItem('tpsa.refreshToken')
}

export const apiClient = axios.create({ baseURL, timeout: 15_000, headers: { 'Content-Type': 'application/json' } })

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const requestUrl = original?.url || ''
    if (error.response?.status !== 401 || !original || original._retry || requestUrl.startsWith('/auth/')) {
      return Promise.reject(error)
    }
    const refreshToken = getRefreshToken()
    if (!refreshToken) return Promise.reject(error)
    original._retry = true

    if (!refreshPromise) {
      refreshPromise = axios.post(`${baseURL}/auth/refresh`, { refreshToken }, { timeout: 15_000 })
        .then(response => {
          const token = String(response.data.accessToken)
          setAccessToken(token)
          setRefreshToken(String(response.data.refreshToken))
          return token
        })
        .catch(() => {
          setAccessToken(null)
          setRefreshToken(null)
          return null
        })
        .finally(() => { refreshPromise = null })
    }

    const newToken = await refreshPromise
    if (!newToken) return Promise.reject(error)
    original.headers.Authorization = `Bearer ${newToken}`
    return apiClient(original)
  },
)

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { detail?: string; message?: string } | undefined
    return data?.detail || data?.message || error.message || 'Something went wrong. Please try again.'
  }
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.'
}
