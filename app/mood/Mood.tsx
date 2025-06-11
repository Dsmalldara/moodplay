/* eslint-disable react/no-unescaped-entities */
"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/lib/components/ui/button"
import { Textarea } from "@/lib/components/ui/textarea"
import { Badge } from "@/lib/components/ui/badge"
import { Music, Wand2, ArrowLeft, PlusCircle, X, Sparkles } from "lucide-react"
import MoodPlayLogo from "../Logo/LogoHeader"


const MOOD_SUGGESTIONS = [
  "Stressed but hopeful",
  "Lost in love",
  "Ready to vibe",
  "Nostalgic for childhood",
  "Motivated to conquer",
  "Calm and reflective",
  "Excited for the weekend",
]

export default function MoodInputPage() {
  const [moodInput, setMoodInput] = useState("")
  const [anchorSongs, setAnchorSongs] = useState<string[]>([])
  const [newAnchorSong, setNewAnchorSong] = useState("")
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [isAiThinking, setIsAiThinking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleGeneratePlaylist = () => {
    if (moodInput.trim()) {
      // In a real app, we would send this to an API
      router.push("/loading")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setMoodInput(suggestion)
  }
  
  const handleAddAnchorSong = () => {
    if (newAnchorSong.trim() && !anchorSongs.includes(newAnchorSong.trim())) {
      setAnchorSongs([...anchorSongs, newAnchorSong.trim()])
      setNewAnchorSong("")
      
      // Simulate AI response after adding a song (in a real app this would be an API call)
      if (anchorSongs.length === 0) {
        setIsAiThinking(true)
        setTimeout(() => {
          setAiResponse("Great choice! Adding anchor songs helps me understand your musical taste better. Would you like to add more or should I focus on your mood description?")
          setIsAiThinking(false)
        }, 1500)
      }
    }
    
    // Focus back on input after adding
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
 
  const handleRemoveAnchorSong = (song: string) => {
    setAnchorSongs(anchorSongs.filter(s => s !== song))
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddAnchorSong()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center px-4 py-8">
      {/* Header with logo */}
      <div className="w-full max-w-md mb-10 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-400 text-sm">Back</span>
        </Link>
        <MoodPlayLogo width={130}  />
      </div>
      
      <div className="w-full max-w-md space-y-10">
        {/* Main input container */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400">
            How are you feeling today?
          </h1>
          
          <p className="text-gray-300 text-center">
            Describe your current mood or the vibe you're looking for, and we'll create the perfect playlist.
          </p>
          
          <Textarea
            value={moodInput}
            onChange={(e) => setMoodInput(e.target.value)}
            placeholder="I'm feeling..."
            className="bg-gray-800/50 border-gray-700 rounded-xl h-24 text-white placeholder:text-gray-500 focus-visible:ring-purple-500 resize-none"
          />
          
          {/* Anchor songs section */}
          <div className="space-y-3 bg-gray-800/30 p-4 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-sm font-medium flex items-center">
                <Music className="h-4 w-4 mr-2 text-purple-400" />
                Anchor Songs (Optional)
              </h3>
              <span className="text-xs text-gray-400">
                {anchorSongs.length}/5
              </span>
            </div>
            
            <div className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={newAnchorSong}
                onChange={(e) => setNewAnchorSong(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a song you love..."
                className="flex-1 text-sm bg-gray-800/50 border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus-visible:ring-purple-500 h-9 px-3"
                disabled={anchorSongs.length >= 5}
              />
              <Button 
                size="sm" 
                variant="ghost"
                disabled={!newAnchorSong.trim() || anchorSongs.length >= 5}
                onClick={handleAddAnchorSong}
                className="h-9 px-3 text-purple-400 hover:text-purple-300 hover:bg-purple-950/30"
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            
            {anchorSongs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {anchorSongs.map(song => (
                  <Badge 
                    key={song} 
                    className="bg-purple-900/40 text-purple-200 hover:bg-purple-900/60 pl-3 pr-2 py-1.5"
                  >
                    {song}
                    <button 
                      onClick={() => handleRemoveAnchorSong(song)}
                      className="ml-1 hover:text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* AI response/feedback */}
          {(aiResponse || isAiThinking) && (
            <div className="bg-gray-800/20 border border-purple-900/30 rounded-xl p-4 flex gap-3 items-start">
              <div className="bg-purple-500/20 p-1.5 rounded-full mt-0.5">
                <Sparkles className="h-4 w-4 text-purple-300" />
              </div>
              <div className="flex-1">
                {isAiThinking ? (
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 bg-purple-400/40 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                    <span className="h-2 w-2 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">{aiResponse}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Generate button */}
          <Button
            onClick={handleGeneratePlaylist}
            className="w-full rounded-xl py-6 font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-blue-500 hover:from-purple-500 hover:via-pink-500 hover:to-blue-400 transition-all"
            disabled={!moodInput.trim()}
          >
            Generate Playlist <Wand2 className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Mood suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-gray-400 text-center">Or try one of these:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {MOOD_SUGGESTIONS.map((suggestion) => (
              <Badge
                key={suggestion}
                variant="outline"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-white/5 transition-colors rounded-full text-gray-300 border-white/10"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}