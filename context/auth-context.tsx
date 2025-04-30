"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { mockUsers } from "@/data/mock-data"
import type { User } from "@/types"

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  register: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const user = mockUsers.find((u) => u.username === username && u.password === password)

    if (user) {
      const { password, ...userWithoutPassword } = user
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const register = (username: string, password: string): boolean => {
    // Check if username already exists
    const userExists = mockUsers.some((u) => u.username === username)
    if (userExists) {
      return false
    }

    // In a real app, we would send this to an API
    // For this mock app, we'll just pretend it worked
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      password,
    }

    mockUsers.push(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
