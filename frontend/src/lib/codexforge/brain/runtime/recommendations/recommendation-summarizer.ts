import type {
  CodexForgeInsightQueue,
  CodexForgeRecommendationAction,
  CodexForgeRecommendationSeverity,
  CodexForgeRecommendationSummary,
  CodexForgeRuntimeInsight,
  CodexForgeRuntimeRecommendation,
} from "./recommendation-types";
import { buildInsightQueue } from "./insight-queue";
import { prioritizeRuntimeRecommendations } from "./recommendation-prioritizer";

const SEVERITIES: CodexForgeRecommendationSeverity[] = ["info", "low", "medium", "high", "critical"];

function firstByKind(
  recommendations: readonly CodexForgeRuntimeRecommendation[],
  kinds: readonly CodexForgeRuntimeRecommendation["kind"][]
): CodexForgeRuntimeRecommendation | undefined {
  return recommendations.find((recommendation) => kinds.includes(recommendation.kind));
}

export function recommendNextSafeBrainAction(
  recommendations: readonly CodexForgeRuntimeRecommendation[]
): CodexForgeRecommendationAction | undefined {
  return prioritizeRuntimeRecommendations(recommendations)
    .map((recommendation) => recommendation.nextSafeAction)
    .find((action) => action.readOnly && action.safety === "read-only");
}

export function summarizeRuntimeRecommendations(
  recommendations: readonly CodexForgeRuntimeRecommendation[],
  generatedAt?: number
): CodexForgeRecommendationSummary {
  const ordered = prioritizeRuntimeRecommendations(recommendations);
  const severityCounts = Object.fromEntries(
    SEVERITIES.map((severity) => [
      severity,
      ordered.filter((recommendation) => recommendation.severity === severity).length,
    ])
  ) as Record<CodexForgeRecommendationSeverity, number>;

  return {
    generatedAt: generatedAt ?? Math.max(0, ...ordered.map((item) => item.updatedAt)),
    total: ordered.length,
    topRisk: firstByKind(ordered, ["inspect-risk", "protect-approval-boundary"]),
    topStaleContext: firstByKind(ordered, ["refresh-context"]),
    topContradiction: firstByKind(ordered, ["resolve-contradiction"]),
    topMemoryPromotion: firstByKind(ordered, ["promote-concept", "curate-memory"]),
    topArchitectureHotspot: firstByKind(ordered, ["review-architecture", "inspect-file-hotspot"]),
    topAgentReview: firstByKind(ordered, ["review-agent-handoff", "plan-next-step"]),
    nextSafeAction: recommendNextSafeBrainAction(ordered),
    severityCounts,
    readOnlyActions: ordered.filter((recommendation) => recommendation.nextSafeAction.readOnly).length,
    approvalRequiredActions: ordered.filter((recommendation) => recommendation.nextSafeAction.approvalRequired).length,
  };
}

export function selectTopRuntimeInsights(
  queueOrRecommendations: CodexForgeInsightQueue | readonly CodexForgeRuntimeRecommendation[],
  limit = 5
): CodexForgeRuntimeInsight[] {
  const queue = "insights" in queueOrRecommendations
    ? queueOrRecommendations
    : buildInsightQueue({ recommendations: queueOrRecommendations });
  return queue.insights.slice(0, limit);
}

export function summarizeInsightQueue(queue: CodexForgeInsightQueue): string {
  const next = queue.insights.find((insight) => insight.action.readOnly)?.action.label ?? "Inspect graph overview";
  return `Insight queue has ${queue.summary.total} items, ${queue.summary.critical} critical, ${queue.summary.high} high, ${queue.summary.needsReview} needing review. Next safe action: ${next}.`;
}
