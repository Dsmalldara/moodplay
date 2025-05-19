"use client"

import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<
    Array<{ id: number; size: number; left: string; animationDuration: string }>
  >([])

  useEffect(() => {
    // Create initial particles
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 30) + 10, // 10-40px
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDuration: `${Math.floor(Math.random() * 10) + 8}s`, // 8-18s
    }))

    setParticles(initialParticles)

    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle = {
          id: Date.now(),
          size: Math.floor(Math.random() * 30) + 10,
          left: `${Math.floor(Math.random() * 100)}%`,
          animationDuration: `${Math.floor(Math.random() * 10) + 8}s`,
        }

        // Keep only the last 20 particles to avoid performance issues
        const updatedParticles = [...prev, newParticle]
        if (updatedParticles.length > 20) {
          return updatedParticles.slice(updatedParticles.length - 20)
        }
        return updatedParticles
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="animated-bg">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            bottom: "-20px",
            animationDuration: particle.animationDuration,
          }}
        />
      ))}
    </div>
  )
}
