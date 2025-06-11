/* eslint-disable react/no-unescaped-entities */

import { getSpotifyUserProfileServer, getUserPlaylistsServer } from "@/lib/auth-server"
import { Music, User, ListIcon as PlaylistIcon, Clock, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function DashboardPage() {
  // Fetch the user's profile server-side
  const userProfile = await getSpotifyUserProfileServer()

  // If failed to fetch profile, redirect to login
//   if (!userProfile) {
//     redirect("/login")
//   }

  // Fetch user's playlists server-side
  const playlists = await getUserPlaylistsServer(5)

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header with user info */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Music className="h-8 w-8 text-purple-500" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MoodPlay
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="mood-card p-2 px-4 rounded-full flex items-center gap-3">
              {userProfile?.images && userProfile.images[0] ? (
                <Image
                  src={userProfile.images[0].url || "/placeholder.svg"}
                  alt={userProfile.display_name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
              <span className="text-white font-medium">{userProfile?.display_name || "Spotify User"}</span>
            </div>
            <Link href="/api/logout">
              <button className="text-gray-400 hover:text-white">Logout</button>
            </Link>
          </div>
        </div>

        {/* Welcome section */}
        <div className="mood-card p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome to Your Dashboard</h2>
          <p className="text-gray-300 mb-6">
            Create personalized playlists based on your mood or explore our curated presets.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mood">
              <button className="px-6 py-3 rounded-full mood-gradient-primary text-white font-medium">
                Create New Playlist
              </button>
            </Link>
            <Link href="/presets">
              <button className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors">
                Explore Presets
              </button>
            </Link>
          </div>
        </div>

        {/* Dashboard sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Recent Playlists */}
          <div className="mood-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <PlaylistIcon className="h-5 w-5 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Your Spotify Playlists</h3>
            </div>
            <div className="space-y-4">
              {playlists && playlists.items && playlists.items.length > 0 ? (
                <div className="space-y-2">
                  {playlists.items.map((playlist) => (
                    <div key={playlist.id} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg">
                      {playlist.images && playlist.images[0] ? (
                        <Image
                          src={playlist.images[0].url || "/placeholder.svg"}
                          alt={playlist.name}
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-purple-900/50 rounded-md flex items-center justify-center">
                          <Music className="h-5 w-5 text-purple-300" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{playlist.name}</p>
                        <p className="text-gray-400 text-sm truncate">{playlist.tracks.total} tracks</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">
                  You don't have any Spotify playlists yet. Start by creating your first mood-based playlist!
                </p>
              )}
              <Link href="/mood">
                <button className="w-full py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  Create New Playlist
                </button>
              </Link>
            </div>
          </div>

          {/* Activity */}
          <div className="mood-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-400 text-center py-8">No recent activity to show.</p>
              <Link href="/settings">
                <button className="w-full py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors">
                  <Settings className="h-4 w-4 inline mr-2" />
                  Manage Settings
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-12">
          <p>
            Connected to Spotify as {userProfile?.display_name || "User"} • {userProfile?.email || ""}
          </p>
        </div>
      </div>
    </div>
  )
}
