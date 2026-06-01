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

export function buildDeepSeekModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "deepseek-coding-reasoning",
      label: "DeepSeek coding and reasoning models",
      plainEnglish: "DeepSeek can be routed as its own provider or through compatible endpoints later.",
      strengths: ["coding", "economical reasoning", "summarizing", "review"],
      cautions: ["No live pricing claims.", "Cloud/external posture unless self-hosted or custom-compatible in a future review."],
    }),
  ];
}

export function buildDeepSeekCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "planned",
    vision: "not-described",
    longContext: "supported-by-some-models",
    localOnly: false,
    notes: [
      "Good candidate for coding/economical reasoning depending on model.",
      "Can be represented as its own provider or through OpenAI-compatible endpoints later.",
      "Token and price notes are approximate planning hints, not billing promises.",
    ],
  });
}

export function buildDeepSeekRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "deepseek-coding-economy",
      label: "Coding and economical reasoning",
      bestUse: "Use for coding drafts, review, and reasoning when the selected model is appropriate.",
      why: "The adapter keeps DeepSeek identity visible even when a compatible endpoint is used later.",
      readiness: "needs-credential-strategy",
    }),
  ];
}

export function buildDeepSeekSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    credentialGuidance: ["Use DEEPSEEK_API_KEY as an env var name only; keep actual values outside the UI."],
  });
}

export function buildDeepSeekProviderAdapter(): ProviderAdapterDefinition {
  return {
    id: "deepseek",
    label: "DeepSeek",
    plainEnglishSummary:
      "DeepSeek is modeled separately for coding and reasoning route hints, even though compatible endpoint routing may be possible later.",
    providerFamily: "deepseek",
    contract: buildCloudApiContract({
      requestShape: "DeepSeek provider request metadata or compatible endpoint profile metadata.",
      connectionShape: "Env-key profile, OpenAI-compatible endpoint profile, or planned setup record.",
      noviceExplanation: "DeepSeek gets its own adapter so CodexForge can explain coding and economical reasoning routes clearly.",
    }),
    connectionModes: ["api-key-env", "openai-compatible-endpoint", "planned"],
    credentialStrategies: ["env-only", "local-secret-proxy-design"],
    privacyPosture: "external-cloud",
    automationReadiness: "definition-only",
    setupStatus: "needs-credential-strategy",
    supportedTaskTypes: ["coding", "reasoning", "summarizing", "review"],
    modelFamilies: buildDeepSeekModelFamilies(),
    capabilityProfile: buildDeepSeekCapabilityProfile(),
    routingHints: buildDeepSeekRoutingHints(),
    safetyProfile: buildDeepSeekSafetyProfile(),
    limitationNotes: ["No provider calls.", "No live pricing claims.", "Self-hosted/custom-compatible posture requires future review."],
    nextSetupStep: "Review whether DeepSeek will be configured directly or through a compatible endpoint later.",
  };
}
