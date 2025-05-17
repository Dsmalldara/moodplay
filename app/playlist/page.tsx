"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Music, Share2, ExternalLink, Heart, SkipBack, Play, Pause, SkipForward, Volume2 } from "lucide-react"
import Image from "next/image"
import LogoHeader from "../Logo/LogoHeader"

// Mock data for the playlist
const MOCK_PLAYLIST = {
  title: "Empowered Melancholy",
  description:
    "A journey from sadness to strength, with tracks that acknowledge your feelings while lifting your spirits. Perfect for processing emotions and finding your inner power.",
  songs: [
    {
      id: 1,
      title: "Rise Up",
      artist: "Andra Day",
      album: "Cheers to the Fall",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:57",
    },
    {
      id: 2,
      title: "Fight Song",
      artist: "Rachel Platten",
      album: "Wildfire",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:24",
    },
    {
      id: 3,
      title: "Praying",
      artist: "Kesha",
      album: "Rainbow",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:50",
    },
    {
      id: 4,
      title: "Stronger",
      artist: "Kelly Clarkson",
      album: "Stronger",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:41",
    },
    {
      id: 5,
      title: "Brave",
      artist: "Sara Bareilles",
      album: "The Blessed Unrest",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:38",
    },
    {
      id: 6,
      title: "Roar",
      artist: "Katy Perry",
      album: "Prism",
      albumArt: "/placeholder.svg?height=80&width=80",
      duration: "3:43",
    },
  ],
}

export default function PlaylistResultPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongId, setCurrentSongId] = useState<number | null>(null)

  const togglePlay = (songId: number) => {
    if (currentSongId === songId && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentSongId(songId)
      setIsPlaying(true)
    }
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert("Sharing functionality would be implemented here!")
  }

  const handleOpenInSpotify = () => {
    // In a real app, this would open Spotify with the playlist
    window.open("https://open.spotify.com", "_blank")
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-12">
        <Music className="h-6 w-6 text-purple-500" />
          <LogoHeader width={300} />
      </Link>

      <div className="space-y-8">
        <div className="mood-card p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-48 h-48 mood-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <Music className="h-24 w-24 text-white" />
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">{MOCK_PLAYLIST.title}</h2>
              <p className="text-gray-300">{MOCK_PLAYLIST.description}</p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button
                  onClick={handleOpenInSpotify}
                  className="rounded-full bg-[#1DB954] hover:bg-[#1aa34a] text-white"
                >
                  Open in Spotify <ExternalLink className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="rounded-full border-white/10 text-white hover:bg-white/5"
                >
                  Share <Share2 className="ml-2 h-4 w-4" />
                </Button>

                <Link href="/mood">
                  <Button variant="ghost" className="rounded-full text-white hover:bg-white/5">
                    Create New
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Songs</h3>

          <div className="space-y-3">
            {MOCK_PLAYLIST.songs.map((song) => (
              <Card
                key={song.id}
                className="p-3 flex items-center gap-4 hover:bg-card/80 transition-colors bg-card/50 border-white/10"
              >
                <div className="relative">
                  <Image
                    src={song.albumArt || "/placeholder.svg"}
                    alt={`${song.album} cover`}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md opacity-0 hover:opacity-100 transition-opacity"
                    onClick={() => togglePlay(song.id)}
                  >
                    {currentSongId === song.id && isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white" />
                    )}
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate text-white">{song.title}</h4>
                  <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                </div>

                <div className="text-sm text-gray-400">{song.duration}</div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-400 hover:text-white hover:bg-white/5"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Music Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-white/10 shadow-md p-3 z-20">
        <div className="container max-w-3xl mx-auto flex items-center gap-4">
          <div className="flex items-center gap-2 flex-1">
            {currentSongId && (
              <>
                <Image
                  src={MOCK_PLAYLIST.songs.find((s) => s.id === currentSongId)?.albumArt || ""}
                  alt="Now playing"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <div className="min-w-0">
                  <h4 className="font-medium text-sm truncate text-white">
                    {MOCK_PLAYLIST.songs.find((s) => s.id === currentSongId)?.title}
                  </h4>
                  <p className="text-xs text-gray-400 truncate">
                    {MOCK_PLAYLIST.songs.find((s) => s.id === currentSongId)?.artist}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-400 hover:text-white hover:bg-white/5"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10 border-white/10 text-white hover:bg-white/5"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-gray-400 hover:text-white hover:bg-white/5"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <div className="w-24 h-1 bg-gray-700 rounded-full">
              <div className="w-1/2 h-full bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
