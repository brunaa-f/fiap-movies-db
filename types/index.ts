// Movie Types
export interface Movie {
  id: string
  title: string
  synopsis: string
  year: number
  genre: string[]
  rating: number
  posterUrl: string
  trailerUrl: string
}

// User Types
export interface User {
  id: string
  username: string
  password?: string
}

// Comment Types
export interface Comment {
  id: string
  movieId: string
  userId: string
  username: string
  text: string
  date: string
}
