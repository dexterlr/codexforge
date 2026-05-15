import {
  uniqueEvidenceMemoryStrings,
  type EvidenceConfidenceDistribution,
  type EvidenceMemoryCandidate,
  type EvidenceMemoryReviewPolicy,
  type EvidenceMemorySummary,
  type NormalizedEvidenceBundle,
} from "./evidence-memory-types";

function buildDistribution(candidates: readonly EvidenceMemoryCandidate[]): EvidenceConfidenceDistribution {
  return {
    high: candidates.filter((candidate) => candidate.confidence >= 0.72).length,
    medium: candidates.filter((candidate) => candidate.confidence >= 0.45 && candidate.confidence < 0.72).length,
    low: candidates.filter((candidate) => candidate.confidence < 0.45).length,
  };
}

function selectTopCandidate(candidates: readonly EvidenceMemoryCandidate[]): EvidenceMemoryCandidate | null {
  return [...candidates].sort((left, right) => {
    if (right.confidence !== left.confidence) return right.confidence - left.confidence;
    if (right.importanceScore !== left.importanceScore) return right.importanceScore - left.importanceScore;
    return left.id.localeCompare(right.id);
  })[0] ?? null;
}

export function buildEvidenceMemorySummary(args: {
  evidence: NormalizedEvidenceBundle;
  candidates: readonly EvidenceMemoryCandidate[];
  policy?: EvidenceMemoryReviewPolicy | null;
}): EvidenceMemorySummary {
  const topCandidate = selectTopCandidate(args.candidates);
  const warnings = uniqueEvidenceMemoryStrings([
    ...args.evidence.warnings,
    ...args.candidates.flatMap((candidate) => candidate.warnings),
    ...(args.policy?.warnings ?? []),
  ]);
  const blockedReasons = uniqueEvidenceMemoryStrings([
    ...args.candidates.flatMap((candidate) => candidate.blockedReasons),
    ...(args.policy?.blockedReasons ?? []),
  ]);
  const summary: EvidenceMemorySummary = {
    id: "evidence-memory-summary",
    evidenceCount: args.evidence.items.length,
    candidateCount: args.candidates.length,
    confidenceDistribution: buildDistribution(args.candidates),
    topCandidate,
    warnings,
    blockedReasons,
    nextSafeAction: "Review execution evidence before memory promotion.",
    summary: [],
  };

  return { ...summary, summary: summarizeEvidenceLearningSession(summary) };
}

export function summarizeEvidenceLearningSession(summary: EvidenceMemorySummary): string[] {
  return [
    `${summary.evidenceCount} evidence item(s) produced ${summary.candidateCount} memory candidate(s).`,
    `Confidence distribution: ${summary.confidenceDistribution.high} high, ${summary.confidenceDistribution.medium} medium, ${summary.confidenceDistribution.low} low.`,
    summary.topCandidate
      ? `Top candidate: ${summary.topCandidate.title}.`
      : "No top candidate is available.",
    `${summary.blockedReasons.length} blocked reason(s) visible for review.`,
    summary.nextSafeAction,
  ];
}
