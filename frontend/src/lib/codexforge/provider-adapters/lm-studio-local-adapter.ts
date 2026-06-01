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

export function buildLmStudioModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "lm-studio-loaded-model",
      label: "LM Studio loaded model",
      plainEnglish: "LM Studio quality depends on the model you have loaded and the local endpoint mode you choose.",
      strengths: ["local chat", "model testing", "private prepass", "draft planning"],
      cautions: ["Quality depends on the model you have loaded.", "OpenAI-compatible endpoint mode is controlled by the user."],
    }),
  ];
}

export function buildLmStudioCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "planned",
    vision: "supported-by-some-models",
    longContext: "supported-by-some-models",
    localOnly: true,
    notes: [
      "Good for local chat, model testing, and private prepass depending on loaded model.",
      "May expose an OpenAI-compatible endpoint, but the user controls it.",
      "No live local server call yet.",
    ],
  });
}

export function buildLmStudioRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "lm-studio-local-testing",
      label: "Local model testing",
      bestUse: "Use for local/private model comparison and draft planning when a suitable model is loaded.",
      why: "The local/private posture makes it useful before cloud escalation.",
      readiness: "needs-local-server",
    }),
  ];
}

export function buildLmStudioSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    allowed: ["Local server URL placeholder http://localhost:1234", "OpenAI-compatible local endpoint metadata"],
    credentialGuidance: ["No API key is captured by CodexForge for the local placeholder profile."],
    operatorCopy: ["LM Studio endpoint mode is user-controlled and remains definition-only here."],
  });
}

export function buildLmStudioLocalAdapter(): ProviderAdapterDefinition {
  return {
    id: "lm-studio-local",
    label: "LM Studio",
    plainEnglishSummary:
      "LM Studio is a local/private adapter target for local chat, model testing, and private prepass work. It may expose an OpenAI-compatible local endpoint, but the user controls it.",
    providerFamily: "local-model",
    contract: buildLocalServerContract({
      requestShape: "Local chat metadata or OpenAI-compatible local endpoint metadata.",
      connectionShape: "Local server placeholder http://localhost:1234 or user-controlled OpenAI-compatible local endpoint.",
      noviceExplanation: "LM Studio can run models locally. CodexForge records the shape only and does not call the local server yet.",
    }),
    connectionModes: ["local-server", "openai-compatible-endpoint"],
    credentialStrategies: ["no-secret-needed"],
    privacyPosture: "local-private",
    automationReadiness: "health-check-planned",
    setupStatus: "needs-local-server",
    supportedTaskTypes: ["private-prepass", "local-model-testing", "summarizing", "patch-planning"],
    modelFamilies: buildLmStudioModelFamilies(),
    capabilityProfile: buildLmStudioCapabilityProfile(),
    routingHints: buildLmStudioRoutingHints(),
    safetyProfile: buildLmStudioSafetyProfile(),
    limitationNotes: ["No fetch call in this phase.", "No assumptions that server is running.", "Capability depends on the loaded local model."],
    nextSetupStep: "Load a model in LM Studio, then wait for a future guarded health check before runtime use.",
  };
}
