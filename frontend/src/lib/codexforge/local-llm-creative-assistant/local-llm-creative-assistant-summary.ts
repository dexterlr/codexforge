import type {
  LocalLlmCreativeAssistantBoundary,
  LocalLlmCreativeAssistantModel,
  LocalLlmCreativeAssistantPlan,
} from "./local-llm-creative-assistant-types";
import { buildLocalLlmCreativeAssistantStableKey } from "./local-llm-creative-assistant-types";

export function buildLocalLlmCreativeAssistantPlan(
  input: Omit<
    LocalLlmCreativeAssistantPlan,
    "id" | "automaticProviderSendAllowed" | "cloudFallbackAllowed" | "memoryAutoPromotionAllowed"
  > & { idHint: string }
): LocalLlmCreativeAssistantPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildLocalLlmCreativeAssistantStableKey("creative-assistant", idHint, input.taskKind),
    automaticProviderSendAllowed: false,
    cloudFallbackAllowed: false,
    memoryAutoPromotionAllowed: false,
    ...plan,
  };
}

export function buildLocalLlmCreativeAssistantPlans(): LocalLlmCreativeAssistantPlan[] {
  return [
    buildLocalLlmCreativeAssistantPlan({
      idHint: "image-keyframe-video",
      taskKind: "video prompt",
      creativeTaskSummary: "Shape a local-first creative prompt for image, keyframe, and video workflow planning.",
      localLlmFit: "Local LLM fit: useful for plain-English prompt cleanup, style continuity, and shot phrasing when a local model is already approved.",
      promptDraftChecklist: [
        "Subject, action, setting, camera, style, lighting, and negative guidance are explicit.",
        "Image, keyframe, and video prompt versions are separated before workflow handoff.",
        "Safety review is complete before any provider or local runtime receives text.",
      ],
      styleCharacterConsistencyInputs: [
        "Character identity, outfit, color palette, and recurring props.",
        "Style preset, reference-safe wording, camera language, and continuity notes.",
      ],
      workflowCompatibilityNote: "Workflow compatibility note: route to compatibility checker before local image, keyframe, or video trial.",
      safetyReviewNote: "Safety review note: no automatic provider send, no cloud fallback, and no local LLM call unless an approved boundary exists.",
      handoffToLocalImageKeyframeVideoTrial: "Handoff to local image keyframe video trial: copy the reviewed prompt plan into the proper local trial route manually.",
    }),
    buildLocalLlmCreativeAssistantPlan({
      idHint: "style-character",
      taskKind: "character consistency",
      creativeTaskSummary: "Prepare consistent character and style wording before a local creative workflow package is reviewed.",
      localLlmFit: "Local LLM fit: strong for reorganizing creative notes without spending cloud tokens when the local model is suitable.",
      promptDraftChecklist: [
        "Core character description is stable across prompt variants.",
        "Style words are specific and do not hide workflow requirements.",
        "The handoff keeps prompt drafts separate from memory promotion.",
      ],
      styleCharacterConsistencyInputs: [
        "Character sheet notes, mood, palette, framing, and disallowed changes.",
        "Workflow target, model family expectation, and compatibility questions.",
      ],
      workflowCompatibilityNote: "Workflow compatibility note: missing model or node questions go to the resolver before any approved trial.",
      safetyReviewNote: "Safety review note: prompts are not stored as memory automatically and Brain graph stays untouched.",
      handoffToLocalImageKeyframeVideoTrial: "Handoff to local image keyframe video trial: use local image trial, keyframe trial, or local video draft trial after review.",
    }),
  ];
}

export function buildLocalLlmCreativeAssistantBoundary(): LocalLlmCreativeAssistantBoundary {
  return {
    localOnly: true,
    approvedLocalLlmBoundaryRequired: true,
    automaticProviderSendAllowed: false,
    cloudFallbackAllowed: false,
    promptFileUploadAllowed: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
  };
}

export function summarizeLocalLlmCreativeAssistant(
  model: Pick<LocalLlmCreativeAssistantModel, "plans">
): string {
  return `Local LLM prompt assistant for creative work prepares ${model.plans.length} local-first prompt plan(s). No automatic provider send. No cloud fallback. No memory auto-promotion.`;
}

export function buildLocalLlmCreativeAssistantModel(): LocalLlmCreativeAssistantModel {
  const plans = buildLocalLlmCreativeAssistantPlans();
  const model: LocalLlmCreativeAssistantModel = {
    title: "Local LLM prompt assistant for creative work",
    summary: "",
    plans,
    boundary: buildLocalLlmCreativeAssistantBoundary(),
    advancedDetails: [
      "Local LLM prompt assistant for creative work",
      "No automatic provider send",
      "No cloud fallback",
      "Prompt draft checklist",
      "Handoff to local image keyframe video trial",
      "No memory auto-promotion",
      "No Brain graph mutation",
      "No prompt payload sent to providers",
    ],
  };
  return { ...model, summary: summarizeLocalLlmCreativeAssistant(model) };
}
