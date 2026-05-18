import type { RegressionFixQueueItem, RegressionFixQueuePolicy } from "./regression-fix-queue-types";

export function buildRegressionFixQueuePolicy(item: RegressionFixQueueItem | null): RegressionFixQueuePolicy {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  const signalOrManualNoteAttached = Boolean(item && (item.sourceSignalIds.length > 0 || item.manualOperatorNote));
  const reviewedTriageSatisfied = Boolean(item?.reviewedTriage);
  const targetFileSatisfied = Boolean(item && (item.targetFiles.length > 0 || item.investigationNeeded));
  const rollbackAdviceAttached = Boolean(item?.rollbackAdviceAttached);
  const suggestedVerificationAttached = Boolean(item?.suggestedVerificationAttached);
  const handoffReadyState = item?.queueState === "handoff-ready" || item?.queueState === "selected";
  const lowConfidence = (item?.confidence ?? 0) < 0.45;
  const highRisk = item?.riskLevel === "high" || item?.riskLevel === "critical";
  const criticalRisk = item?.riskLevel === "critical";

  if (!item) blockedReasons.push("Regression fix queue item required.");
  if (!signalOrManualNoteAttached) blockedReasons.push("Regression signal or manual operator note required.");
  if (handoffReadyState && !reviewedTriageSatisfied) blockedReasons.push("Reviewed triage required for handoff-ready state.");
  if (!targetFileSatisfied) blockedReasons.push("Target file required unless investigation-needed.");
  if (lowConfidence && !item?.investigationNeeded) blockedReasons.push("Low confidence must be marked investigation-needed.");
  if (highRisk && !item?.operatorReviewed) blockedReasons.push("High or critical risk requires extra operator review.");
  if (!rollbackAdviceAttached) blockedReasons.push("Rollback advice required.");
  if (!suggestedVerificationAttached) blockedReasons.push("Suggested verification required.");
  if (item && !item.safePatchPreviewAvailable) blockedReasons.push("Safe Patch Preview must be available before edits.");
  if (item && !item.previewDiffComposerAvailable) blockedReasons.push("Preview Diff Composer must be available before patch package.");
  if (item?.queueState === "blocked") blockedReasons.push("Queue item is blocked.");
  if (item?.queueState === "rejected") blockedReasons.push("Queue item was rejected.");

  if (item?.warnings.length) warnings.push(...item.warnings);
  if (item?.staleEvidenceWarnings.length) warnings.push("Evidence is context, not proof; stale or weak evidence must be rechecked.");
  if (item?.currentFilesMustBeVerified) warnings.push("Current files must be verified before any previewed edit.");

  const policy: Omit<RegressionFixQueuePolicy, "summary"> = {
    id: "regression-fix-queue-policy",
    allowed: blockedReasons.length === 0,
    signalOrManualNoteRequired: true,
    signalOrManualNoteAttached,
    reviewedTriageRequiredForHandoffReady: true,
    reviewedTriageSatisfied,
    targetFileRequiredUnlessInvestigationNeeded: true,
    targetFileSatisfied,
    lowConfidenceMarksInvestigationNeeded: true,
    lowConfidenceDisposition: lowConfidence ? (item?.investigationNeeded ? "investigation-needed" : "blocked") : "reviewed",
    highRiskRequiresExtraReview: highRisk,
    criticalRiskRequiresExtraReview: criticalRisk,
    rollbackAdviceRequired: true,
    rollbackAdviceAttached,
    suggestedVerificationRequired: true,
    suggestedVerificationAttached,
    safePatchPreviewRequiredBeforeEdits: true,
    previewDiffComposerRequiredBeforePatchPackage: true,
    applyDiffBlocked: true,
    writeFileBlocked: true,
    runCommandBlocked: true,
    brokerExecutionBlocked: true,
    evidenceIsContextNotProof: true,
    currentFilesMustBeVerified: true,
    blockedReasons,
    warnings: Array.from(new Set(warnings)).sort(),
  };

  return { ...policy, summary: summarizeRegressionFixQueuePolicy(policy) };
}

export function isRegressionFixQueueAllowed(policy: RegressionFixQueuePolicy): boolean {
  return (
    policy.allowed &&
    policy.signalOrManualNoteRequired &&
    policy.signalOrManualNoteAttached &&
    policy.targetFileRequiredUnlessInvestigationNeeded &&
    policy.targetFileSatisfied &&
    policy.rollbackAdviceRequired &&
    policy.rollbackAdviceAttached &&
    policy.suggestedVerificationRequired &&
    policy.suggestedVerificationAttached &&
    policy.safePatchPreviewRequiredBeforeEdits &&
    policy.previewDiffComposerRequiredBeforePatchPackage &&
    policy.applyDiffBlocked &&
    policy.writeFileBlocked &&
    policy.runCommandBlocked &&
    policy.brokerExecutionBlocked
  );
}

export function summarizeRegressionFixQueuePolicy(
  policy: Omit<RegressionFixQueuePolicy, "summary">
): string[] {
  return [
    policy.signalOrManualNoteAttached
      ? "Regression signal or manual operator note is attached."
      : "Regression signal or manual operator note required.",
    policy.reviewedTriageSatisfied
      ? "Reviewed triage is present for handoff-ready state."
      : "Reviewed triage required before handoff-ready state.",
    policy.targetFileSatisfied ? "Target file requirement is satisfied." : "Target file required unless investigation-needed.",
    policy.lowConfidenceDisposition === "investigation-needed"
      ? "Low confidence marks this item investigation-needed."
      : "Confidence disposition is visible.",
    policy.highRiskRequiresExtraReview || policy.criticalRiskRequiresExtraReview
      ? "High or critical risk requires extra review."
      : "Risk is visible and review-gated.",
    policy.rollbackAdviceAttached ? "Rollback advice is attached." : "Rollback advice required.",
    policy.suggestedVerificationAttached ? "Suggested verification is attached." : "Suggested verification required.",
    "Safe Patch Preview required before edits and Preview Diff Composer required before patch package.",
    "apply-diff blocked, write-file blocked, run-command blocked, and broker-execution blocked.",
    "Evidence is context, not proof; current files must be verified.",
    `${policy.blockedReasons.length} blocked reasons and ${policy.warnings.length} warnings are visible.`,
  ];
}
