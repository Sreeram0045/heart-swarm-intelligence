export interface HeartAnalysisRequest {
  Sex: "M" | "F"; // Must match exactly what Python expects
  ChestPainType: "ATA" | "NAP" | "ASY" | "TA"; // Included all 4 types
  Cholesterol: number;
  Oldpeak: number; // Changed from OldPeak to match Python casing exactly
  ST_Slope: "Up" | "Flat" | "Down";
}

export interface ModelPredictionResponse {
  status: string;
  patient_profile: HeartAnalysisRequest;
  ml_probabilities: {
    safe_chance: number;
    disease_chance: number;
  };
  fuzzy_risk_score: number;
  fuzzy_verdict: string;
  driving_features: {
    Cholesterol: number;
  };
}