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
      const modelRes = await fetch("/api/render-model", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const modelResult: ModelPredictionResponse = await modelRes.json();
      setMlData(modelResult);

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
    <div className="w-full flex flex-col items-center space-y-16">
      <div className="w-full max-w-3xl">
        {/* Pass the loading state to the form */}
        <InteractionForm onSubmit={handleProcessData} isProcessing={isProcessing} />
      </div>

      <div className="w-full space-y-8">
        <div className="w-full space-y-6">
          {mlData && !isProcessing && (
            <div className="space-y-6">
              <ModelResponse data={mlData} />
              <LlmResponse data={llmData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
