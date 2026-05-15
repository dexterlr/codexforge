import type { PatchPreviewQueueItem, PatchPreviewQueuePolicy } from "./patch-preview-queue-types";

function hasReviewedRecommendation(item: PatchPreviewQueueItem): boolean {
  return ["reviewed", "accepted", "accepted-for-preview", "recommended"].includes(item.reviewState);
}

export function buildPatchPreviewQueuePolicy(item: PatchPreviewQueueItem | null): PatchPreviewQueuePolicy {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const reviewed = item ? hasReviewedRecommendation(item) : false;
  const hasTargetFile = Boolean(item?.targetFiles.length);
  const lowConfidence = (item?.confidence ?? 0) < 0.45;
  const criticalRisk = item?.riskLevel === "critical";

  if (!reviewed) blockedReasons.push("Accepted or reviewed fix recommendation required.");
  if (!hasTargetFile) blockedReasons.push("At least one target file required.");
  if (lowConfidence) blockedReasons.push("Low-confidence item must be investigation-needed or blocked before queue handoff.");
  if (item?.queueState === "blocked") blockedReasons.push("Queue item is blocked.");
  if (criticalRisk && item?.queueState !== "reviewed" && item?.queueState !== "queued" && item?.queueState !== "selected") {
    warnings.push("Critical risk requires explicit review.");
  }
  if (item?.warnings.length) {
    warnings.push(...item.warnings.map((warning) => `Stale/weak/contradictory evidence warning: ${warning}`));
  }

  return {
    id: "patch-preview-queue-policy",
    allowed: blockedReasons.length === 0,
    patchPreviewAllowed: true,
    applyBlocked: true,
    mutationBlocked: true,
    commandExecutionBlocked: true,
    safePatchPreviewRequired: true,
    reviewedFixRecommendationRequired: true,
    targetFileRequired: true,
    evidenceIsContextNotProof: true,
    currentFilesMustBeVerified: true,
    lowConfidenceDisposition: lowConfidence ? "blocked" : "reviewed",
    criticalRiskRequiresExplicitReview: criticalRisk,
    blockedReasons,
    warnings,
    summary: summarizePatchPreviewQueuePolicy({ reviewed, hasTargetFile, lowConfidence, criticalRisk, blockedReasons, warnings }),
  };
}

export function isPatchPreviewQueueAllowed(policy: PatchPreviewQueuePolicy): boolean {
  return (
    policy.allowed &&
    policy.patchPreviewAllowed &&
    policy.applyBlocked &&
    policy.mutationBlocked &&
    policy.commandExecutionBlocked &&
    policy.safePatchPreviewRequired &&
    policy.reviewedFixRecommendationRequired &&
    policy.targetFileRequired
  );
}

export function summarizePatchPreviewQueuePolicy(args: {
  reviewed: boolean;
  hasTargetFile: boolean;
  lowConfidence: boolean;
  criticalRisk: boolean;
  blockedReasons: readonly string[];
  warnings: readonly string[];
}): string[] {
  return [
    args.reviewed ? "Reviewed fix recommendation is present." : "Reviewed fix recommendation is required.",
    args.hasTargetFile ? "Target file is selected." : "Target file is required.",
    args.lowConfidence ? "Low confidence is investigation-needed or blocked." : "Confidence reviewed for queueing.",
    args.criticalRisk ? "Critical risk requires explicit review." : "Risk review is visible.",
    "Patch preview is allowed; apply, file mutation, and command execution are blocked.",
    "Safe Patch Preview is required before any edit; evidence is context, not proof; current files must be verified before edits.",
    `${args.blockedReasons.length} blocked reasons and ${args.warnings.length} warnings are visible.`,
  ];
}
