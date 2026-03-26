"use client";

import React, { useState } from "react";
import { HeartAnalysisRequest } from "@/types/model";

interface InteractionFormProps {
  onSubmit: (data: HeartAnalysisRequest) => void;
}

export default function InteractionForm({ onSubmit }: InteractionFormProps) {
  const [formData, setFormData] = useState({
    cholesterol: 0,
    sex: "Male",
    chestPainType: "ATA",
    stSlope: "Flat",
    oldPeak: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      Sex: formData.sex as "Male" | "Female",
      ChestPainType: formData.chestPainType as "ATA" | "NAP" | "ASY",
      ST_Slope: formData.stSlope as "Flat" | "Up" | "Down",
      OldPeak: Number(formData.oldPeak),
    };

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="cholesterol"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Cholesterol
            </label>
            <input
              type="number"
              id="cholesterol"
              name="cholesterol"
              required
              value={formData.cholesterol}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-zinc-50"
              placeholder="Enter cholesterol"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="oldPeak"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Old Peak
            </label>
            <input
              type="number"
              step="0.1"
              id="oldPeak"
              name="oldPeak"
              required
              value={formData.oldPeak}
              onChange={handleChange}
              className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-zinc-50"
              placeholder="e.g. 1.5"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sex"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Sex
          </label>
          <select
            id="sex"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-zinc-50 appearance-none"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="chestPainType"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Chest Pain Type
          </label>
          <select
            id="chestPainType"
            name="chestPainType"
            value={formData.chestPainType}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-zinc-50 appearance-none"
          >
            <option value="ATA">Atypical Angina (ATA)</option>
            <option value="NAP">Non-Anginal Pain (NAP)</option>
            <option value="ASY">Asymptomatic (ASY)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="stSlope"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            ST Slope
          </label>
          <select
            id="stSlope"
            name="stSlope"
            value={formData.stSlope}
            onChange={handleChange}
            className="w-full h-11 px-4 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-zinc-50 appearance-none"
          >
            <option value="Up">Up</option>
            <option value="Flat">Flat</option>
            <option value="Down">Down</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 flex items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Analyze Risk
      </button>
    </form>
  );
}
