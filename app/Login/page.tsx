import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Music, ArrowRight } from "lucide-react"

export default function SpotifyLoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top gradient decoration */}
      <div className="h-16 bg-gradient-to-r from-[oklch(0.6_0.24_296.88)] to-[oklch(0.7_0.25_0)]"></div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <Music className="h-8 w-8 text-[oklch(0.6_0.24_296.88)]" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[oklch(0.6_0.24_296.88)] to-[oklch(0.7_0.25_0)] bg-clip-text text-transparent">
                MoodPlay
              </h1>
            </Link>
            <p className="text-gray-600">Turn feelings into playlists</p>
          </div>

          {/* Login card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-3">Connect with Spotify</h2>
              <p className="text-gray-600">
                Log in with your Spotify account to create personalized playlists based on your mood.
              </p>
            </div>

            {/* Spotify login button */}
            <Button
              className="w-full py-6 rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-white flex items-center justify-center gap-3 mb-6"
              size="lg"
            >
              <SpotifyLogo className="h-6 w-6" />
              <span className="font-medium">Continue with Spotify</span>
            </Button>

            {/* Permissions info */}
            <div className="space-y-3 text-sm text-gray-500">
              <p className="text-center">MoodPlay will request permission to:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#1DB954] p-1 mt-0.5">
                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Access your Spotify profile information</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#1DB954] p-1 mt-0.5">
                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Create playlists on your Spotify account</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-[#1DB954] p-1 mt-0.5">
                    <svg className="h-2 w-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>View your Spotify listening history</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Alternative option */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">Want to explore first?</p>
            <Link href="/presets">
              <Button variant="outline" className="rounded-full">
                Browse Preset Moods <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Music wave decoration */}
      <div className="h-24 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 26.625C960 35.5 1056 71 1152 80C1248 89 1344 71 1392 62.125L1440 53.25V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1DB954" />
              <stop offset="1" stopColor="oklch(0.6 0.24 296.88)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

// Spotify logo component
function SpotifyLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}
