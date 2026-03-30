// src/types/auth.types.ts
export type Role = 'seeker' | 'employer' | 'admin'

export interface User {
  _id: string
  name: string
  email: string
  role: Role
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  role: Role | null
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: Role
}

export interface AuthResponse {
  user: User
  token: string
  message: string
}