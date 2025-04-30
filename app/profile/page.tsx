"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useFavorites } from "@/context/favorites-context"
import { mockMovies } from "@/data/mock-data"
import type { Movie } from "@/types"
import MovieGrid from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { favorites } = useFavorites()
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Filter movies to get only favorites
    const userFavorites = mockMovies.filter((movie) => favorites.includes(movie.id))
    setFavoriteMovies(userFavorites)
  }, [user, favorites, router])

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back, {user.username}!</p>
        </div>
        <Button variant="outline" onClick={logout} className="flex gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Favorites</h2>
        {favoriteMovies.length === 0 ? (
          <div className="text-center py-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <h3 className="text-xl font-medium">No favorites yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Start adding movies to your favorites to see them here
            </p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Browse Movies
            </Button>
          </div>
        ) : (
          <MovieGrid movies={favoriteMovies} />
        )}
      </div>
    </div>
  )
}
