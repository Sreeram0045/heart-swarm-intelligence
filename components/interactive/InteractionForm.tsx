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
  const loadingMessages = ["Analyzing...", "Querying Swarm Intelligence...", "Generating Insights..."];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: HeartAnalysisRequest = {
      Cholesterol: Number(formData.cholesterol),
      Sex: formData.sex as "M" | "F",
      ChestPainType: formData.chestPainType as "ATA" | "NAP" | "ASY" | "TA",
      ST_Slope: formData.stSlope as "Flat" | "Up" | "Down",
      Oldpeak: Number(formData.oldpeak),
    };

    onSubmit(data);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full max-w-3xl space-y-12 bg-white p-12 rounded-3xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-lg font-medium text-zinc-700 dark:text-zinc-300 px-1">
              Cholesterol
            </label>
            <input 
              type="number" 
              name="cholesterol" 
              required 
              value={formData.cholesterol} 
              onChange={handleChange} 
              className="w-full h-14 px-6 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 [appearance:textfield]" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <label className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Oldpeak
              </label>
              <Tooltip content="Oldpeak: ST depression induced by exercise relative to rest (numeric value)." />
            </div>
            <input 
              type="number" 
              step="0.1" 
              name="oldpeak" 
              required 
              value={formData.oldpeak} 
              onChange={handleChange} 
              className="w-full h-14 px-6 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 [appearance:textfield]" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-lg font-medium text-zinc-700 dark:text-zinc-300 px-1">
            Biological Sex
          </label>
          <select 
            name="sex" 
            value={formData.sex} 
            onChange={handleChange} 
            className="w-full h-14 px-6 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-lg font-medium text-zinc-700 dark:text-zinc-300 px-1">
            Chest Pain Type
          </label>
          <select 
            name="chestPainType" 
            value={formData.chestPainType} 
            onChange={handleChange} 
            className="w-full h-14 px-6 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="TA">Typical Angina (TA)</option>
            <option value="ATA">Atypical Angina (ATA)</option>
            <option value="NAP">Non-Anginal Pain (NAP)</option>
            <option value="ASY">Asymptomatic (ASY)</option>
          </select>
        </div>

        <div className="space-y-4">
          <label className="text-lg font-medium text-zinc-700 dark:text-zinc-300 px-1">
            ST Slope
          </label>
          <select 
            name="stSlope" 
            value={formData.stSlope} 
            onChange={handleChange} 
            className="w-full h-14 px-6 text-lg rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none cursor-pointer"
          >
            <option value="Up">Up</option>
            <option value="Flat">Flat</option>
            <option value="Down">Down</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isProcessing} 
        className="w-full h-16 flex items-center justify-center rounded-full bg-zinc-900 text-lg font-medium text-zinc-50 transition-all hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-80 active:scale-[0.98]"
      >
        {isProcessing ? loadingMessages[loadingStep] : "Analyze Risk"}
      </button>
    </form>
  );
}
