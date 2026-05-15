import {
  type EvidenceMemoryCandidate,
  type EvidenceMemoryReviewPolicy,
  type EvidenceMemoryReviewPolicyRule,
} from "./evidence-memory-types";

function buildRule(
  id: string,
  label: string,
  state: EvidenceMemoryReviewPolicyRule["state"],
  detail: string
): EvidenceMemoryReviewPolicyRule {
  return { id, label, state, detail };
}

export function buildEvidenceMemoryReviewPolicy(
  candidates: readonly EvidenceMemoryCandidate[] = []
): EvidenceMemoryReviewPolicy {
  const lowConfidence = candidates.some((candidate) => candidate.confidence < 0.6);
  const staleEvidence = candidates.some((candidate) =>
    candidate.warnings.some((warning) => warning.toLowerCase().includes("stale"))
  );
  const contradictoryEvidence = candidates.some((candidate) =>
    candidate.warnings.some((warning) => warning.toLowerCase().includes("contradict"))
  );
  const blockedReasons = [
    "Review required before memory promotion",
    "Brain merge review required",
    "No graph mutation from evidence UI",
    "memory is context, not authority",
    lowConfidence ? "Low-confidence candidates need manual verification." : "",
    staleEvidence ? "Stale evidence blocks automatic promotion." : "",
    contradictoryEvidence ? "Contradictory evidence blocks promotion." : "",
  ].filter(Boolean);
  const policy: EvidenceMemoryReviewPolicy = {
    id: "evidence-memory-review-policy",
    autoPromotionAllowed: false,
    userReviewRequired: true,
    brainMergeReviewRequired: true,
    lowConfidenceManualVerificationRequired: lowConfidence,
    staleEvidenceBlocksPromotion: staleEvidence,
    contradictoryEvidenceBlocksPromotion: contradictoryEvidence,
    fileEditsRequireCurrentInspection: true,
    memoryIsContextNotAuthority: true,
    uiGraphMutationAllowed: false,
    previewOnlyBrainMergeCandidate: true,
    blockedReasons,
    warnings: [
      lowConfidence ? "Low-confidence evidence must be verified manually." : "",
      staleEvidence ? "Stale evidence must be refreshed before promotion." : "",
      contradictoryEvidence ? "Contradictory evidence requires operator decision." : "",
    ].filter(Boolean),
    rules: [
      buildRule("no-auto-promotion", "No auto-promotion", "block", "Evidence memory candidates never promote automatically."),
      buildRule("user-review-required", "User review required", "review", "A human review state is required before any memory handoff."),
      buildRule("brain-merge-review-required", "Brain merge review required", "review", "Brain merge candidate data is preview-only and must pass the existing merge review boundary."),
      buildRule("low-confidence-verification", "Low confidence verification", lowConfidence ? "block" : "review", "Low-confidence candidates need manual verification."),
      buildRule("stale-contradictory-blockers", "Stale or contradictory evidence", staleEvidence || contradictoryEvidence ? "block" : "review", "Stale or contradictory evidence is a warning or blocker."),
      buildRule("current-file-inspection", "Current file inspection", "review", "File edits require current file inspection before any implementation work."),
      buildRule("context-not-authority", "Memory is context, not authority", "review", "Evidence-derived memory can guide recall but cannot replace source inspection."),
      buildRule("ui-no-graph-mutation", "No graph mutation", "block", "Evidence UI does not write or mutate the Brain graph."),
    ],
    summary: [],
  };

  return { ...policy, summary: summarizeEvidenceMemoryReviewPolicy(policy) };
}

export function isEvidenceMemoryPromotionAllowed(
  candidate?: EvidenceMemoryCandidate | null,
  policy: EvidenceMemoryReviewPolicy = buildEvidenceMemoryReviewPolicy(candidate ? [candidate] : [])
): boolean {
  if (!candidate) return false;
  if (policy.autoPromotionAllowed) return false;
  if (!policy.userReviewRequired || !policy.brainMergeReviewRequired) return false;
  if (policy.uiGraphMutationAllowed) return false;
  if (candidate.reviewState !== "approved-for-promotion") return false;
  if (candidate.promotionBlockedUntilReview) return false;
  if (candidate.confidence < 0.6) return false;
  if (candidate.blockedReasons.length > 0) return false;
  return false;
}

export function summarizeEvidenceMemoryReviewPolicy(policy: EvidenceMemoryReviewPolicy): string[] {
  return [
    "Review required before memory promotion.",
    policy.autoPromotionAllowed ? "Automatic promotion is unexpectedly enabled." : "Automatic memory promotion is blocked.",
    policy.userReviewRequired ? "Policy requires user review." : "Policy is missing user review.",
    policy.brainMergeReviewRequired ? "Brain merge review required." : "Brain merge review boundary is missing.",
    policy.uiGraphMutationAllowed ? "Evidence UI can mutate graph unexpectedly." : "Evidence UI performs no graph mutation.",
    "memory is context, not authority.",
  ];
}
