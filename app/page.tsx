/* eslint-disable react/no-unescaped-entities */
import type React from "react";
import Link from "next/link";
import { Button } from "@/lib/components/ui/button";
import {
  Sparkles,
  Heart,
  Disc,
  Headphones,
  AudioWaveformIcon as Waveform,
} from "lucide-react";
import LogoHeader from "./Logo/LogoHeader";
import { BiLogoSpotify } from "react-icons/bi";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background accents - only on landing page */}
      <div className="landing-accent w-[500px] h-[500px] top-[10%] left-[5%] bg-purple-600"></div>
      <div className="landing-accent w-[600px] h-[600px] bottom-[5%] right-[10%] bg-blue-600"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Logo header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <LogoHeader width={300} />
        </div>

        {/* Hero section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Turn feelings into playlists
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Express how you feel, and we'll create the perfect Spotify playlist
            to match or transform your mood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/mood">
              <Button
                size="lg"
                className="rounded-full mood-gradient-primary px-8 py-6 text-lg flex gap-2 "
              >
                Start Now <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <Link href="/presets">
             
                <Button
                  variant="outline"
                  size="lg"
                  className="flex justify-center items-center rounded-full  text-lg border-purple-500/30 text-purple-300 hover:bg-purple-900/20"
                >
                  Explore Presets
                </Button>
              </Link>
          </div>
        </div>

        {/* Music visualizer */}
        <div className="max-w-md mx-auto mb-16">
          <div className="visualizer-container">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="visualizer-bar"></div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <FeatureCard
            title="Express Yourself"
            description="Tell us how you feel in your own words"
            icon={<Waveform className="h-8 w-8 text-white" />}
            gradient="mood-gradient-melancholy"
          />
          <FeatureCard
            title="AI-Powered"
            description="Our AI understands your emotions and musical needs"
            icon={<Sparkles className="h-8 w-8 text-white" />}
            gradient="mood-gradient-hope"
          />
          <FeatureCard
            title="Spotify Integration"
            description="Listen to your custom playlist instantly"
            icon={<BiLogoSpotify className="h-8 w-8  text-green-500 " />}
            gradient="mood-gradient-energy"
          />
        </div>

        {/* Anchor tracks */}
        <div className="max-w-4xl mx-auto mb-16 mood-card p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 mood-gradient-calm rounded-full flex items-center justify-center shadow-md">
                <Disc className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                Anchor Tracks
              </h3>
              <p className="text-gray-300 mb-4">
                Add your favorite songs as "anchor tracks" and we'll create
                likeminded playlists based on them. Combine your mood
                description with specific tracks to get even more personalized
                results.
              </p>
              <div className="flex flex-wrap gap-2">
                <TrackPill
                  text="Adele - Someone Like You"
                  gradient="mood-gradient-melancholy"
                />
                <TrackPill
                  text="The Weeknd - Blinding Lights"
                  gradient="mood-gradient-energy"
                />
                <TrackPill
                  text="Billie Eilish - Happier Than Ever"
                  gradient="mood-gradient-hope"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8 text-white">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Describe Your Mood"
              description="Tell us how you're feeling or what vibe you're looking for"
              icon={<Headphones className="h-6 w-6 text-white" />}
              gradient="mood-gradient-melancholy"
            />
            <StepCard
              number="2"
              title="Add Anchor Tracks"
              description="Optionally add songs you love to guide the playlist creation"
              icon={<Disc className="h-6 w-6 text-white" />}
              gradient="mood-gradient-calm"
            />
            <StepCard
              number="3"
              title="Enjoy Your Playlist"
              description="Listen to your personalized playlist on Spotify"
              icon={<BiLogoSpotify />}
              className="text-green-500 text-3xl"
              gradient="mood-gradient-comfort"
            />
          </div>
        </div>

        {/* Mood examples */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-center mb-6 text-white">
            Mood Inspirations
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            <MoodPill gradient="mood-gradient-calm" text="Peaceful evening" />
            <MoodPill gradient="mood-gradient-comfort" text="Cozy rainy day" />
            <MoodPill
              gradient="mood-gradient-melancholy"
              text="Reflective & nostalgic"
            />
            <MoodPill gradient="mood-gradient-hope" text="Optimistic morning" />
            <MoodPill
              gradient="mood-gradient-energy"
              text="Workout motivation"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 flex items-center justify-center gap-1">
          Made with{" "}
          <Heart className="h-4 w-4 text-pink-500" fill="currentColor" /> by{" "}
          <a
            href="https://github.com/Dsmalldara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            @Dara
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="mood-card p-6 hover-lift">
      <div
        className={`mb-4 w-16 h-16 ${gradient} rounded-full flex items-center justify-center shadow-md`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
  gradient,
  className,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 rounded-full ${gradient} flex items-center justify-center mb-4 shadow-md`}
      >
        <span className="text-xl font-bold text-white">{number}</span>
      </div>
      <div className={`mb-2 ${className}`}>{icon}</div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function MoodPill({ gradient, text }: { gradient: string; text: string }) {
  return (
    <div
      className={`${gradient} text-white text-sm py-2 px-4 rounded-full text-center shadow-md hover-lift cursor-pointer`}
    >
      {text}
    </div>
  );
}

function TrackPill({ text, gradient }: { text: string; gradient: string }) {
  return (
    <div
      className={`${gradient} px-3 py-1 rounded-full text-sm text-white shadow-sm hover-lift cursor-pointer`}
    >
      {text}
    </div>
  );
}
