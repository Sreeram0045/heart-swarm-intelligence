"use client";

import React, { useState } from "react";
import InteractionForm from "./InteractionForm";
import ModelResponse from "./ModelResponse";
import LlmResponse from "./LlmResponse";
import { HeartAnalysisRequest, ModelPredictionResponse } from "@/types/model";

export default function ModelContainer() {
  const [mlData, setMlData] = useState<ModelPredictionResponse | null>(null);
  const [llmData, setLlmData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessData = async (data: HeartAnalysisRequest) => {
    setIsProcessing(true);
    
    try {
      // 1. Fetch from render-model API
      const modelRes = await fetch("/api/render-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const modelResult: ModelPredictionResponse = await modelRes.json();
      setMlData(modelResult);

      // 2. Fetch from LLM API
      const llmRes = await fetch("/api/llm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, model_result: modelResult }),
      });
      const llmResult = await llmRes.json();
      setLlmData(llmResult);

    } catch (error) {
      console.error("Failed to process data:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Input Form */}
      <div className="flex flex-col items-center space-y-8">
        <h2 className="text-xl font-medium self-start px-2">Data Input</h2>
        <InteractionForm onSubmit={handleProcessData} />
      </div>

      {/* Right Column: Responses/Insights */}
      <div className="flex flex-col space-y-8 h-full">
        <h2 className="text-xl font-medium px-2">Analysis & Insights</h2>
        
        <div className="flex-1 space-y-6">
          {mlData ? (
            <>
              <ModelResponse />
              <LlmResponse />
            </>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 text-zinc-400 dark:border-zinc-800">
              <p className="text-sm">Submit the form to generate insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
