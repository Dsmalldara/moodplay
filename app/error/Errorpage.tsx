"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/lib/components/ui/button"
import { AlertTriangle, Music, ArrowLeft } from "lucide-react"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") || "unknown_error"

  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    state_mismatch: "Authentication failed due to a state mismatch. This could be a security issue.",
    token_exchange_failed: "Failed to exchange authorization code for access token.",
    access_denied: "You denied access to your Spotify account.",
    invalid_token: "Your authentication token is invalid or expired.",
    unknown_error: "An unknown error occurred during authentication.",
  }

  const errorMessage = errorMessages[error] || errorMessages.unknown_error

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md mood-card p-8 rounded-xl text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
        <p className="text-gray-300 mb-6">{errorMessage}</p>

        <div className="flex flex-col gap-4">
          <Link href="/login">
            <Button className="w-full mood-gradient-primary">Try Again</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/5">
              <ArrowLeft className="mr-2 h-4 w-4" /> <div className="text-center  justify-center flex">Back to Home</div>
            </Button>
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Music className="h-5 w-5 text-purple-500" />
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            MoodPlay
          </span>
        </div>
      </div>
    </div>
  )
}
