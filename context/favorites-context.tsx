"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "./auth-context"

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (movieId: string) => void
  removeFavorite: (movieId: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])
  const { user } = useAuth()

  // Load favorites from localStorage when user changes
  useEffect(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites-${user.id}`)
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites))
        } catch (error) {
          console.error("Failed to parse stored favorites:", error)
          localStorage.removeItem(`favorites-${user.id}`)
        }
      }
    } else {
      setFavorites([])
    }
  }, [user])

  const addFavorite = (movieId: string) => {
    if (!user) return

    setFavorites((prev) => {
      const newFavorites = [...prev, movieId]
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (movieId: string) => {
    if (!user) return

    setFavorites((prev) => {
      const newFavorites = prev.filter((id) => id !== movieId)
      localStorage.setItem(`favorites-${user.id}`, JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
