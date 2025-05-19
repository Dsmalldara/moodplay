"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/lib/components/ui/button"
import { Card } from "@/lib/components/ui/card"
import { ArrowRight, PlusCircle, TrendingUp } from "lucide-react"
import MoodPlayLogo from "../Logo/LogoHeader"


const MOOD_PRESETS = [
  {
    id: "breakup",
    title: "Breakup Recovery",
    description: "From heartbreak to healing, a journey through emotions",
    color: "from-pink-600 to-purple-700",
    category: "Emotional",
    tracks: 24,
    trending: true,
  },
  {
    id: "focus",
    title: "Focus Flow",
    description: "Concentration-enhancing tracks for deep work",
    color: "from-blue-600 to-cyan-600",
    category: "Productivity",
    tracks: 18,
  },
  {
    id: "sunset",
    title: "Sunset Joy",
    description: "Uplifting vibes for golden hour relaxation",
    color: "from-orange-500 to-amber-600",
    category: "Relaxation",
    tracks: 15,
  },
  {
    id: "workout",
    title: "Workout Energy",
    description: "High-energy beats to power through any exercise",
    color: "from-green-500 to-emerald-600",
    category: "Fitness",
    tracks: 22,
    trending: true,
  },
  {
    id: "chill",
    title: "Chill Evening",
    description: "Mellow tunes for unwinding after a long day",
    color: "from-indigo-600 to-violet-700",
    category: "Relaxation",
    tracks: 20,
  },
  {
    id: "morning",
    title: "Morning Motivation",
    description: "Start your day with positive energy",
    color: "from-yellow-500 to-orange-600",
    category: "Productivity",
    tracks: 16,
  },
  {
    id: "travel",
    title: "Road Trip Vibes",
    description: "The perfect soundtrack for your journey",
    color: "from-blue-500 to-indigo-600",
    category: "Travel",
    tracks: 25,
  },
  {
    id: "party",
    title: "House Party Mix",
    description: "Get the party started with these upbeat tracks",
    color: "from-fuchsia-500 to-pink-600",
    category: "Social",
    tracks: 28,
    trending: true,
  },
]

const CATEGORIES = ["All", "Emotional", "Productivity", "Relaxation", "Fitness", "Travel", "Social"]

export default function PresetsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredPresets = selectedCategory === "All" 
    ? MOOD_PRESETS 
    : MOOD_PRESETS.filter(preset => preset.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      {/* Sticky header with blur effect when scrolled */}
      <header className={`sticky top-0 z-10 transition-all duration-300 ${
        isScrolled ? "bg-gray-900/80 backdrop-blur-lg shadow-lg" : ""
      }`}>
        <div className="container max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          
            <MoodPlayLogo width={140} linkToHome={true}/>
      
          
          <Link href="/mood">
            <Button className="rounded-full bg-gradient-to-r from-[#D16BA5] via-[#86A8E7] to-[#5FFBF1] hover:opacity-90 text-white">
              Create Custom <PlusCircle className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Hero section */}
          <section className="space-y-4">
            <h1 className="text-4xl font-bold text-white">Mood Presets</h1>
            <p className="text-gray-300 max-w-lg">
              Jump into curated playlists designed for specific emotional states and activities, 
              or create your own custom mood-based experience.
              Updated every week
            </p>
          </section>

          {/* Category filters */}
          <section className="flex flex-wrap gap-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all 
                  ${selectedCategory === category 
                    ? "bg-white/10 text-white" 
                    : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"}`}
              >
                {category}
              </button>
            ))}
          </section>

          {/* Preset cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPresets.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </section>
        </div>
      </main>
    </div>
  )
}

function PresetCard({ preset }: { preset: (typeof MOOD_PRESETS)[0] }) {
  return (
    <Link href={`/mood/${preset.id}`} className="block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:translate-y-[-4px] bg-gray-800/40 border-gray-700/30 hover:border-gray-600/50 hover:shadow-xl hover:shadow-[#86A8E7]/5">
        {/* Card header with gradient */}
        <div className={`h-2 bg-gradient-to-r ${preset.color}`}></div>
        
        <div className="p-6 space-y-4">
          {/* Category and trending badge */}
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider text-gray-400">
              {preset.category}
            </span>
            {preset.trending && (
              <div className="flex items-center gap-1 text-xs bg-white/10 text-white px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                <span>Trending</span>
              </div>
            )}
          </div>
          
          {/* Title and description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-xl text-white">{preset.title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{preset.description}</p>
          </div>
          
          {/* Track count and play button */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-sm text-gray-400">{preset.tracks} tracks</span>
            <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/5 text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}