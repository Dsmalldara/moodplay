"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function MoodPlayLogo({width=200, className=""}: {width: number, className?: string}) {
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    // Animation function for the sound waves
    let animationFrameId: number;
    let phase1 = 0;
    let phase2 = Math.PI; // Start 180 degrees out of phase
    
    const animate = () => {
      if (wave1Ref.current && wave2Ref.current) {
        // Update the first wave
        const path1 = `M280 60 Q 275 ${40 + Math.sin(phase1) * 12}, 270 60 T 260 ${60 + Math.sin(phase1 + 0.5) * 6} T 250 ${60 + Math.sin(phase1 + 1) * 8} T 240 ${60 + Math.sin(phase1 + 1.5) * 4} T 230 60`;
        wave1Ref.current.setAttribute("d", path1);
        
        // Update the second wave
        const path2 = `M280 60 Q 275 ${80 + Math.sin(phase2) * 12}, 270 60 T 260 ${60 + Math.sin(phase2 + 0.5) * 6} T 250 ${60 + Math.sin(phase2 + 1) * 8} T 240 ${60 + Math.sin(phase2 + 1.5) * 4} T 230 60`;
        wave2Ref.current.setAttribute("d", path2);
        
        // Update phases
        phase1 += 0.03;
        phase2 += 0.04; // Slightly different speed for interesting effect
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return (
    <Link href="/">
      <div className={`flex items-center ${className}`}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 320 100" 
          width={width} 
          height={width * 0.3} // Maintaining aspect ratio
          className="overflow-visible"
        >
          {/* Animated sound waves */}
          <path 
            ref={wave1Ref}
            d="M280 60 Q 275 40, 270 60 T 260 60 T 250 60 T 240 60 T 230 60" 
            fill="none" 
            stroke="rgba(134, 168, 231, 0.25)" 
            strokeWidth="5.5" 
            strokeLinecap="round"
          />
          <path 
            ref={wave2Ref}
            d="M280 60 Q 275 80, 270 60 T 260 60 T 250 60 T 240 60 T 230 60" 
            fill="none" 
            stroke="rgba(134, 168, 231, 0.15)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />

          {/* Logo Text - adjusted positions for tighter layout */}
          {/* "Mood" part in deep navy */}
          <text 
            x="32" 
            y="75" 
            fontFamily="Poppins, Arial, sans-serif" 
            fontSize="42" 
            fontWeight="600" 
            fill="#e823b7" 
            letterSpacing="-1"
          >
            Mood
          </text>
          
          {/* "Play" part with gradient - moved closer to "Mood" */}
          <text 
            x="145" 
            y="75" 
            fontFamily="Poppins, Arial, sans-serif" 
            fontSize="42" 
            fontWeight="600" 
            fill="url(#gradient)" 
            letterSpacing="-1"
          >
            Play
          </text>
          
          {/* Small music note dot for the "y" - adjusted position */}
          <circle cx="238" cy="75" r="3" fill="url(#gradient)" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D16BA5" /> {/* Pink */}
              <stop offset="50%" stopColor="#86A8E7" /> {/* Blue */}
              <stop offset="100%" stopColor="#5FFBF1" /> {/* Teal */}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </Link>
  )
}