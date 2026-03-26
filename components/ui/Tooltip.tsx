"use client";

import React, { useState } from "react";

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative inline-block ml-1 align-middle"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-bold transition-colors hover:bg-zinc-300 dark:hover:bg-zinc-600">
        i
      </div>
      
      {isVisible && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-56 p-3 bg-zinc-900 text-zinc-50 text-sm rounded-lg shadow-xl z-50 border border-zinc-800">
          {content}
          {/* Arrow */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-zinc-900" />
        </div>
      )}
    </div>
  );
}
