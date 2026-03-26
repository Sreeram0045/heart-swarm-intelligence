import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Grab the patient data from the frontend request
    const body = await req.json();

    // 2. Validate that your environment variable is set
    const apiKey = process.env.OUR_MODEL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Configuration Error: Model API Key is missing." },
        { status: 500 }
      );
    }

    // 3. Forward the request to your live Render server
    const renderApiUrl = "https://heart-disease-mlops-tmzf.onrender.com/predict";
    const response = await fetch(renderApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey, // Securely injected on the server side!
      },
      body: JSON.stringify(body),
    });

    // 4. Handle Render server errors (e.g., if the container crashed)
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Render API responded with status: ${response.status} - ${errorData}`);
    }

    // 5. Send the successful JSON back to the Next.js frontend
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Error in render-model API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to communicate with the ML model." },
      { status: 500 }
    );
  }
}