import type { AiSubscriptionTier, AiTaskRequirements } from "./ai-router-types";

export function buildAiSubscriptionTier(
  tier: Partial<AiSubscriptionTier> & Pick<AiSubscriptionTier, "id" | "providerId" | "label" | "strategy">
): AiSubscriptionTier {
  return {
    priority: 50,
    includedUsageNote: "Manual estimate only.",
    manualCostNote: "No live billing integration.",
    resetCadence: "unknown",
    preferForTasks: [],
    avoidForTasks: [],
    ...tier,
  };
}

export function buildDefaultAiSubscriptionTiers(): AiSubscriptionTier[] {
  return [
    buildAiSubscriptionTier({
      id: "local-hardware",
      providerId: "local",
      label: "Local hardware",
      strategy: "local-hardware",
      priority: 96,
      includedUsageNote: "Uses local machine capacity.",
      manualCostNote: "No provider billing; electricity/hardware not estimated.",
      resetCadence: "none",
      preferForTasks: ["summarization", "extraction", "memory-ingestion", "low-risk-draft"],
    }),
    buildAiSubscriptionTier({
      id: "api-fast-manual",
      providerId: "openai-compatible",
      label: "Fast API manual budget",
      strategy: "api-usage-billing",
      dailyTokenBudget: 120000,
      requestBudget: 200,
      priority: 70,
      includedUsageNote: "Operator-managed request and token ceiling.",
      manualCostNote: "Placeholder budget; not connected to provider billing.",
      resetCadence: "daily",
      preferForTasks: ["chat", "summarization", "extraction", "low-risk-draft"],
      avoidForTasks: ["high-risk-apply-review"],
    }),
    buildAiSubscriptionTier({
      id: "subscription-premium-manual",
      providerId: "manual-subscription",
      label: "Premium subscription manual pool",
      strategy: "paid-subscription",
      monthlyBudget: 20,
      priority: 82,
      includedUsageNote: "Manual subscription value profile.",
      manualCostNote: "No exact usage claim; operator updates limits.",
      resetCadence: "monthly",
      preferForTasks: ["brain-reasoning", "diff-review", "high-risk-apply-review"],
      avoidForTasks: ["low-risk-draft", "extraction"],
    }),
    buildAiSubscriptionTier({
      id: "ollama-local",
      providerId: "ollama",
      label: "Ollama local capacity",
      strategy: "local-hardware",
      priority: 90,
      includedUsageNote: "Local server model capacity.",
      manualCostNote: "No provider billing.",
      resetCadence: "none",
      preferForTasks: ["code-inspection", "summarization", "memory-ingestion"],
    }),
    buildAiSubscriptionTier({
      id: "unknown-manual",
      providerId: "custom-http",
      label: "Unknown manual provider",
      strategy: "manual-unknown",
      priority: 30,
      includedUsageNote: "Operator has not configured usage assumptions.",
      manualCostNote: "Unknown; route only as fallback.",
      resetCadence: "unknown",
    }),
  ];
}

export function scoreSubscriptionFit(tier: AiSubscriptionTier, task: AiTaskRequirements): number {
  const prefer = tier.preferForTasks.includes(task.taskKind) ? 24 : 0;
  const avoid = tier.avoidForTasks.includes(task.taskKind) ? 32 : 0;
  const localBonus =
    tier.strategy === "local-hardware" && (task.privacyLevel === "private" || task.privacyLevel === "secret")
      ? 28
      : 0;
  const cheapBonus = task.costSensitivity === "high" && tier.strategy !== "api-usage-billing" ? 10 : 0;

  return Math.max(0, tier.priority + prefer + localBonus + cheapBonus - avoid);
}

export function summarizeAiSubscriptionTier(tier: AiSubscriptionTier): string {
  return `${tier.label}: ${tier.strategy}, priority ${tier.priority}, reset ${tier.resetCadence}, ${tier.manualCostNote}`;
}
