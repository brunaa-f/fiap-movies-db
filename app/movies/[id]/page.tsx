"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { mockMovies, mockComments } from "@/data/mock-data"
import type { Movie, Comment } from "@/types"
import { useAuth } from "@/context/auth-context"
import { useFavorites } from "@/context/favorites-context"
import Image from "next/image"
import { Star, Heart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import CommentSection from "@/components/comment-section"
import TrailerModal from "@/components/trailer-modal"
import { Badge } from "@/components/ui/badge"

export default function MovieDetailsPage() {
  const { id } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [showTrailer, setShowTrailer] = useState(false)
  const { user } = useAuth()
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    // Find the movie with the matching id
    const foundMovie = mockMovies.find((m) => m.id === id)
    if (foundMovie) {
      setMovie(foundMovie)
    }

    // Get comments for this movie
    const movieComments = mockComments.filter((c) => c.movieId === id)
    setComments(movieComments)
  }, [id])

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading movie details...</p>
      </div>
    )
  }

  const isFavorite = favorites.includes(movie.id)

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }
  }

  const handleAddComment = (text: string) => {
    if (!user) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      movieId: movie.id,
      userId: user.id,
      username: user.username,
      text,
      date: new Date().toISOString(),
    }

    setComments([...comments, newComment])
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative aspect-2/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
              priority
            />
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={() => setShowTrailer(true)} className="flex items-center justify-center gap-2">
              <Play size={16} />
              Watch Trailer
            </Button>
            <Button
              variant={isFavorite ? "destructive" : "outline"}
              onClick={toggleFavorite}
              className="flex items-center justify-center gap-2"
            >
              <Heart size={16} className={isFavorite ? "fill-white" : ""} />
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{movie.rating}/10</span>
            </div>
            <span className="text-gray-500">•</span>
            <span>{movie.year}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="outline">
                {genre}
              </Badge>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-700 dark:text-gray-300">{movie.synopsis}</p>
          </div>

          <div className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <CommentSection comments={comments} onAddComment={handleAddComment} />
          </div>
        </div>
      </div>

      {showTrailer && <TrailerModal trailerUrl={movie.trailerUrl} onClose={() => setShowTrailer(false)} />}
    </div>
  )
}
