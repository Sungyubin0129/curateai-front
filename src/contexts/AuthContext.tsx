// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { getToken, saveToken } from '../utils/auth'

interface AuthContextType {
  token: string | null
  login: (token: string) => void
  logout: () => void
  user: { sub: string } | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<{ sub: string } | null>(null)

  useEffect(() => {
    const t = getToken()
    if (t) {
      setToken(t)
      setUser(jwtDecode<{ sub: string }>(t))
    }
  }, [])

  const login = (t: string) => {
    saveToken(t)
    setToken(t)
    setUser(jwtDecode<{ sub: string }>(t))
  }

  const logout = () => {
    localStorage.removeItem('curateai_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}
