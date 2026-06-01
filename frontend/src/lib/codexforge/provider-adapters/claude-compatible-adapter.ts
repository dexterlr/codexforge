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

export function buildClaudeModelFamilies(): ProviderAdapterModelFamily[] {
  return [
    buildProviderAdapterModelFamily({
      id: "claude-api-models",
      label: "Claude API models",
      plainEnglish: "Claude models reached through an official API profile after env-only credential review.",
      strengths: ["long reasoning", "writing", "review", "planning", "coding assistance", "summarization"],
      cautions: ["Not OpenAI-compatible by default.", "Capabilities depend on the selected model and provider setup."],
    }),
    buildProviderAdapterModelFamily({
      id: "claude-manual-subscription",
      label: "Claude manual subscription",
      plainEnglish: "Manual browser handoff profile for users who have a Claude web subscription.",
      strengths: ["careful review", "writing", "reasoning handoff"],
      cautions: ["Manual only.", "No login automation and no browser cookie storage."],
    }),
  ];
}

export function buildClaudeCapabilityProfile(): ProviderAdapterCapabilityProfile {
  return buildProviderAdapterCapabilityProfile({
    chat: true,
    toolUse: "supported-by-some-models",
    vision: "supported-by-some-models",
    longContext: "supported-by-some-models",
    localOnly: false,
    notes: [
      "Claude uses its own adapter contract rather than the OpenAI-compatible shape by default.",
      "Use Claude for strong reasoning/review when the task is worth escalation.",
      "Claude web subscriptions stay manual unless you connect an official API key.",
    ],
  });
}

export function buildClaudeRoutingHints(): ProviderAdapterRoutingHint[] {
  return [
    buildProviderAdapterRoutingHint({
      id: "claude-review-escalation",
      label: "Reasoning and review escalation",
      bestUse: "Use for long reasoning, planning, writing, careful review, and coding assistance.",
      why: "Claude is represented separately so request shape, manual handoff, and API setup stay clear.",
      readiness: "manual-handoff-only",
    }),
  ];
}

export function buildClaudeSafetyProfile(): ProviderAdapterSafetyProfile {
  return buildDefaultProviderAdapterSafetyProfile({
    blocked: ["No password or browser cookie storage", "No Claude browser login automation"],
    allowed: ["Official API key profile planning", "Manual browser handoff guidance"],
    credentialGuidance: ["Use ANTHROPIC_API_KEY as an env var name only; never paste the value into the UI."],
    operatorCopy: ["Claude web subscriptions stay manual unless you connect an official API key."],
  });
}

export function buildClaudeCompatibleAdapter(): ProviderAdapterDefinition {
  return {
    id: "claude-compatible",
    label: "Claude-compatible",
    plainEnglishSummary:
      "Claude-compatible adapters describe Anthropic-style API setup and manual Claude web handoff separately from OpenAI-compatible providers.",
    providerFamily: "claude-compatible",
    contract: buildCloudApiContract({
      requestShape: "Claude/Anthropic-style messages, model id, and model-dependent tools or vision fields.",
      connectionShape: "Official API profile through env-only credential strategy, plus manual browser handoff where relevant.",
      noviceExplanation:
        "Claude has its own adapter style because the official API shape and manual subscription handoff are different from OpenAI-compatible providers.",
    }),
    connectionModes: ["api-key-env", "manual-browser", "planned"],
    credentialStrategies: ["env-only", "manual-handoff"],
    privacyPosture: "manual-browser",
    automationReadiness: "manual-only",
    setupStatus: "manual-handoff-only",
    supportedTaskTypes: ["reasoning", "writing", "review", "coding", "summarizing", "long-context"],
    modelFamilies: buildClaudeModelFamilies(),
    capabilityProfile: buildClaudeCapabilityProfile(),
    routingHints: buildClaudeRoutingHints(),
    safetyProfile: buildClaudeSafetyProfile(),
    limitationNotes: ["No live provider calls yet.", "No login automation.", "Manual subscription profiles remain manual/browser handoff only."],
    nextSetupStep: "Choose manual browser handoff or prepare an official API key reference outside the UI.",
  };
}
