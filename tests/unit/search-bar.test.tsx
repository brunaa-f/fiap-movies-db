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

    it("chama a função onSearch quando o botão de busca é clicado"), () => {
        const mockOnSearch = vi.fn();

        render(<SearchBar onSearch={mockOnSearch} />);

        const searchInput = screen.getByPlaceholderText("Search for movies by title or genre...");

        const searchButton = screen.getByRole("button");

        fireEvent.change(searchInput, {target: {value : "Inception"}});
        fireEvent.click(searchButton);

        expect(searchInput).toBeInTheDocument();

        expect(mockOnSearch).toHaveBeenCalledWith("Inception");
    }
})