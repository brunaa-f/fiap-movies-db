"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Heart, Star } from "lucide-react"
import type { Movie } from "@/types"
import { useFavorites } from "@/context/favorites-context"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.includes(movie.id)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie.id)
    }
  }

  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-lg">
        <div className="relative aspect-2/3">
          <Image
            src={movie.posterUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5"
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
          <div className="flex items-center mt-1 mb-2">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm">{movie.rating}/10</span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{movie.year}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{movie.synopsis}</p>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="outline" className="text-xs">
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{movie.genre.length - 2}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
