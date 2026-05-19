import type { AiModelCatalogEntry, AiSubscriptionTier, AiTaskRequirements, AiTokenBudget } from "./ai-router-types";

const responseEstimate: Record<string, number> = {
  chat: 900,
  "code-inspection": 1400,
  "code-generation": 2200,
  "patch-planning": 1600,
  "diff-review": 1800,
  summarization: 700,
  extraction: 600,
  "memory-ingestion": 500,
  "brain-reasoning": 2400,
  "creative-planning": 1600,
  research: 1800,
  "tool-execution-review": 1400,
  "low-risk-draft": 700,
  "high-risk-apply-review": 2600,
};

export function estimateAiTokenUsage(promptText: string, task: AiTaskRequirements) {
  const estimatedInputTokens = Math.max(1, Math.ceil(promptText.length / 4));
  const estimatedOutputTokens = responseEstimate[task.taskKind] ?? 900;

  return {
    estimatedInputTokens,
    estimatedOutputTokens,
    estimatedTotalTokens: estimatedInputTokens + estimatedOutputTokens,
  };
}

function estimateCostScore(
  model: AiModelCatalogEntry | null | undefined,
  tier: AiSubscriptionTier | null | undefined,
  totalTokens: number
): number {
  if (!model) return 50;
  if (model.supportsLocalOffline || tier?.strategy === "local-hardware") return 4;
  const manualUnitCost = (model.inputTokenCostEstimate ?? 0) + (model.outputTokenCostEstimate ?? 0);
  const liveCostUnknownPenalty = manualUnitCost <= 0 ? 20 : 0;
  const usagePressure = tier?.dailyTokenBudget ? Math.round((totalTokens / tier.dailyTokenBudget) * 100) : 18;
  return Math.min(100, liveCostUnknownPenalty + usagePressure);
}

export function buildAiTokenBudget(args: {
  promptText: string;
  task: AiTaskRequirements;
  model?: AiModelCatalogEntry | null;
  tier?: AiSubscriptionTier | null;
}): AiTokenBudget {
  const usage = estimateAiTokenUsage(args.promptText, args.task);
  const expensiveContext = usage.estimatedInputTokens > 12000 || args.task.requiredContextSize === "very-large";
  const compressionRecommended = expensiveContext || usage.estimatedTotalTokens > 24000;
  const costScore = estimateCostScore(args.model, args.tier, usage.estimatedTotalTokens);
  const notes = [
    "Token estimates are approximate and based on chars/4.",
    "No live billing or provider pricing is queried.",
    compressionRecommended ? "Compression or local pre-pass is recommended." : "Direct routing budget is acceptable.",
  ];

  return {
    approximate: true,
    promptChars: args.promptText.length,
    ...usage,
    expensiveContext,
    compressionRecommended,
    costScore,
    notes,
  };
}

export function summarizeAiTokenBudget(budget: AiTokenBudget): string {
  return `Approximate ${budget.estimatedTotalTokens} total tokens (${budget.estimatedInputTokens} in, ${budget.estimatedOutputTokens} out), compression ${budget.compressionRecommended ? "recommended" : "optional"}.`;
}

export function recommendTokenCompressionPlan(budget: AiTokenBudget): string[] {
  if (!budget.compressionRecommended) {
    return ["Use direct route; keep fallback chain ready."];
  }

  return [
    "Run a local-first summarization or extraction pre-pass.",
    "Keep only current task files, diffs, and approval context in the premium route.",
    "Send citations and compact summaries instead of raw logs where possible.",
  ];
}
