"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Music } from "lucide-react"

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate loading time - in a real app this would be an actual API call
    const timer = setTimeout(() => {
      router.push("/playlist")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen px-4 mx-auto">
      <div className="text-center space-y-6">
        <div className="relative">
          <Music className="h-16 w-16 text-[oklch(0.6_0.24_296.88)] animate-pulse" />
          <div className="absolute -inset-4 rounded-full border-4 border-t-[oklch(0.6_0.24_296.88)] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute -inset-8 rounded-full border-4 border-t-[oklch(0.7_0.25_0)] border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-500"></div>
        </div>

        <h2 className="text-2xl font-semibold mt-8">Tuning into your vibe…</h2>

        <p className="text-gray-600 max-w-md">
          Our AI is crafting the perfect playlist to match your mood. This will just take a moment.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[oklch(0.6_0.24_296.88)] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[oklch(0.65_0.2_296.88)] rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-3 h-3 bg-[oklch(0.7_0.15_296.88)] rounded-full animate-bounce animation-delay-400"></div>
            </div>
            <p className="text-sm text-gray-500">Analyzing emotions...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
