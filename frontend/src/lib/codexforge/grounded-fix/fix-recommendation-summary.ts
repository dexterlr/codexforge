import { rankGroundedFixCandidates } from "./fix-confidence";
import type { GroundedFixCandidate, GroundedFixRecommendationPolicy, GroundedFixRecommendationSummary, GroundedFixRiskLevel, GroundedFixSignal } from "./grounded-fix-types";

export function buildGroundedFixRecommendationSummary(args: {
  signals?: readonly GroundedFixSignal[];
  candidates?: readonly GroundedFixCandidate[];
  policy?: GroundedFixRecommendationPolicy;
} = {}): GroundedFixRecommendationSummary {
  const signals = args.signals ?? [];
  const candidates = args.candidates ?? [];
  const ranked = rankGroundedFixCandidates(candidates);
  const confidenceDistribution = {
    high: candidates.filter((candidate) => candidate.confidence >= 0.72).length,
    medium: candidates.filter((candidate) => candidate.confidence >= 0.45 && candidate.confidence < 0.72).length,
    low: candidates.filter((candidate) => candidate.confidence < 0.45).length,
  };
  const riskDistribution: Record<GroundedFixRiskLevel, number> = {
    low: candidates.filter((candidate) => candidate.riskLevel === "low").length,
    medium: candidates.filter((candidate) => candidate.riskLevel === "medium").length,
    high: candidates.filter((candidate) => candidate.riskLevel === "high").length,
    critical: candidates.filter((candidate) => candidate.riskLevel === "critical").length,
  };
  const topCandidate = ranked[0] ?? null;

  return {
    id: "grounded-fix-recommendation-summary",
    signalCount: signals.length,
    candidateCount: candidates.length,
    topCandidate,
    confidenceDistribution,
    riskDistribution,
    blockedReasons: args.policy?.blockedReasons ?? [],
    nextSafeAction: topCandidate?.nextSafeAction ?? "Add grounded evidence or explicit manual goal before recommending a fix.",
    summary: summarizeGroundedFixRecommendationSession({ signals, candidates, topCandidate, blockedReasons: args.policy?.blockedReasons ?? [] }),
  };
}

export function summarizeGroundedFixRecommendationSession(args: {
  signals: readonly GroundedFixSignal[];
  candidates: readonly GroundedFixCandidate[];
  topCandidate: GroundedFixCandidate | null;
  blockedReasons: readonly string[];
}): string[] {
  return [
    `${args.signals.length} signals produced ${args.candidates.length} candidates.`,
    args.topCandidate ? `Top candidate is ${args.topCandidate.title}.` : "No top candidate is available.",
    `${args.blockedReasons.length} blocked reasons are visible.`,
    "Next safe action is review, inspect current files, then Safe Patch Preview handoff.",
  ];
}
