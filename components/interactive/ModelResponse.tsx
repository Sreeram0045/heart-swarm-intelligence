"use client";

import React from "react";
import { ModelPredictionResponse } from "@/types/model";

interface ModelResponseProps {
  data: ModelPredictionResponse;
}

export default function ModelResponse({ data }: ModelResponseProps) {
  if (!data) return null;

  // Destructure the data for cleaner code
  const { ml_probabilities, fuzzy_risk_score, fuzzy_verdict, driving_features } = data;

  // Dynamic styling based on the Fuzzy Risk Score
  const isHighRisk = fuzzy_risk_score > 6;
  const isModerateRisk = fuzzy_risk_score > 4 && fuzzy_risk_score <= 6;

  const alertTheme = isHighRisk
    ? "bg-red-50 border-red-500 text-red-900 dark:bg-red-900/20 dark:border-red-500/50 dark:text-red-200"
    : isModerateRisk
      ? "bg-amber-50 border-amber-500 text-amber-900 dark:bg-amber-900/20 dark:border-amber-500/50 dark:text-amber-200"
      : "bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-900/20 dark:border-emerald-500/50 dark:text-emerald-200";

  const diseasePct = (ml_probabilities.disease_chance * 100).toFixed(1);
  const safePct = (ml_probabilities.safe_chance * 100).toFixed(1);

  return (
    <div className="space-y-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* 1. The Fuzzy Logic Verdict */}
      <div className={`p-6 rounded-2xl border-2 ${alertTheme}`}>
        <h3 className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">Final System Verdict</h3>
        <p className="text-2xl font-black leading-tight">{fuzzy_verdict}</p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 text-sm font-semibold">
          Fuzzy Safety Score: {fuzzy_risk_score} / 10
        </div>
      </div>

      {/* 2. XGBoost Machine Learning Breakdown */}
      <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
        <h4 className="text-sm font-bold mb-5 uppercase tracking-wider text-zinc-500 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          Swarm ML Analytics
        </h4>

        <div className="space-y-5">
          {/* Disease Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Disease Probability</span>
              <span className="font-bold text-red-600 dark:text-red-400">{diseasePct}%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-red-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${diseasePct}%` }}
              />
            </div>
          </div>

          {/* Safe Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Safe Probability</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{safePct}%</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-1000 ease-out delay-300"
                style={{ width: `${safePct}%` }}
              />
            </div>
          </div>
        </div>

        {/* 3. Driving Features (The 'Why') */}
        {driving_features && Object.keys(driving_features).length > 0 && (
          <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-semibold uppercase text-zinc-400">Key Risk Drivers:</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(driving_features).map(([key, value]) => (
                <span key={key} className="px-3 py-1 text-xs font-medium bg-zinc-100 text-zinc-700 rounded-md dark:bg-zinc-800 dark:text-zinc-300">
                  {key}: {value as string | number}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}