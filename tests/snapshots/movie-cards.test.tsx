import MovieCard from "@/components/movie-card";
import { AuthProvider } from "@/context/auth-context";
import { FavoritesProvider } from "@/context/favorites-context";
import { Movie } from "@/types";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

const movieMock: Movie = {
  id: "movie-1",
  title: "Inception",
  synopsis: "A thief who steals corporate secrets.",
  year: 2010,
  genre: ["Sci-Fi", "Action"],
  rating: 8.8,
  posterUrl: "/placeholder.svg?height=450&width=300&text=Inception",
  trailerUrl: "https://www.youtube.com/embed/YoHD9XEInc0",
};

describe("Snapshots do componente movie-card", () => {
    it("deve corresponder ao snapshot", () => {
        const { container } = render(
            <AuthProvider>
                <FavoritesProvider>
                    <MovieCard movie={movieMock} />
                </FavoritesProvider>
            </AuthProvider>
        );

        expect(container).toMatchSnapshot();
    })
})