export type ModelCapabilityDimension = "coding" | "reasoning" | "summarization" | "extraction" | "long-context" | "privacy-local" | "speed" | "cost-efficiency" | "tool-use" | "vision" | "reliability" | "manual-browser-only" | "api-automation-capable";
export type ModelCapabilityEntry = { id: string; family: string; provider: string; description: string; labels: string[]; scores: Record<ModelCapabilityDimension, number>; manualOnly: boolean; apiCapable: boolean; };
export type ModelCapabilityScore = { dimension: ModelCapabilityDimension; score: number; label: string; };
export type ModelCapabilityFit = { entry: ModelCapabilityEntry; task: string; score: number; reason: string; };
export type ModelCapabilityComparison = { task: string; fits: ModelCapabilityFit[]; best: ModelCapabilityFit; };
export type ModelCapabilitySummary = { entries: ModelCapabilityEntry[]; comparison: ModelCapabilityComparison; summary: string; };
