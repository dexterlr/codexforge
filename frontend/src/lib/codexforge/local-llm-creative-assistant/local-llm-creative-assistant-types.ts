export type LocalLlmCreativeTaskKind =
  | "image prompt"
  | "keyframe prompt"
  | "video prompt"
  | "style consistency"
  | "character consistency";

export type LocalLlmCreativeAssistantPlan = {
  id: string;
  creativeTaskSummary: string;
  taskKind: LocalLlmCreativeTaskKind;
  localLlmFit: string;
  promptDraftChecklist: string[];
  styleCharacterConsistencyInputs: string[];
  workflowCompatibilityNote: string;
  safetyReviewNote: string;
  handoffToLocalImageKeyframeVideoTrial: string;
  automaticProviderSendAllowed: false;
  cloudFallbackAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type LocalLlmCreativeAssistantBoundary = {
  localOnly: true;
  approvedLocalLlmBoundaryRequired: true;
  automaticProviderSendAllowed: false;
  cloudFallbackAllowed: false;
  promptFileUploadAllowed: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type LocalLlmCreativeAssistantModel = {
  title: "Local LLM prompt assistant for creative work";
  summary: string;
  plans: LocalLlmCreativeAssistantPlan[];
  boundary: LocalLlmCreativeAssistantBoundary;
  advancedDetails: string[];
};

export function buildLocalLlmCreativeAssistantStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
