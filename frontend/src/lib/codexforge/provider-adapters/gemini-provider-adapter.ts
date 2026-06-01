import { buildProviderAdapterCapabilityProfile } from "./provider-adapter-capability";
import { buildCloudApiContract } from "./provider-adapter-contract";
import { buildProviderAdapterModelFamily } from "./provider-adapter-model-family";
import { buildProviderAdapterRoutingHint } from "./provider-adapter-routing-hint";
import { buildDefaultProviderAdapterSafetyProfile } from "./provider-adapter-safety";
import type {
  ProviderAdapterCapabilityProfile,
  ProviderAdapterDefinition,
  ProviderAdapterModelFamily,
  ProviderAdapterRoutingHint,
  ProviderAdapterSafetyProfile,
} from "./provider-adapter-types";

export function buildGeminiModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "gemini-cloud-models",
      label: "Gemini cloud models",
      plainEnglish: "Gemini is represented separately so multimodal and long-context routing can stay clear.",
      strengths: ["multimodal", "vision", "long-context", "summarizing"],
      cautions: ["Cloud/external posture.", "Specific capability depends on model selection."],
    }),
  ];
}

export function buildGeminiCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "planned",
    vision: "supported-by-some-models",
    longContext: "supported-by-some-models",
    localOnly: false,
    notes: [
      "Good candidate for multimodal/vision and long-context style tasks depending on model.",
      "API key stored outside UI.",
      "No live provider calls yet.",
    ],
  });
}

export function buildGeminiRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "gemini-multimodal-context",
      label: "Multimodal and long-context planning",
      bestUse: "Use for vision, multimodal review, or long-context summarization when the selected model supports it.",
      why: "Separate Gemini metadata keeps routing decisions readable.",
      readiness: "needs-credential-strategy",
    }),
  ];
}

export function buildGeminiSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    credentialGuidance: ["Use GEMINI_API_KEY as an env var name only; keep actual values outside the UI."],
  });
}

export function buildGeminiProviderAdapter(): ProviderAdapterDefinition {
  return {
    id: "gemini",
    label: "Gemini",
    plainEnglishSummary:
      "Gemini has its own adapter definition so multimodal, vision, and long-context routing notes stay visible instead of being hidden under a generic provider bucket.",
    providerFamily: "gemini",
    contract: buildCloudApiContract({
      requestShape: "Gemini-style model request metadata with model-dependent multimodal fields.",
      connectionShape: "Env-key cloud API profile or planned setup record.",
      noviceExplanation: "Gemini is represented separately because vision and long-context planning need clear capability labels.",
    }),
    connectionModes: ["api-key-env", "planned"],
    credentialStrategies: ["env-only", "local-secret-proxy-design"],
    privacyPosture: "external-cloud",
    automationReadiness: "definition-only",
    setupStatus: "needs-credential-strategy",
    supportedTaskTypes: ["vision", "long-context", "summarizing", "reasoning", "review"],
    modelFamilies: buildGeminiModelFamilies(),
    capabilityProfile: buildGeminiCapabilityProfile(),
    routingHints: buildGeminiRoutingHints(),
    safetyProfile: buildGeminiSafetyProfile(),
    limitationNotes: ["No live provider calls yet.", "Token and price notes are approximate planning hints, not billing promises."],
    nextSetupStep: "Review Gemini credential reference strategy and model capability notes.",
  };
}
