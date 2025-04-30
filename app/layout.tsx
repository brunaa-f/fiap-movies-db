import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { FavoritesProvider } from "@/context/favorites-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Movie Catalog",
  description: "A simple movie catalog application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="grow container mx-auto px-4 py-8">{children}</main>
              <Footer />
            </div>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'