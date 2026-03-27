"use client";

import React, { useState } from "react";
import { HeartAnalysisRequest } from "@/types/model";
import Tooltip from "@/components/ui/Tooltip";

interface InteractionFormProps {
  onSubmit: (data: HeartAnalysisRequest) => void;
  isProcessing: boolean;
}

export default function InteractionForm({ onSubmit, isProcessing }: InteractionFormProps) {
  const [loadingStep, setLoadingStep] = React.useState(0);
  const loadingMessages = ["Initializing AI Pipeline...", "Running XGBoost Metrics...", "Applying Fuzzy Logic...", "Drafting LLM Summary..."];

  // NEW: State to hold our client-side validation errors
  const [formError, setFormError] = useState<string | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  const [formData, setFormData] = useState({
    cholesterol: 200,
    sex: "M",
    chestPainType: "ATA",
    stSlope: "Flat",
    oldpeak: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error as soon as the user starts typing again
    if (formError) setFormError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cholNum = Number(formData.cholesterol);
    const peakNum = Number(formData.oldpeak);

    // 1. Create an array to hold ALL errors we find
    const errors: string[] = [];

    // 2. Check each field independently (Notice there is NO 'return' here!)
    if (cholNum < 50 || cholNum > 900) {
      errors.push("Cholesterol (must be between 50 and 900)");
    }

    if (peakNum < -5.0 || peakNum > 10.0) {
      errors.push("Oldpeak (must be between -5.0 and 10.0)");
    }

    // 3. If we caught any errors, combine them, show the banner, and STOP
    if (errors.length > 0) {
      setFormError(`Invalid Data - Please fix the following: ${errors.join(" | ")}`);
      return;
    }

    // If we pass all gates, clear any old errors and submit!
    setFormError(null);

    const data: HeartAnalysisRequest = {
      Cholesterol: cholNum,
      Sex: formData.sex as "M" | "F",
      ChestPainType: formData.chestPainType as "ATA" | "NAP" | "ASY" | "TA",
      ST_Slope: formData.stSlope as "Flat" | "Up" | "Down",
      Oldpeak: peakNum,
    };
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl space-y-10 bg-white p-10 md:p-12 rounded-4xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="space-y-8">

        {/* ROW 1: Cholesterol & Oldpeak */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex items-center px-1">
              <label className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
                Cholesterol
              </label>
              <Tooltip content="Serum cholesterol measured in mg/dl. Values over 200 mg/dl are clinically considered elevated. Our Fuzzy Logic engine specifically monitors this metric for danger." />
            </div>
            <input
              type="number"
              name="cholesterol"
              required
              value={formData.cholesterol}
              onChange={handleChange}
              className={`w-full h-14 px-5 text-lg rounded-xl bg-zinc-50 border focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 [appearance:textfield] transition-colors ${formError && formError.includes("Cholesterol") ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-zinc-200 dark:border-zinc-700"}`}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center px-1">
              <label className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
                Oldpeak
              </label>
              <Tooltip content="ST depression induced by exercise relative to rest. A numerical value representing how much the ECG line drops during peak physical exertion." />
            </div>
            <input
              type="number"
              step="0.1"
              name="oldpeak"
              required
              value={formData.oldpeak}
              onChange={handleChange}
              className={`w-full h-14 px-5 text-lg rounded-xl bg-zinc-50 border focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 [appearance:textfield] transition-colors ${formError && formError.includes("Oldpeak") ? "border-red-500 bg-red-50 dark:bg-red-900/10" : "border-zinc-200 dark:border-zinc-700"}`}
            />
          </div>
        </div>

        {/* ROW 2: Sex */}
        <div className="space-y-3">
          <div className="flex items-center px-1">
            <label className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              Biological Sex
            </label>
            <Tooltip content="M: Male, F: Female. Historically, biological sex plays a significant statistical role in baseline cardiovascular risk thresholds." />
          </div>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full h-14 px-5 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        {/* ROW 3: Chest Pain Type */}
        <div className="space-y-3">
          <div className="flex items-center px-1">
            <label className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              Chest Pain Type
            </label>
            <Tooltip content="TA: Classic angina caused by poor blood flow. ATA: Feels like angina but lacks classic triggers. NAP: Non-heart related pain. ASY: Silent ischemia (no pain), highly dangerous." />
          </div>
          <select
            name="chestPainType"
            value={formData.chestPainType}
            onChange={handleChange}
            className="w-full h-14 px-5 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="TA">Typical Angina (TA)</option>
            <option value="ATA">Atypical Angina (ATA)</option>
            <option value="NAP">Non-Anginal Pain (NAP)</option>
            <option value="ASY">Asymptomatic (ASY)</option>
          </select>
        </div>

        {/* ROW 4: ST Slope */}
        <div className="space-y-3">
          <div className="flex items-center px-1">
            <label className="text-sm font-semibold uppercase tracking-wide text-zinc-700 dark:text-zinc-300">
              Peak Exercise ST Slope
            </label>
            <Tooltip content="The trajectory of the ECG line during peak exercise. Up: Healthy heart response. Flat: Warning sign for reduced blood flow. Down: Severe indicator of heart disease." />
          </div>
          <select
            name="stSlope"
            value={formData.stSlope}
            onChange={handleChange}
            className="w-full h-14 px-5 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="Up">Upsloping (Healthy)</option>
            <option value="Flat">Flat (Warning)</option>
            <option value="Down">Downsloping (Danger)</option>
          </select>
        </div>
      </div>

      {/* NEW: The Error Banner */}
      {formError && (
        <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {formError}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full h-16 mt-6 flex items-center justify-center rounded-xl bg-zinc-900 text-lg font-semibold tracking-wide text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isProcessing ? loadingMessages[loadingStep] : "Run AI Diagnostics"}
      </button>
    </form>
  );
}