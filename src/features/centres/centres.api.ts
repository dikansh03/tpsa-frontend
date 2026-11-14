import { apiClient } from '../../shared/api/apiClient'
export interface Centre { id: number; name: string; emirate: string; address: string | null; active: boolean }
export interface CentreRequest { name: string; emirate: string; address: string; active: boolean }
export const centresApi = {
  list: async () => (await apiClient.get<Centre[]>('/centres')).data,
  create: async (payload: CentreRequest) => (await apiClient.post<Centre>('/centres', payload)).data,
  update: async (id: number, payload: CentreRequest) => (await apiClient.put<Centre>(`/centres/${id}`, payload)).data,
}
