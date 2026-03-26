"use client";

import React, { useState } from "react";
import { HeartAnalysisRequest } from "@/types/model";

interface InteractionFormProps {
  onSubmit: (data: HeartAnalysisRequest) => void;
  isProcessing: boolean; // Added this so we can disable the button while loading!
}

export default function InteractionForm({ onSubmit, isProcessing }: InteractionFormProps) {
  const [formData, setFormData] = useState({
    cholesterol: 200,
    sex: "M", // Changed default to "M"
    chestPainType: "ATA",
    stSlope: "Flat",
    oldpeak: 0, // Changed to lowercase 'p' to match your schema
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

    // Now the data maps EXACTLY to your Python API expectations
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
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Cholesterol</label>
            <input type="number" name="cholesterol" required value={formData.cholesterol} onChange={handleChange} className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Oldpeak</label>
            <input type="number" step="0.1" name="oldpeak" required value={formData.oldpeak} onChange={handleChange} className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Biological Sex</label>
          <select name="sex" value={formData.sex} onChange={handleChange} className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none">
            {/* The value is what Python gets, the text is what the user sees */}
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Chest Pain Type</label>
          <select name="chestPainType" value={formData.chestPainType} onChange={handleChange} className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none">
            <option value="TA">Typical Angina (TA)</option>
            <option value="ATA">Atypical Angina (ATA)</option>
            <option value="NAP">Non-Anginal Pain (NAP)</option>
            <option value="ASY">Asymptomatic (ASY)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">ST Slope</label>
          <select name="stSlope" value={formData.stSlope} onChange={handleChange} className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:bg-zinc-800 dark:border-zinc-700 appearance-none">
            <option value="Up">Up</option>
            <option value="Flat">Flat</option>
            <option value="Down">Down</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={isProcessing} className="w-full h-12 flex items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50">
        {isProcessing ? "Analyzing..." : "Analyze Risk"}
      </button>
    </form>
  );
}