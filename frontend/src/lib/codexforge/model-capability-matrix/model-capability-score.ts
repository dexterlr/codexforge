import type { ModelCapabilityDimension, ModelCapabilityScore } from "./model-capability-types";
export function buildModelCapabilityScore(dimension: ModelCapabilityDimension, score: number): ModelCapabilityScore { return { dimension, score, label: score >= 5 ? "best fit" : score >= 4 ? "strong" : score >= 3 ? "good" : "limited" }; }
