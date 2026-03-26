import { NextResponse } from "next/server";
import { HeartAnalysisRequest, ModelPredictionResponse } from "@/types/model";

export async function POST(req: Request) {
  try {
    // 1. Receive the request body from ModelContainer
    const body: HeartAnalysisRequest = await req.json();

    // TEMPLATE: Replace this with your actual API endpoint
    const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts";

    // 2. Make the external API call using the received body
    const response = await fetch(EXTERNAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": "Bearer YOUR_API_KEY", // Add headers as needed
      },
      body: JSON.stringify({
        ...body, // Spreading all our form data into the external request
        source: "HeartSwarmIntelligence",
      }),
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const dataFromExternalApi = await response.json();

    // 3. Return a response that matches our ModelPredictionResponse interface
    const result: ModelPredictionResponse = {
      risk_score: 0.85, // Mock result
      prediction: "High Risk",
      confidence: 0.92,
      // @ts-ignore - for debugging purposes so your friend can see the API output
      _external_debug: dataFromExternalApi,
    };

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
