import React from 'react';
import { motion } from 'motion/react';

interface BananaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export const BananaLogo: React.FC<BananaLogoProps> = ({ size = 64, className = "", animated = true }) => {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      animate={animated ? {
        y: [0, -size * 0.1, 0],
        rotate: [0, 2, -2, 0]
      } : {}}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_15px_rgba(253,224,71,0.3)]"
      >
        {/* 3D Banana Shape with Gradients */}
        <defs>
          <linearGradient id="bananaGradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <linearGradient id="bananaHighlight" x1="30" y1="20" x2="50" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <filter id="innerShadow">
            <feOffset dx="2" dy="2" />
            <feGaussianBlur stdDeviation="3" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.3" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Main Body */}
        <path
          d="M20 40C20 40 25 20 50 20C75 20 85 45 80 70C75 95 45 90 30 80C15 70 10 50 20 40Z"
          fill="url(#bananaGradient)"
          filter="url(#innerShadow)"
        />
        
        {/* Stem */}
        <path
          d="M18 42C18 42 15 35 12 38C9 41 14 45 18 42Z"
          fill="#422006"
        />

        {/* Highlight for 3D effect */}
        <path
          d="M30 35C30 35 35 25 50 25C65 25 70 35 70 35"
          stroke="url(#bananaHighlight)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Bottom Tip */}
        <circle cx="81" cy="72" r="2" fill="#422006" />
      </svg>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-banana/20 blur-2xl rounded-full -z-10" />
    </motion.div>
  );
};
