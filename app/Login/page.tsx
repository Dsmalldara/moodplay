"use client"

import { Button } from "@/lib/components/ui/button"

import LogoHeader from "@/app/Logo/LogoHeader"
import { useState } from "react"

export default function MinimalLoginPage() {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Main content - centered with flex-1 to push footer down */}
      <div className="flex-1 flex  items-center justify-center p-6">
        <div className=" w-full bg-[#2a1450] max-w-md backdrop-filter-md rounded-2xl shadow-lg p-8">

          <div className="mb-6">
            <div className="flex items-start gap-2 mb-4">
              <div className="rounded-full bg-[#1DB954] p-1 mt-0.5 flex-shrink-0">
                <svg className="h-2 w-2  text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-white">Create playlists on your Spotify account</span>
            </div>
          </div>
          <div className="text-center mb-8 flex flex-col items-center justify-center mx-auto my-auto">
              <LogoHeader width={300} />
           <SpotifyLoginButton/>
          </div>
        </div>
      </div>

      {/* Footer with Spotify branding - at the bottom */}
      <div className="h-16 bg-[#191414] w-full flex items-center justify-center">
        <p className="text-xs text-gray-400 flex items-center gap-1">
          Powered by
          <SpotifyLogo className="h-4 w-4 text-[#1DB954]" />
          <span className="text-white font-medium">Spotify</span>
        </p>
      </div>
    </div>
  )
}

function SpotifyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}


interface SpotifyLoginButtonProps {
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "default" | "outline" | "ghost"
}

 function SpotifyLoginButton({ className = "", size = "default", variant = "default" }: SpotifyLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // Redirect to our login API route
    window.location.href = "/api/login"
  }

  return (
    <Button
      className={`${className} ${variant === "default" ? "bg-[#1DB954] hover:bg-[#1aa34a] text-white" : ""} flex items-center justify-center gap-2 rounded-full`}
      size={size}
      variant={variant}
      onClick={handleLogin}
      disabled={isLoading}
    >
      <SpotifyLogo className="h-5 w-5" />
      <span>{isLoading ? "Connecting..." : "Continue with Spotify"}</span>
    </Button>
  )
}

