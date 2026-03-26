"use client";

import React from "react";

interface LlmResponseProps {
  data: {
    message?: string;
    error?: string;
  } | null;
}

export default function LlmResponse({ data }: LlmResponseProps) {
  // If we are still loading, or there is no data yet, don't render the box.
  if (!data) return null;

  return (
    <div className="w-full p-6 rounded-2xl bg-zinc-900 text-zinc-50 shadow-lg dark:bg-zinc-50 dark:text-zinc-900 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center space-x-3 mb-4 border-b border-zinc-800 dark:border-zinc-200 pb-4">
        {/* A sleek AI/Medical icon */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg tracking-tight">AI Clinical Summary</h3>
      </div>

      <div className="prose prose-sm prose-invert dark:prose-neutral max-w-none">
        {data.error ? (
          <p className="text-red-400">{data.error}</p>
        ) : data.message ? (
          // Render the LLM's text. (If returning markdown, you might want to add a package like react-markdown later!)
          <p className="leading-relaxed whitespace-pre-wrap">{data.message}</p>
        ) : (
          <p className="text-zinc-500 italic">No clinical summary could be generated.</p>
        )}
      </div>
    </div>
  );
}