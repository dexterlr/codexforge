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

export function buildOpenAiCompatibleModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "openai-api-models",
      label: "OpenAI API models",
      plainEnglish: "Cloud models selected through an OpenAI API profile.",
      strengths: ["coding", "summarizing", "patch planning", "review", "premium escalation"],
      cautions: ["Exact capabilities depend on the selected model.", "No live pricing claims in this layer."],
    }),
    buildProviderAdapterModelFamily({
      id: "openrouter-compatible-models",
      label: "OpenRouter compatible models",
      plainEnglish: "Aggregator-style cloud routing where many model families can share a familiar request format.",
      strengths: ["model choice", "fallback planning", "review"],
      cautions: ["Aggregator-cloud privacy posture.", "Provider identity must remain visible to the operator."],
    }),
    buildProviderAdapterModelFamily({
      id: "custom-compatible-endpoint",
      label: "Custom compatible endpoint",
      plainEnglish: "A user-reviewed endpoint that claims the OpenAI-compatible request shape.",
      strengths: ["custom deployment", "local or private gateway planning"],
      cautions: ["User-reviewed only.", "CodexForge will not trust an endpoint without setup review."],
    }),
  ];
}

export function buildOpenAiCompatibleCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "supported-by-some-models",
    vision: "supported-by-some-models",
    longContext: "supported-by-some-models",
    localOnly: false,
    notes: [
      "Supports a chat-completions style shape for planning.",
      "OpenAI-compatible means the request format is familiar, not that every provider is identical.",
      "CodexForge will still show which provider, model, and privacy posture is being used.",
    ],
  });
}

export function buildOpenAiCompatibleRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "openai-compatible-coding",
      label: "Coding and patch planning",
      bestUse: "Use when a selected model is known to be strong at code and review.",
      why: "The familiar chat shape can support coding, summarization, and review workflows later.",
      readiness: "definition-ready",
    }),
    buildProviderAdapterRoutingHint({
      id: "openai-compatible-custom-review",
      label: "Custom endpoint review",
      bestUse: "Use only after the operator reviews provider identity, endpoint, and privacy posture.",
      why: "Compatible request shape does not prove safety, quality, or provider equivalence.",
      readiness: "needs-credential-strategy",
    }),
  ];
}

export function buildOpenAiCompatibleSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    allowed: ["OpenAI API profile definitions", "OpenRouter aggregator profile definitions", "Custom endpoint metadata"],
    credentialGuidance: ["Use OPENAI_API_KEY or OPENROUTER_API_KEY as env var names only; keep actual values outside the UI."],
  });
}

export function buildOpenAiCompatibleAdapter(): ProviderAdapterDefinition {
  return {
    id: "openai-compatible",
    label: "OpenAI-compatible",
    plainEnglishSummary:
      "OpenAI-compatible adapters describe a familiar request format used by OpenAI API, OpenRouter, and reviewed compatible endpoints. The format is familiar, but providers are not identical.",
    providerFamily: "openai-compatible",
    contract: buildCloudApiContract({
      requestShape: "Chat-completions style messages, model id, optional tools, optional vision fields by model.",
      connectionShape: "Env-key cloud API, aggregator endpoint, custom compatible endpoint, or local-compatible server placeholder.",
      noviceExplanation:
        "An adapter is a safe description of how CodexForge could talk to a provider later. This one covers providers that use an OpenAI-like request shape.",
    }),
    connectionModes: ["api-key-env", "openai-compatible-endpoint", "local-server", "planned"],
    credentialStrategies: ["env-only", "local-secret-proxy-design"],
    privacyPosture: "aggregator-cloud",
    automationReadiness: "definition-only",
    setupStatus: "definition-ready",
    supportedTaskTypes: ["coding", "summarizing", "patch-planning", "review", "reasoning", "long-context"],
    modelFamilies: buildOpenAiCompatibleModelFamilies(),
    capabilityProfile: buildOpenAiCompatibleCapabilityProfile(),
    routingHints: buildOpenAiCompatibleRoutingHints(),
    safetyProfile: buildOpenAiCompatibleSafetyProfile(),
    limitationNotes: [
      "No live provider calls yet.",
      "No live pricing claims.",
      "Custom endpoints are user-reviewed only.",
      "LM Studio can expose a compatible local endpoint, but its main local adapter is separate.",
    ],
    nextSetupStep: "Review .env.local guidance and provider identity before any future health check.",
  };
}
