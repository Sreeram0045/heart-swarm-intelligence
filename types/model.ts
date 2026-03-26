export interface HeartAnalysisRequest {
  Cholesterol: number;
  Sex: "Male" | "Female";
  ChestPainType: "ATA" | "NAP" | "ASY";
  ST_Slope: "Flat" | "Up" | "Down";
  OldPeak: number;
}

export interface ModelPredictionResponse {
  risk_score: number;
  prediction: string;
  confidence: number;
}
