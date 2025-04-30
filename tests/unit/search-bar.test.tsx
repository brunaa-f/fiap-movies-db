import SearchBar from "@/components/search-bar";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, vi, it } from "vitest";

describe("Componente search-bar", () => {
    it("deve ser renderizado no documento", () => {
        const mockOnSearch = vi.fn();

        render(<SearchBar onSearch={mockOnSearch} />);

        const searchInput = screen.getByPlaceholderText("Search for movies by title or genre...");

        expect(searchInput).toBeInTheDocument();
    })
})