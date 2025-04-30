"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Film, User, Menu, X } from "lucide-react"

export default function Header() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <Film className="h-6 w-6" />
            <span>MovieCatalog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/"
                  ? "text-primary"
                  : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
              }`}
            >
              Home
            </Link>
            {user ? (
              <Link href="/profile">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/" ? "bg-gray-100 dark:bg-gray-800 text-primary" : "text-gray-700 dark:text-gray-200"
                }`}
              >
                Home
              </Link>
              {user ? (
                <Link
                  href="/profile"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/profile"
                      ? "bg-gray-100 dark:bg-gray-800 text-primary"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  Profile
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/login"
                        ? "bg-gray-100 dark:bg-gray-800 text-primary"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      pathname === "/register"
                        ? "bg-gray-100 dark:bg-gray-800 text-primary"
                        : "text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
