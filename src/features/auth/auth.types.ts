export type UserType = 'STAFF' | 'COACH' | 'PARENT'
export interface LoginRequest { email: string; password: string }
export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
  fullName: string
  userType: UserType
}
export interface CurrentUserResponse { userId: string; userType: UserType; permissions: string[] }
export interface AuthUser { userId: string; fullName: string; userType: UserType; permissions: string[] }
