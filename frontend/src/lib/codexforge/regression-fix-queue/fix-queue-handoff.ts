import type { CodexForgePatchPreviewPlanInput } from "../patch-preview";
import type { DiffCompositionInputSource } from "../preview-diff-composer";
import type { RegressionFixQueueHandoff, RegressionFixQueueItem } from "./regression-fix-queue-types";
import { buildRegressionFixQueueRoute } from "./fix-queue-router";

export function buildRegressionFixQueuePatchPreviewInput(
  item: RegressionFixQueueItem
): CodexForgePatchPreviewPlanInput {
  return {
    selectedFilePath: item.primaryFile,
    goal: item.goal,
    fileRole: "Regression Fix Queue primary target",
    relatedBrainContextSummary: "Regression fix queue is local review context only; Brain graph mutation is blocked.",
    capabilityPolicyPosture:
      "Inspect regression output first; Safe Patch Preview required; preview diff only; no file writes without approval; no command execution without approval; preserve latest-message authority.",
    expectedTouchedFiles: item.targetFiles,
    hasTestsOrSmokeScripts: item.suggestedSmokeScripts.length > 0,
    appearsSafetyCritical: item.riskLevel === "high" || item.riskLevel === "critical",
    requiresApproval: true,
  };
}

export function buildRegressionFixQueueDiffComposerInput(item: RegressionFixQueueItem): DiffCompositionInputSource {
  return {
    queueItemId: item.id,
    sourceGroundedFixId: item.sourceRegressionId,
    goal: item.goal,
    targetFiles: item.targetFiles,
    primaryFile: item.primaryFile,
    suspectedRootCause: item.suspectedCause,
    recommendedApproach: item.recommendedAction,
    evidenceIds: item.sourceSignalIds,
    riskLevel: item.riskLevel,
    confidence: item.confidence,
    suggestedTests: item.suggestedSmokeScripts,
    rollbackNotes: [item.rollbackReminder],
    approvalPosture: item.queueState === "blocked" || item.queueState === "rejected" ? "blocked" : "review-required",
  };
}

export function buildRegressionFixQueuePrompt(item: RegressionFixQueueItem): string {
  return [
    "Regression Fix Queue handoff",
    "",
    "Inspect regression output first.",
    "Verify current files.",
    "Evidence is context, not proof.",
    "Produce preview diff only.",
    "Route all edits through Safe Patch Preview.",
    "Use Preview Diff Composer before apply.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    "",
    `Queue item: ${item.id}`,
    `Source regression: ${item.sourceRegressionId}`,
    `Goal: ${item.goal}`,
    `Candidate kind: ${item.candidateKind}`,
    `Primary file: ${item.primaryFile}`,
    `Target files: ${item.targetFiles.length ? item.targetFiles.join(", ") : "Target file required unless investigation-needed."}`,
    `Signals: ${item.sourceSignalIds.length ? item.sourceSignalIds.join(", ") : "Manual operator note or signal required."}`,
    `Suspected causes: ${item.sourceCauseIds.length ? item.sourceCauseIds.join(", ") : item.suspectedCause}`,
    `Impacted files: ${item.targetFiles.length ? item.targetFiles.join(", ") : "No impacted file selected."}`,
    `Risk: ${item.riskLevel}`,
    `Confidence: ${item.confidence}`,
    `Recommended action: ${item.recommendedAction}`,
    `Rollback advice: ${item.rollbackReminder}`,
    `Suggested tests: ${item.suggestedSmokeScripts.length ? item.suggestedSmokeScripts.join(", ") : "Suggested smoke scripts required."}`,
    `No-auto-fix guarantee: ${item.noAutoFixGuarantee}`,
    `No-auto-rollback guarantee: ${item.noAutoRollbackGuarantee}`,
    `No-mutation guarantee: ${item.noMutationGuarantee}`,
  ].join("\n");
}

export function buildRegressionFixQueueHandoff(item: RegressionFixQueueItem): RegressionFixQueueHandoff {
  const route = buildRegressionFixQueueRoute(item);
  const handoff: Omit<RegressionFixQueueHandoff, "summary"> = {
    id: "regression-fix-queue-handoff",
    itemId: item.id,
    route,
    prompt: buildRegressionFixQueuePrompt(item),
    patchPreviewInput: buildRegressionFixQueuePatchPreviewInput(item),
    diffComposerInput: buildRegressionFixQueueDiffComposerInput(item),
    safetyInstructions: [
      "Inspect regression output first.",
      "Verify current files.",
      "Evidence is context, not proof.",
      "Produce preview diff only.",
      "Route all edits through Safe Patch Preview.",
      "Use Preview Diff Composer before apply.",
      "No file writes without approval.",
      "No command execution without approval.",
      "Preserve latest-message authority.",
    ],
  };

  return { ...handoff, summary: summarizeRegressionFixQueueHandoff(handoff) };
}

export function summarizeRegressionFixQueueHandoff(
  handoffOrItem: Omit<RegressionFixQueueHandoff, "summary"> | RegressionFixQueueItem
): string[] {
  const itemId = "itemId" in handoffOrItem ? handoffOrItem.itemId : handoffOrItem.id;
  return [
    `Regression fix queue handoff prepared for ${itemId}.`,
    "Handoff says preview diff only, no file writes without approval, and no command execution without approval.",
    "Safe Patch Preview and Preview Diff Composer remain required before any future patch package.",
  ];
}
