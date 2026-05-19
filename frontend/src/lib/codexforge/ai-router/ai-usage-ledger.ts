import type { AiRouteRecommendation, AiTaskRequirements, AiUsageLedger, AiUsageLedgerItem } from "./ai-router-types";

export function buildAiUsageLedgerItem(args: {
  requestId: string;
  task: AiTaskRequirements;
  route: AiRouteRecommendation;
  timestampLabel?: string;
  status?: AiUsageLedgerItem["status"];
}): AiUsageLedgerItem {
  return {
    requestId: args.requestId,
    taskKind: args.task.taskKind,
    providerId: args.route.provider?.id ?? "blocked",
    modelId: args.route.model?.id ?? "blocked",
    tierId: args.route.tier?.id ?? "manual-review",
    estimatedInputTokens: args.route.estimatedTokenBudget.estimatedInputTokens,
    estimatedOutputTokens: args.route.estimatedTokenBudget.estimatedOutputTokens,
    costPosture: args.route.estimatedCostPosture,
    routeReason: args.route.reason,
    timestampLabel: args.timestampLabel,
    status: args.status ?? (args.route.blockedReasons.length > 0 ? "blocked" : "planned"),
    savingsNote:
      args.route.estimatedCostPosture === "local"
        ? "Local-first route avoids provider billing for this task."
        : "Subscription-efficient routing reserves premium use for higher-value tasks.",
  };
}

export function buildAiUsageLedger(items: AiUsageLedgerItem[] = []): AiUsageLedger {
  return {
    items,
    summary: summarizeAiUsageLedger(items),
  };
}

export function calculateAiUsageEfficiency(items: AiUsageLedgerItem[]): {
  localFirstCount: number;
  blockedCount: number;
  estimatedTokenTotal: number;
  subscriptionEfficientCount: number;
} {
  return {
    localFirstCount: items.filter((item) => item.costPosture === "local").length,
    blockedCount: items.filter((item) => item.status === "blocked").length,
    estimatedTokenTotal: items.reduce(
      (sum, item) => sum + item.estimatedInputTokens + item.estimatedOutputTokens,
      0
    ),
    subscriptionEfficientCount: items.filter((item) =>
      ["local", "free", "low"].includes(item.costPosture)
    ).length,
  };
}

export function summarizeAiUsageLedger(itemsOrLedger: AiUsageLedgerItem[] | AiUsageLedger): string {
  const items = Array.isArray(itemsOrLedger) ? itemsOrLedger : itemsOrLedger.items;
  const efficiency = calculateAiUsageEfficiency(items);
  return `${items.length} ledger preview item(s), ${efficiency.localFirstCount} local-first, ${efficiency.subscriptionEfficientCount} subscription-efficient, approximate ${efficiency.estimatedTokenTotal} tokens.`;
}
