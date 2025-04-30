"use client"

import { useState } from "react"
import MovieGrid from "@/components/movie-grid"
import SearchBar from "@/components/search-bar"
import { mockMovies } from "@/data/mock-data"
import type { Movie } from "@/types"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(mockMovies)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredMovies(mockMovies)
      return
    }

    const filtered = mockMovies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.some((g) => g.toLowerCase().includes(query.toLowerCase())),
    )
    setFilteredMovies(filtered)
  }

  return (
    <div className="space-y-6">
      <section className="text-center py-10 bg-linear-to-r from-gray-800 to-gray-900 rounded-lg mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Movie Catalog</h1>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          Discover and explore your favorite movies. Search, save to favorites, and join the conversation.
        </p>
      </section>

      <SearchBar onSearch={handleSearch} />

      {filteredMovies.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold">No movies found for &quot;{searchQuery}&quot;</h2>
          <p className="text-gray-500 mt-2">Try searching with a different term</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Popular Movies"}
          </h2>
          <MovieGrid movies={filteredMovies} />
        </>
      )}
    </div>
  )
}
