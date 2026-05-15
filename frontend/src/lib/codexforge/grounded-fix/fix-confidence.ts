import type { GroundedFixCandidate, GroundedFixSignal } from "./grounded-fix-types";

export const GROUNDED_FIX_RANKING_RULE =
  "confidence descending, risk ascending, importance descending, candidate id ascending";

export function scoreGroundedFixConfidence(args: {
  signals?: readonly GroundedFixSignal[];
  hasTestPlan?: boolean;
  readOnlyExecutionSucceeded?: boolean;
  memoryReviewed?: boolean;
}): number {
  const signals = args.signals ?? [];
  const evidenceCount = Math.min(0.24, signals.length * 0.06);
  const averageEvidence = signals.length
    ? signals.reduce((total, signal) => total + signal.confidence, 0) / signals.length
    : 0.2;
  const fileSpecificity = signals.some((signal) => signal.filePath) ? 0.12 : 0;
  const lineSpecificity = signals.some((signal) => signal.lineNumber || signal.match) ? 0.1 : 0;
  const repeatedSignals = new Set(signals.map((signal) => signal.filePath).filter(Boolean)).size < signals.length ? 0.08 : 0;
  const execution = args.readOnlyExecutionSucceeded ? 0.08 : 0;
  const memory = args.memoryReviewed ? 0.06 : 0;
  const tests = args.hasTestPlan ? 0.08 : 0;
  const contradictionPenalty = signals.some((signal) => signal.contradictionWarnings.length > 0) ? 0.22 : 0;
  const weakPenalty = signals.some((signal) => signal.weakWarnings.length > 0) ? 0.12 : 0;
  const stalePenalty = signals.some((signal) => signal.staleWarnings.length > 0) ? 0.12 : 0;
  return Math.min(1, Math.max(0, averageEvidence + evidenceCount + fileSpecificity + lineSpecificity + repeatedSignals + execution + memory + tests - contradictionPenalty - weakPenalty - stalePenalty));
}

export function explainGroundedFixConfidence(args: {
  signals?: readonly GroundedFixSignal[];
  score: number;
  hasTestPlan?: boolean;
}): string[] {
  const signals = args.signals ?? [];
  const reasons = [
    `${signals.length} evidence signals considered.`,
    `Confidence score is ${args.score.toFixed(2)}.`,
  ];
  if (signals.some((signal) => signal.filePath)) reasons.push("File-specific evidence improves confidence.");
  if (signals.some((signal) => signal.lineNumber || signal.match)) reasons.push("Line or match-specific evidence improves confidence.");
  if (signals.some((signal) => signal.weakWarnings.length > 0)) reasons.push("Weak evidence lowers confidence.");
  if (signals.some((signal) => signal.staleWarnings.length > 0)) reasons.push("Stale evidence lowers confidence until current files are verified.");
  if (signals.some((signal) => signal.contradictionWarnings.length > 0)) reasons.push("Contradiction warnings require investigation.");
  if (args.hasTestPlan) reasons.push("Available test or smoke plan improves confidence.");
  return reasons;
}

export function rankGroundedFixCandidates(candidates: readonly GroundedFixCandidate[]): GroundedFixCandidate[] {
  const riskRank = { low: 0, medium: 1, high: 2, critical: 3 };
  const importance = (candidate: GroundedFixCandidate): number =>
    candidate.relatedRisks.includes("critical") ? 3 : candidate.relatedRisks.includes("high") ? 2 : candidate.relatedRisks.length > 0 ? 1 : 0;

  return [...candidates].sort((a, b) => {
    const confidenceRank = b.confidence - a.confidence;
    if (confidenceRank !== 0) return confidenceRank;
    const risk = riskRank[a.riskLevel] - riskRank[b.riskLevel];
    if (risk !== 0) return risk;
    const importanceRank = importance(b) - importance(a);
    if (importanceRank !== 0) return importanceRank;
    return a.id.localeCompare(b.id);
  });
}
