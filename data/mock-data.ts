import type { Movie, User, Comment } from "@/types"

// Mock Movies Data
export const mockMovies: Movie[] = [
  {
    id: "movie-1",
    title: "Inception",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    year: 2010,
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Inception",
    trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
  },
  {
    id: "movie-2",
    title: "The Shawshank Redemption",
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    year: 1994,
    genre: ["Drama", "Crime"],
    rating: 9.3,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Shawshank",
    trailerUrl: "https://www.youtube.com/embed/6hB3S9bIaco",
  },
  {
    id: "movie-3",
    title: "The Dark Knight",
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Dark+Knight",
    trailerUrl: "https://www.youtube.com/embed/EXeTwQWrcwY",
  },
  {
    id: "movie-4",
    title: "Pulp Fiction",
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    year: 1994,
    genre: ["Crime", "Drama"],
    rating: 8.9,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Pulp+Fiction",
    trailerUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY",
  },
  {
    id: "movie-5",
    title: "The Lord of the Rings: The Return of the King",
    synopsis:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    year: 2003,
    genre: ["Adventure", "Drama", "Fantasy"],
    rating: 8.9,
    posterUrl: "/placeholder.svg?height=450&width=300&text=LOTR",
    trailerUrl: "https://www.youtube.com/embed/r5X-hFf6Bwo",
  },
  {
    id: "movie-6",
    title: "Forrest Gump",
    synopsis:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    year: 1994,
    genre: ["Drama", "Romance"],
    rating: 8.8,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Forrest+Gump",
    trailerUrl: "https://www.youtube.com/embed/bLvqoHBptjg",
  },
  {
    id: "movie-7",
    title: "The Matrix",
    synopsis:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    rating: 8.7,
    posterUrl: "/placeholder.svg?height=450&width=300&text=The+Matrix",
    trailerUrl: "https://www.youtube.com/embed/vKQi3bBA1y8",
  },
  {
    id: "movie-8",
    title: "Goodfellas",
    synopsis:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    rating: 8.7,
    posterUrl: "/placeholder.svg?height=450&width=300&text=Goodfellas",
    trailerUrl: "https://www.youtube.com/embed/qo5jJpHtI1Y",
  },
]

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: "user-1",
    username: "johndoe",
    password: "password123",
  },
  {
    id: "user-2",
    username: "janedoe",
    password: "password123",
  },
]

// Mock Comments Data
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    movieId: "movie-1",
    userId: "user-1",
    username: "johndoe",
    text: "One of the best movies I've ever seen. The concept is mind-blowing!",
    date: "2023-01-15T12:30:00Z",
  },
  {
    id: "comment-2",
    movieId: "movie-1",
    userId: "user-2",
    username: "janedoe",
    text: "The visual effects are amazing. Christopher Nolan is a genius!",
    date: "2023-02-20T15:45:00Z",
  },
  {
    id: "comment-3",
    movieId: "movie-3",
    userId: "user-1",
    username: "johndoe",
    text: "Heath Ledger's performance as the Joker is legendary.",
    date: "2023-03-10T09:15:00Z",
  },
]
