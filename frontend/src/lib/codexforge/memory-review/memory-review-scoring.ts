import {
  type MemoryPromotionReadiness,
  type MemoryReviewCandidateInput,
  type MemoryReviewScore,
  buildMemoryReviewStableKey,
} from "./memory-review-types";

export function scoreMemoryReviewCandidate(
  candidate: MemoryReviewCandidateInput
): MemoryReviewScore {
  const confidence = clamp01(candidate.confidence);
  const contradictionRisk = clamp01(candidate.contradictionRisk ?? 0.18);
  const importanceScore = scoreImportance(candidate.importance);
  const sourceTraceabilityScore = scoreSourceTraceability(candidate);
  const repeatedSignalsScore = clamp01((candidate.repeatedSignals ?? 0) / 4);
  const recencyScore = clamp01(candidate.recencyScore ?? 0.58);
  const pinnedCriticalScore = clamp01((candidate.pinnedHint ? 0.18 : 0) + (candidate.criticalHint ? 0.22 : 0));
  const validationQualityScore = scoreValidationQuality(candidate.validationQuality);
  const safetyPostureScore = scoreSafetyPosture(candidate.safetyPosture);
  const score = clamp01(
    confidence * 0.28 +
      importanceScore * 0.14 +
      sourceTraceabilityScore * 0.15 +
      repeatedSignalsScore * 0.09 +
      (1 - contradictionRisk) * 0.16 +
      recencyScore * 0.07 +
      pinnedCriticalScore * 0.04 +
      validationQualityScore * 0.05 +
      safetyPostureScore * 0.02
  );
  const readiness = classifyMemoryPromotionReadiness({
    confidence,
    contradictionRisk,
    sourceTraceabilityScore,
    validationQualityScore,
    score,
  });
  const reasons = buildScoreReasons({
    confidence,
    contradictionRisk,
    sourceTraceabilityScore,
    repeatedSignalsScore,
    validationQualityScore,
    safetyPostureScore,
  });
  const result: MemoryReviewScore = {
    id: buildMemoryReviewStableKey("memory-review-score", candidate.id),
    score,
    readiness,
    confidence,
    importanceScore,
    sourceTraceabilityScore,
    repeatedSignalsScore,
    contradictionRisk,
    recencyScore,
    pinnedCriticalScore,
    validationQualityScore,
    safetyPostureScore,
    reasons,
    summary: [],
  };

  return { ...result, summary: summarizeMemoryReviewScore(result) };
}

export function classifyMemoryPromotionReadiness(args: {
  confidence: number;
  contradictionRisk: number;
  sourceTraceabilityScore: number;
  validationQualityScore: number;
  score: number;
}): MemoryPromotionReadiness {
  if (args.sourceTraceabilityScore < 0.45 || args.validationQualityScore <= 0.05) return "blocked";
  if (args.contradictionRisk >= 0.62 || args.confidence < 0.6) return "review-required";
  if (args.score >= 0.72 && args.confidence >= 0.68) return "ready-after-approval";
  return "needs-more-context";
}

export function summarizeMemoryReviewScore(score: MemoryReviewScore): string[] {
  return [
    `Review score ${(score.score * 100).toFixed(0)} with ${score.readiness} readiness.`,
    `Confidence ${(score.confidence * 100).toFixed(0)} and contradiction risk ${(score.contradictionRisk * 100).toFixed(0)}.`,
    score.sourceTraceabilityScore >= 0.45
      ? "Source traceability is present."
      : "Missing source traceability blocks promotion.",
  ];
}

function scoreImportance(importance: MemoryReviewCandidateInput["importance"]): number {
  switch (importance) {
    case "critical":
      return 1;
    case "high":
      return 0.82;
    case "medium":
      return 0.58;
    case "low":
      return 0.34;
  }
}

function scoreSourceTraceability(candidate: MemoryReviewCandidateInput): number {
  const refs = [
    candidate.sourceArtifactId,
    candidate.sourceRunId,
    candidate.sourceFileId,
    candidate.sourceMessageId,
    candidate.sourcePackId,
  ].filter(Boolean).length;

  if (!candidate.sourceSurface.trim()) return 0;
  return clamp01(0.2 + refs * 0.28);
}

function scoreValidationQuality(quality: MemoryReviewCandidateInput["validationQuality"]): number {
  switch (quality) {
    case "valid":
      return 1;
    case "needs-review":
      return 0.52;
    case "unknown":
    case undefined:
      return 0.34;
    case "blocked":
      return 0;
  }
}

function scoreSafetyPosture(posture?: string): number {
  const text = (posture ?? "").toLowerCase();
  if (text.includes("blocked")) return 0.1;
  if (text.includes("read-only") || text.includes("readonly") || text.includes("safe")) return 1;
  if (text.includes("review")) return 0.68;
  return 0.48;
}

function buildScoreReasons(args: {
  confidence: number;
  contradictionRisk: number;
  sourceTraceabilityScore: number;
  repeatedSignalsScore: number;
  validationQualityScore: number;
  safetyPostureScore: number;
}): string[] {
  return [
    args.confidence < 0.6 ? "low confidence review is required" : "confidence is reviewable",
    args.contradictionRisk >= 0.62 ? "contradiction risk requires review" : "contradiction risk is bounded",
    args.sourceTraceabilityScore < 0.45 ? "missing source traceability blocks promotion" : "source traceability present",
    args.repeatedSignalsScore > 0 ? "repeated signals improve confidence" : "single signal only",
    args.validationQualityScore <= 0.05 ? "validation blocks promotion" : "validation quality is acceptable for review",
    args.safetyPostureScore >= 0.68 ? "safety posture is reviewable" : "safety posture needs more context",
  ];
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}
