"use client";

import React from "react";
import { motion } from "framer-motion";

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

// 1. Floating Wobbly Star
export function DoodleStar({ className = "", size = 28, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      <path
        d="M12 2.5 
           L14.7 8.3 
           L21.2 8.9 
           L16.2 13.2 
           L17.8 19.5 
           L12 16.2 
           L6.2 19.5 
           L7.8 13.2 
           L2.8 8.9 
           L9.3 8.3 
           Z"
      />
      {/* Small extra sketch lines around the star */}
      <path d="M4 4.5 L4.5 4" strokeWidth="1.5" />
      <path d="M20 5 L19.5 5.5" strokeWidth="1.5" />
      <path d="M3 18 L4 17.5" strokeWidth="1.5" />
      <path d="M21 17.5 L20.5 17" strokeWidth="1.5" />
    </svg>
  );
}

// 2. Wobbly Cloud
export function DoodleCloud({ className = "", size = 48, arrow = false, ...props }: DoodleProps & { arrow?: "up" | "down" | boolean }) {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 48 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      {/* Hand-drawn wobbly cloud outline */}
      <path
        d="M12 28 
           C8 28, 4 25, 4 20 
           C4 16, 7 13, 11 12 
           C12 7, 18 4, 24 4 
           C30 4, 35 7, 36 12 
           C41 13, 44 16, 44 20 
           C44 25, 40 28, 36 28 
           L12 28 Z"
      />
      {/* Hatch shading lines inside the cloud */}
      <path d="M12 24 L16 20" strokeWidth="1.5" strokeDasharray="1 1" />
      <path d="M18 24 L22 20" strokeWidth="1.5" strokeDasharray="1 1" />
      <path d="M30 24 L34 20" strokeWidth="1.5" strokeDasharray="1 1" />
      <path d="M36 24 L39 20" strokeWidth="1.5" strokeDasharray="1 1" />
      
      {/* Optional arrow inside cloud like the image */}
      {arrow === "down" && (
        <path d="M24 12 L24 24 M20 20 L24 24 L28 20" strokeWidth="2.5" />
      )}
      {arrow === "up" && (
        <path d="M24 24 L24 12 M20 16 L24 12 L28 16" strokeWidth="2.5" />
      )}
    </svg>
  );
}

// 3. Speech Bubble with "hi!" or children text
export function DoodleSpeechBubble({ className = "", text = "hi!", size = 52, ...props }: DoodleProps & { text?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
        {...props}
      >
        <path
          d="M8 32 
             C4 28, 4 20, 9 14 
             C14 8, 26 6, 34 10 
             C42 14, 44 24, 40 31 
             C36 38, 26 40, 18 39 
             C15 41, 11 43, 6 44 
             C7 41, 8 36, 8 32 
             Z"
          fill="var(--card-bg)"
        />
        {/* Draw the little accent lines */}
        <path d="M41 12 L43 10" strokeWidth="1.5" />
        <path d="M43 15 L45 15" strokeWidth="1.5" />
      </svg>
      <span
        className="absolute font-heading font-bold text-foreground pointer-events-none"
        style={{
          fontSize: `${size * 0.3}px`,
          transform: "rotate(-4deg) translateY(-2px)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

// 4. Custom wobbly browser container (polaroid style or webpage style)
export function DoodleBrowser({
  children,
  title = "WWW",
  className = "",
  innerClassName = "",
}: {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`relative bg-card-bg border-[2.5px] border-foreground rounded-[25px_10px_20px_10px/10px_20px_10px_25px] shadow-[4px_5px_0_0_currentColor] doodle-effect ${className}`}>
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between border-b-[2px] border-foreground px-4 py-2 bg-foreground/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-foreground" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-foreground" />
          <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-foreground" />
        </div>
        
        {/* URL Bar */}
        <div className="flex-1 max-w-[55%] mx-auto border-[1.5px] border-foreground rounded-[100px_4px_100px_4px/4px_100px_4px_100px] px-2 py-0.5 text-[10px] text-center font-mono truncate bg-background/50">
          {title}
        </div>
        
        <div className="w-8 flex justify-end">
          <span className="w-3.5 h-3.5 border-[1.5px] border-foreground rounded-sm flex items-center justify-center font-bold text-[8px] select-none">
            ✕
          </span>
        </div>
      </div>
      
      {/* Window Body */}
      {children && (
        <div className={`p-4 ${innerClassName}`}>
          {children}
        </div>
      )}
    </div>
  );
}

// 5. Custom wobbly monitor container
export function DoodleMonitor({
  children,
  className = "",
  innerClassName = "",
}: {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Monitor Screen Frame */}
      <div className="relative w-full bg-card-bg border-[3px] border-foreground rounded-[30px_15px_25px_15px/15px_25px_15px_30px] p-5 shadow-[4px_5px_0_0_currentColor] doodle-effect z-10">
        {/* Top 3 dots */}
        <div className="absolute top-2.5 left-4 flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
          <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
        </div>
        
        {/* Screen Content Wrapper */}
        {children && (
          <div className={`w-full overflow-hidden min-h-[160px] rounded-lg ${innerClassName}`}>
            {children}
          </div>
        )}
      </div>
      
      {/* Monitor Neck & Base */}
      <div className="relative flex flex-col items-center mt-[-3px] w-full max-w-[200px] pointer-events-none">
        {/* Neck */}
        <div className="w-10 h-7 border-x-[2.5px] border-foreground bg-card-bg shadow-[2px_0_0_0_currentColor]" />
        
        {/* Base */}
        <div className="w-36 h-3 border-[2.5px] border-foreground bg-card-bg rounded-[80px_15px_80px_15px/15px_80px_15px_80px] shadow-[2px_2px_0_0_currentColor]" />
      </div>
    </div>
  );
}

// 6. Megaphone / Speaker Doodle
export function DoodleMegaphone({ className = "", size = 32, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      <path
        d="M3 8.5 
           L7 8.5 
           L13 4 
           L13 20 
           L7 15.5 
           L3 15.5 
           Z"
        fill="var(--card-bg)"
      />
      {/* Handle */}
      <path d="M9 15.5 L9 18.5 C9 19, 8 19.5, 7.5 19.5 C7 19.5, 7.5 18.5, 7.5 18.5" />
      {/* Sound waves */}
      <path d="M17 9 C18 10.5, 18 13.5, 17 15" />
      <path d="M20 7 C22 9.5, 22 14.5, 20 17" />
    </svg>
  );
}

// 7. Security Shield / Lock Doodle
export function DoodleShield({ className = "", size = 36, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      <path
        d="M12 2.5 
           C16 2.5, 20 4.5, 20 4.5
           L20 11.5
           C20 17, 16.5 20, 12 21.5
           C7.5 20, 4 17, 4 11.5
           L4 4.5
           C4 4.5, 8 2.5, 12 2.5 
           Z"
        fill="var(--card-bg)"
      />
      {/* Keyhole/lock inside */}
      <circle cx="12" cy="10.5" r="2.5" />
      <path d="M12 13 L12 16.5 M10.5 16.5 L13.5 16.5" />
    </svg>
  );
}

// 8. Light Bulb Doodle
export function DoodleLightBulb({ className = "", size = 32, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size * 1.1}
      viewBox="0 0 24 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      {/* Bulb body */}
      <path
        d="M12 3 
           C6.5 3, 4.5 7, 4.5 11.5 
           C4.5 15, 7.5 17.5, 8.5 19.5 
           L8.5 22 
           L15.5 22 
           L15.5 19.5 
           C16.5 17.5, 19.5 15, 19.5 11.5 
           C19.5 7, 17.5 3, 12 3 
           Z"
        fill="var(--card-bg)"
      />
      {/* Screw base */}
      <path d="M9 22 L15 22" />
      <path d="M9.5 24.5 L14.5 24.5" />
      <path d="M10.5 26.5 L13.5 26.5" />
      {/* Filament */}
      <path d="M9.5 14 C10 10.5, 14 10.5, 14.5 14" />
      {/* Rays */}
      <path d="M2.5 11.5 L0.5 11.5" strokeWidth="1.5" />
      <path d="M21.5 11.5 L23.5 11.5" strokeWidth="1.5" />
      <path d="M5.5 5 L3.5 3.5" strokeWidth="1.5" />
      <path d="M18.5 5 L20.5 3.5" strokeWidth="1.5" />
      <path d="M5.5 18 L3.5 19.5" strokeWidth="1.5" />
      <path d="M18.5 18 L20.5 19.5" strokeWidth="1.5" />
    </svg>
  );
}

// 9. Hourglass / Timer Doodle
export function DoodleHourglass({ className = "", size = 32, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      {/* Top and bottom bars */}
      <path d="M3.5 2.5 L20.5 2.5" />
      <path d="M3.5 21.5 L20.5 21.5" />
      {/* Glass Body */}
      <path
        d="M5 2.5 
           L5 6 
           C5 9.5, 10 11.5, 11.5 12 
           C10 12.5, 5 14.5, 5 18 
           L5 21.5 
           L19 21.5 
           L19 18 
           C19 14.5, 14 12.5, 12.5 12 
           C14 11.5, 19 9.5, 19 6 
           L19 2.5 
           Z"
        fill="var(--card-bg)"
      />
      {/* Sand */}
      <path d="M7 5.5 L17 5.5" strokeWidth="1.5" />
      <path d="M9 7.5 L15 7.5" strokeWidth="1.5" />
      <path d="M8 19 L16 19 M9 17.5 L15 17.5 M11.5 14 L12.5 14" strokeWidth="1.5" />
      {/* Falling sand stream */}
      <path d="M12 11.5 L12 16" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

// 10. Bell Doodle
export function DoodleBell({ className = "", size = 32, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      <path
        d="M12 3 
           C7.5 3, 5.5 6, 5.5 11 
           L5.5 16 
           C5.5 17.5, 4 18, 3 18 
           L21 18 
           C20 18, 18.5 17.5, 18.5 16 
           L18.5 11 
           C18.5 6, 16.5 3, 12 3 
           Z"
        fill="var(--card-bg)"
      />
      {/* Clapper */}
      <path d="M10 18.5 C10 19.5, 11 21.5, 12 21.5 C13 21.5, 14 19.5, 14 18.5" />
      {/* Ringing waves */}
      <path d="M3.5 6 C2.5 8, 2.5 10, 3.5 12" strokeWidth="1.5" />
      <path d="M20.5 6 C21.5 8, 21.5 10, 20.5 12" strokeWidth="1.5" />
    </svg>
  );
}

// 11. Hand Pointer / Arrow
export function DoodleArrow({ className = "", size = 32, direction = "right", ...props }: DoodleProps & { direction?: "right" | "left" | "down" | "up" }) {
  const getRotation = () => {
    switch (direction) {
      case "left":
        return "rotate(180deg)";
      case "down":
        return "rotate(90deg)";
      case "up":
        return "rotate(-90deg)";
      default:
        return "rotate(0deg)";
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      style={{ transform: getRotation() }}
      {...props}
    >
      <path d="M3 12 L21 12" />
      <path d="M14 5 L21 12 L14 19" />
      {/* Sketchy double arrow lines */}
      <path d="M12 7 L17 12 L12 17" strokeWidth="1.5" />
    </svg>
  );
}

// 12. Notebook Lined Page Tear Decoration
export function DoodleTape({ className = "", text = "", ...props }: { className?: string; text?: string }) {
  return (
    <div
      className={`absolute w-28 h-6 bg-amber-100/60 dark:bg-amber-950/20 border-x border-dashed border-amber-500/30 rotate-[-1.5deg] z-10 pointer-events-none doodle-effect flex items-center justify-center ${className}`}
      style={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      }}
    >
      {text && <span className="font-heading text-[9px] text-amber-900/60 dark:text-amber-100/40 select-none">{text}</span>}
    </div>
  );
}

// 13. Bookmark Doodle
export function DoodleBookmark({ className = "", size = 32, ...props }: DoodleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-foreground doodle-ink ${className}`}
      {...props}
    >
      <path
        d="M6 3 
           L18 3 
           C18 3, 18 19, 18 20.5 
           L12 16 
           L6 20.5 
           C6 19, 6 3, 6 3 
           Z"
        fill="var(--card-bg)"
      />
      {/* Small hatch lines on top corner */}
      <path d="M8 6 L12 6" strokeWidth="1.5" />
      <path d="M8 9 L15 9" strokeWidth="1.5" />
    </svg>
  );
}

// 14. Search Bar (works as a controlled input when value/onChange are given)
export function DoodleSearch({
  className = "",
  size = 20,
  value,
  onChange,
  placeholder = "Search...",
}: {
  className?: string;
  size?: number;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className={`flex items-center gap-2 border-[2.2px] border-foreground rounded-[100px_10px_90px_8px/8px_80px_10px_100px] px-3.5 py-1.5 bg-card-bg doodle-effect focus-within:shadow-[3px_3px_0_0_currentColor] transition-shadow ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={!onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="min-w-0 flex-1 bg-transparent outline-none font-heading text-xs tracking-wider uppercase text-foreground placeholder:text-muted-foreground"
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground ml-auto shrink-0"
      >
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16 L21 21" />
      </svg>
    </label>
  );
}
