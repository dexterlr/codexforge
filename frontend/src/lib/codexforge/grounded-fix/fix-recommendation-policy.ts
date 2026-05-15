import type { GroundedFixCandidate, GroundedFixRecommendationPolicy, GroundedFixSignal } from "./grounded-fix-types";

export function buildGroundedFixRecommendationPolicy(args: {
  signals?: readonly GroundedFixSignal[];
  candidates?: readonly GroundedFixCandidate[];
  manualGoal?: string | null;
} = {}): GroundedFixRecommendationPolicy {
  const signals = args.signals ?? [];
  const candidates = args.candidates ?? [];
  const hasGrounding = signals.length > 0 || !!args.manualGoal?.trim();
  const lowConfidence = candidates.some((candidate) => candidate.confidence < 0.45);
  const warnings = [
    ...signals.flatMap((signal) => signal.staleWarnings),
    ...signals.flatMap((signal) => signal.weakWarnings),
    ...signals.flatMap((signal) => signal.contradictionWarnings),
  ].sort();
  const blockedReasons = hasGrounding ? [] : ["Recommendation requires at least one grounded signal or explicit manual goal."];

  return {
    id: "grounded-fix-recommendation-policy",
    allowed: hasGrounding,
    recommendationAllowed: hasGrounding,
    mutationBlocked: true,
    applyBlocked: true,
    commandExecutionBlocked: true,
    fileEditsRequireSafePatchPreview: true,
    memoryIsContextNotAuthority: true,
    currentFilesMustBeVerified: true,
    hiddenContextInjectionAllowed: false,
    lowConfidenceMarkedInvestigationNeeded: lowConfidence,
    blockedReasons,
    warnings,
    summary: summarizeGroundedFixRecommendationPolicy({ hasGrounding, lowConfidence, warnings, blockedReasons }),
  };
}

export function isGroundedFixRecommendationAllowed(policy: GroundedFixRecommendationPolicy): boolean {
  return policy.allowed && policy.recommendationAllowed && policy.mutationBlocked && policy.applyBlocked && policy.commandExecutionBlocked && policy.fileEditsRequireSafePatchPreview;
}

export function summarizeGroundedFixRecommendationPolicy(args: {
  hasGrounding: boolean;
  lowConfidence: boolean;
  warnings: readonly string[];
  blockedReasons: readonly string[];
}): string[] {
  return [
    args.hasGrounding ? "Recommendation is allowed for reviewed display." : "Recommendation is blocked until grounded signal or manual goal exists.",
    "Apply, mutation, and command execution are blocked.",
    "File edits require Safe Patch Preview and current file verification.",
    args.lowConfidence ? "Low-confidence recommendations are marked investigation-needed." : "Confidence is sufficient for reviewed recommendation display.",
    `${args.warnings.length} stale, weak, or contradictory evidence warnings are visible.`,
    `${args.blockedReasons.length} blocked reasons are present.`,
  ];
}
