"use client";

import React, { useState } from "react";

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center ml-2"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      // Added touch events so it works on mobile phones when tapped!
      onTouchStart={() => setIsVisible(!isVisible)}
    >
      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold cursor-help transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800">
        i
      </div>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-zinc-900 text-zinc-50 text-xs leading-relaxed rounded-xl shadow-xl z-50 border border-zinc-800 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
          {content}
          {/* Downward pointing triangle arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
        </div>
      )}
    </div>
  );
}