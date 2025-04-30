"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg mx-auto mb-8 relative">
      <Input
        type="text"
        placeholder="Search for movies by title or genre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-12"
      />
      <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full px-3">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search now</span>
      </Button>
    </form>
  )
}
