import type {
  CodexForgeInsightQueue,
  CodexForgeRecommendationSeverity,
  CodexForgeRecommendationStatus,
  CodexForgeRuntimeInsight,
  CodexForgeRuntimeRecommendation,
} from "./recommendation-types";
import { getRecommendationSeverityWeight } from "./recommendation-prioritizer";

export function buildRuntimeInsight(
  recommendation: CodexForgeRuntimeRecommendation
): CodexForgeRuntimeInsight {
  return {
    id: `insight:${recommendation.id}`,
    recommendationId: recommendation.id,
    kind: recommendation.kind,
    title: recommendation.title,
    detail: recommendation.summary,
    severity: recommendation.severity,
    status: recommendation.status,
    confidence: recommendation.confidence,
    score: recommendation.score,
    timestamp: recommendation.updatedAt,
    evidence: recommendation.evidence,
    relatedNodeIds: recommendation.relatedNodeIds,
    relatedFilePaths: recommendation.relatedFilePaths,
    action: recommendation.nextSafeAction,
    whyItMatters: recommendation.whyItMatters,
  };
}

function sortInsights(
  insights: readonly CodexForgeRuntimeInsight[]
): CodexForgeRuntimeInsight[] {
  return [...insights].sort((a, b) => {
    const severityDelta = getRecommendationSeverityWeight(b.severity) - getRecommendationSeverityWeight(a.severity);
    if (severityDelta !== 0) return severityDelta;
    if (b.confidence !== a.confidence) return b.confidence - a.confidence;
    if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
    return a.id.localeCompare(b.id);
  });
}

function groupBy<T extends string>(
  insights: readonly CodexForgeRuntimeInsight[],
  select: (insight: CodexForgeRuntimeInsight) => T
): Record<string, CodexForgeRuntimeInsight[]> {
  const groups: Record<string, CodexForgeRuntimeInsight[]> = {};
  for (const insight of insights) {
    const key = select(insight);
    groups[key] = groups[key] ?? [];
    groups[key].push(insight);
  }
  return Object.fromEntries(
    Object.entries(groups)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, group]) => [key, sortInsights(group)])
  );
}

export function groupInsightsByKind(
  insights: readonly CodexForgeRuntimeInsight[]
): Record<string, CodexForgeRuntimeInsight[]> {
  return groupBy(insights, (insight) => insight.kind);
}

export function filterResolvedInsights(
  insights: readonly CodexForgeRuntimeInsight[]
): CodexForgeRuntimeInsight[] {
  return insights.filter((insight) => insight.status !== "resolved");
}

export function buildInsightQueue(args: {
  recommendations: readonly CodexForgeRuntimeRecommendation[];
  generatedAt?: number;
  includeResolved?: boolean;
}): CodexForgeInsightQueue {
  const generatedAt = args.generatedAt ?? Math.max(0, ...args.recommendations.map((item) => item.updatedAt));
  const raw = args.recommendations.map(buildRuntimeInsight);
  const insights = sortInsights(args.includeResolved ? raw : filterResolvedInsights(raw));

  return {
    generatedAt,
    insights,
    groups: {
      byKind: groupInsightsByKind(insights),
      byStatus: groupBy(insights, (insight): CodexForgeRecommendationStatus => insight.status),
      bySeverity: groupBy(insights, (insight): CodexForgeRecommendationSeverity => insight.severity),
    },
    summary: {
      total: insights.length,
      critical: insights.filter((insight) => insight.severity === "critical").length,
      high: insights.filter((insight) => insight.severity === "high").length,
      needsReview: insights.filter((insight) => insight.status === "needs-review").length,
      blocked: insights.filter((insight) => insight.status === "blocked").length,
      readOnlyActions: insights.filter((insight) => insight.action.readOnly).length,
      approvalRequiredActions: insights.filter((insight) => insight.action.approvalRequired).length,
    },
  };
}
