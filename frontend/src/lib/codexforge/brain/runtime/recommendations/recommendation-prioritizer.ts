import type {
  CodexForgeRecommendationSeverity,
  CodexForgeRuntimeRecommendation,
} from "./recommendation-types";

export function normalizeRecommendationScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function getRecommendationSeverityWeight(
  severity: CodexForgeRecommendationSeverity
): number {
  switch (severity) {
    case "critical":
      return 1;
    case "high":
      return 0.82;
    case "medium":
      return 0.62;
    case "low":
      return 0.4;
    case "info":
      return 0.22;
  }
}

export function scoreRuntimeRecommendation(
  recommendation: CodexForgeRuntimeRecommendation
): number {
  const severity = getRecommendationSeverityWeight(recommendation.severity);
  const confidence = normalizeRecommendationScore(recommendation.confidence);
  const baseScore = normalizeRecommendationScore(recommendation.score);
  const reasons = new Set(recommendation.reasons);
  const kindBoost =
    recommendation.kind === "resolve-contradiction"
      ? 0.12
      : recommendation.kind === "verify-execution"
        ? 0.1
        : recommendation.kind === "refresh-context"
          ? 0.08
          : recommendation.kind === "curate-memory" || recommendation.kind === "promote-concept"
            ? 0.07
            : recommendation.kind === "protect-approval-boundary"
              ? 0.11
              : 0;
  const reasonBoost =
    (reasons.has("critical-risk") || reasons.has("high-risk") ? 0.1 : 0) +
    (reasons.has("failed-execution") ? 0.09 : 0) +
    (reasons.has("stale-context") ? 0.07 : 0) +
    (reasons.has("pinned-memory") || reasons.has("high-importance-memory") ? 0.06 : 0) +
    (reasons.has("approval-boundary") ? 0.08 : 0);

  return normalizeRecommendationScore(
    severity * 0.42 + confidence * 0.24 + baseScore * 0.22 + kindBoost + reasonBoost
  );
}

export function prioritizeRuntimeRecommendations(
  recommendations: readonly CodexRuntimeRecommendationAlias[]
): CodexRuntimeRecommendationAlias[] {
  return [...recommendations]
    .map((recommendation) => ({
      ...recommendation,
      score: scoreRuntimeRecommendation(recommendation),
    }))
    .sort((a, b) => {
      const severityDelta = getRecommendationSeverityWeight(b.severity) - getRecommendationSeverityWeight(a.severity);
      if (severityDelta !== 0) return severityDelta;
      if (b.score !== a.score) return b.score - a.score;
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
      return a.id.localeCompare(b.id);
    });
}

type CodexRuntimeRecommendationAlias = CodexForgeRuntimeRecommendation;
