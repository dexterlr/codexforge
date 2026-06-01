import { buildProviderAdapterCapabilityProfile } from "./provider-adapter-capability";
import { buildLocalServerContract } from "./provider-adapter-contract";
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

export function buildOllamaModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "ollama-installed-models",
      label: "Ollama installed models",
      plainEnglish: "Local model capability depends on what you have installed and selected.",
      strengths: ["private prepass", "summarizing", "simple code help", "draft planning", "offline-ish workflows"],
      cautions: ["Quality depends on the model you have loaded.", "CodexForge will not assume your local server is running until a guarded health check is added."],
    }),
  ];
}

export function buildOllamaCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "planned",
    vision: "supported-by-some-models",
    longContext: "supported-by-some-models",
    localOnly: true,
    notes: [
      "Local models are best for privacy-first preprocessing and cheap drafts.",
      "Quality depends on the model you have loaded.",
      "No live local server call yet.",
    ],
  });
}

export function buildOllamaRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "ollama-private-prepass",
      label: "Private prepass",
      bestUse: "Use for privacy-first summarization, draft planning, and simple code help.",
      why: "The local/private posture keeps sensitive preprocessing away from cloud providers when the local model is good enough.",
      readiness: "needs-local-server",
    }),
  ];
}

export function buildOllamaSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    allowed: ["Local server URL placeholder http://localhost:11434", "Installed-model capability notes"],
    credentialGuidance: ["No API key required for the local placeholder profile."],
    operatorCopy: ["CodexForge will not assume your local server is running until a guarded health check is added."],
  });
}

export function buildOllamaLocalAdapter(): ProviderAdapterDefinition {
  return {
    id: "ollama-local",
    label: "Ollama",
    plainEnglishSummary:
      "Ollama is a local/private adapter target for privacy-first preprocessing, cheap drafts, and simple local model experiments.",
    providerFamily: "local-model",
    contract: buildLocalServerContract({
      requestShape: "Local chat request metadata against an Ollama-style local runtime.",
      connectionShape: "Local server placeholder http://localhost:11434 or local-only planned setup.",
      noviceExplanation: "A local adapter describes a model server on your machine. This phase does not check whether it is running.",
    }),
    connectionModes: ["local-server", "planned"],
    credentialStrategies: ["no-secret-needed"],
    privacyPosture: "local-private",
    automationReadiness: "health-check-planned",
    setupStatus: "needs-local-server",
    supportedTaskTypes: ["private-prepass", "summarizing", "coding", "patch-planning"],
    modelFamilies: buildOllamaModelFamilies(),
    capabilityProfile: buildOllamaCapabilityProfile(),
    routingHints: buildOllamaRoutingHints(),
    safetyProfile: buildOllamaSafetyProfile(),
    limitationNotes: ["No fetch call in this phase.", "No assumptions that server is running.", "Capability depends on installed local models."],
    nextSetupStep: "Install or load a local model, then wait for a future guarded health check before runtime use.",
  };
}
