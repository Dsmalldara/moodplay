import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MoodPlay - Turn Feelings into Playlists",
  description: "Create emotionally-personalized Spotify playlists using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0118] text-white min-h-screen`}>
        <div className="fixed inset-0 bg-gradient-to-b from-[#0A0118] to-[#150B30] z-[-2]"></div>
        <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-[0.03] z-[-1]"></div>
        <main>{children}</main>
      </body>
    </html>
  )
}
