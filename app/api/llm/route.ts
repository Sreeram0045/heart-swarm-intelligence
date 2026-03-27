import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Construct the System Prompt
    const systemPrompt = `You are an expert, empathetic AI cardiology assistant interpreting data for a doctor.
    CRITICAL RULES: 
    1. Do NOT invent, assume, or hallucinate any patient data (like Age) that is not explicitly provided. 
    2. If a metric appears biologically impossible (like Cholesterol = 0), you MUST flag it as a probable data entry error in your summary.`;
    const userPrompt = `
    The user provided the following patient vitals:
    - Biological Sex: ${body.Sex}
    - Chest Pain Type: ${body.ChestPainType}
    - Cholesterol: ${body.Cholesterol} mg/dl
    - Oldpeak (ST Depression): ${body.Oldpeak}
    - ST Slope: ${body.ST_Slope}

    Our backend XGBoost model and Fuzzy Logic engine have analyzed this data:
    - ML Disease Probability: ${(body.model_result.ml_probabilities.disease_chance * 100).toFixed(1)}%
    - Fuzzy Risk Score: ${body.model_result.fuzzy_risk_score}/10
    - Final Verdict: ${body.model_result.fuzzy_verdict}

    Task: Write a concise, professional 2-paragraph clinical summary. 
    Explain what these specific metrics mean together, highlight any dangerous driving factors, and suggest practical next steps. Do not use markdown headers, just return a clean conversational response.
    `;

    // 2. ATTEMPT 1: Primary Model (Google Gemini SDK)
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using the latest flash model
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
        const text = result.response.text();

        return NextResponse.json({ message: text });
      } catch (geminiError) {
        console.warn("Google SDK Gemini request failed. Falling back to OpenRouter...", geminiError);
      }
    }

    // 3. ATTEMPT 2: Fallback Model (Vercel AI SDK via OpenRouter)
    if (process.env.OPEN_ROUTER_TOKEN) {
      try {
        // Configure the Vercel AI SDK to point to OpenRouter instead of standard OpenAI
        const openRouter = createOpenAI({
          baseURL: "https://openrouter.ai/api/v1",
          apiKey: process.env.OPEN_ROUTER_TOKEN,
        });

        const { text } = await generateText({
          model: openRouter("stepfun/step-3.5-flash:free"),
          system: systemPrompt,
          prompt: userPrompt,
          temperature: 0.7,
        });

        return NextResponse.json({ message: text });
      } catch (openRouterError) {
        console.error("OpenRouter Fallback also failed:", openRouterError);
        throw new Error("Both Gemini and OpenRouter fallback failed.");
      }
    }

    throw new Error("No valid LLM API keys configured.");

  } catch (error: any) {
    console.error("LLM Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI summary. The predictive model succeeded, but the language models are currently offline." },
      { status: 500 }
    );
  }
}