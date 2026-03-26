"use client";

import { useState } from "react";
import Link from "next/link";

export default function PredictPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    // Simulate API call and AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResult(true);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-6 py-20 bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="w-full max-w-xl space-y-12">
        <header className="space-y-4">
          <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
            ← Back to Introduction
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight">Heart Risk Assessment</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Provide the metrics below for an AI-powered health analysis.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium">Age</label>
              <input 
                type="number" 
                id="age" 
                placeholder="45"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
              <select 
                id="gender" 
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50 transition-colors"
              >
                <option value="">Select...</option>
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="o">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="bp" className="block text-sm font-medium">Resting Blood Pressure</label>
              <input 
                type="number" 
                id="bp" 
                placeholder="120"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="chol" className="block text-sm font-medium">Cholesterol Level</label>
              <input 
                type="number" 
                id="chol" 
                placeholder="200"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-50 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isAnalyzing}
            className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {isAnalyzing ? "Analyzing Dataset..." : "Predict Health Outcome"}
          </button>
        </form>

        {hasResult && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Analysis Complete</span>
              <h2 className="text-2xl font-semibold">Healthy Heart Baseline</h2>
            </div>
            <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
              Based on the provided metrics, our AI models indicate a stable cardiovascular profile. 
              The swarm intelligence consensus suggests a low risk for significant heart-related issues 
              at this time. Continue maintaining your current active lifestyle and balanced diet.
            </p>
            <div className="pt-4 flex gap-4">
              <div className="h-1.5 flex-1 rounded-full bg-emerald-100 dark:bg-emerald-950/30 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-medium text-zinc-500">82% Confidence</span>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
