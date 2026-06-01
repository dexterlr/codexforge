export type KeyframeReadinessStatus = "needs-prompt" | "ready-for-review" | "ready-for-local-image-generation-later" | "blocked" | "not-needed";
export type KeyframePlan = { id: string; title: string; sourceStoryboard: string; nextStep: string };
export type KeyframeEntry = { id: string; shotId: string; order: number; framePurpose: string; visualPrompt: string; styleReferenceNote: string; subjectConsistencyNote: string; cameraNote: string; readinessStatus: KeyframeReadinessStatus; localGenerationSuitability: string; nextAction: string };
export type KeyframePrompt = { id: string; keyframeId: string; prompt: string; negativePrompt: string };
export type KeyframeConsistencyNote = { id: string; notes: string[]; plainEnglish: string };
export type KeyframeGenerationReadiness = { id: string; status: KeyframeReadinessStatus; approvalRequiredLater: true; imageGenerationAllowedNow: false; providerCallsAllowed: false; plainEnglish: string };
export type KeyframeHandoff = { keyframePrompts: string; videoDraftHandoff: string; nextStep: string };
export type KeyframePlanSummary = { plan: KeyframePlan; entries: KeyframeEntry[]; prompts: KeyframePrompt[]; consistency: KeyframeConsistencyNote; readiness: KeyframeGenerationReadiness; handoff: KeyframeHandoff; summary: string };
