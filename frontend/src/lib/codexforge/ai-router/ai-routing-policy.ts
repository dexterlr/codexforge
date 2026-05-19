import type { AiProviderProfile, AiRoutingPolicy, AiTaskRequirements } from "./ai-router-types";

export function buildAiRoutingPolicy(overrides: Partial<AiRoutingPolicy> = {}): AiRoutingPolicy {
  return {
    id: "codexforge-local-deterministic-ai-routing-policy",
    localFirst: true,
    subscriptionEfficient: true,
    requireExplicitSecretApproval: true,
    allowExternalForPrivate: false,
    allowExternalForSecrets: false,
    preferLocalTaskKinds: ["summarization", "extraction", "memory-ingestion", "low-risk-draft"],
    preferCheapTaskKinds: ["chat", "summarization", "extraction", "low-risk-draft"],
    preferPremiumTaskKinds: ["brain-reasoning", "diff-review", "high-risk-apply-review", "tool-execution-review"],
    longContextThresholdTokens: 24000,
    fallbackDepth: 3,
    rules: [
      "Prefer local for private preprocessing and low-risk drafts.",
      "Prefer cheap or fast profiles for summaries, extraction, and rough drafts.",
      "Prefer premium profiles for high-risk reasoning, diff review, and apply review.",
      "Prefer long-context profiles for large repo history or file packs.",
      "Avoid external providers for private or secret material unless explicitly allowed.",
      "Never send secrets unless policy and operator approval both allow it.",
    ],
    ...overrides,
  };
}

export function isAiRouteAllowed(args: {
  policy: AiRoutingPolicy;
  task: AiTaskRequirements;
  provider: AiProviderProfile;
}): { allowed: boolean; reasons: string[] } {
  const reasons: string[] = [];

  if (args.provider.status === "disabled" || args.provider.status === "planned") {
    reasons.push(`Provider is ${args.provider.status}.`);
  }

  if (args.provider.status === "missing-secret") {
    reasons.push("Provider secret is missing and secrets must be server-side/env-only.");
  }

  if (args.task.privacyLevel === "private" && args.provider.connectionMode === "api" && !args.policy.allowExternalForPrivate) {
    reasons.push("External API route blocked for private context.");
  }

  if (args.task.privacyLevel === "secret" && !args.provider.supportsLocalOffline && !args.policy.allowExternalForSecrets) {
    reasons.push("External route blocked for secret context.");
  }

  return {
    allowed: reasons.length === 0,
    reasons,
  };
}

export function evaluateAiRoutingPolicy(args: {
  policy: AiRoutingPolicy;
  task: AiTaskRequirements;
  provider: AiProviderProfile;
}): string[] {
  const decision = isAiRouteAllowed(args);
  if (!decision.allowed) return decision.reasons;

  const notes = ["Route allowed by deterministic policy."];
  if (args.policy.preferLocalTaskKinds.includes(args.task.taskKind)) {
    notes.push("Local-first route preferred for this task class.");
  }
  if (args.policy.preferPremiumTaskKinds.includes(args.task.taskKind)) {
    notes.push("Premium escalation is appropriate if context is non-secret and provider is configured.");
  }
  return notes;
}

export function summarizeAiRoutingPolicy(policy: AiRoutingPolicy): string {
  return `${policy.localFirst ? "Local-first" : "Provider-first"}, ${policy.subscriptionEfficient ? "subscription-efficient" : "manual"}, fallback depth ${policy.fallbackDepth}.`;
}
