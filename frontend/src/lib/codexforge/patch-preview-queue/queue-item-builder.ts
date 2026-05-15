import type { GroundedFixCandidate } from "../grounded-fix";
import { classifyPatchPreviewQueuePriority, scorePatchPreviewQueuePriority } from "./queue-priority";
import {
  buildPatchPreviewQueueStableKey,
  clampPatchPreviewQueueScore,
  uniquePatchPreviewQueueStrings,
  type PatchPreviewQueueItem,
  type PatchPreviewQueueItemInput,
  type PatchPreviewQueueReviewState,
  type PatchPreviewQueueState,
} from "./patch-preview-queue-types";

function isReviewedState(state: PatchPreviewQueueReviewState): boolean {
  return ["reviewed", "accepted", "accepted-for-preview", "recommended"].includes(state);
}

function selectPrimaryFile(candidate: GroundedFixCandidate): string {
  return candidate.targetFiles[0] ?? "verify-current-file-target";
}

function buildQueueState(input: PatchPreviewQueueItemInput): PatchPreviewQueueState {
  if (input.queueState) return input.queueState;
  const reviewState = input.reviewState ?? input.recommendation.reviewState;
  if (input.recommendation.targetFiles.length === 0) return "blocked";
  if (input.recommendation.confidence < 0.45) return "blocked";
  return isReviewedState(reviewState) ? "queued" : "draft";
}

export function buildPatchPreviewQueueItem(input: PatchPreviewQueueItemInput): PatchPreviewQueueItem {
  const candidate = input.recommendation;
  const primaryFile = selectPrimaryFile(candidate);
  const targetFiles = uniquePatchPreviewQueueStrings(candidate.targetFiles);
  const confidence = clampPatchPreviewQueueScore(candidate.confidence);
  const reviewState = input.reviewState ?? candidate.reviewState;
  const queueState = buildQueueState(input);
  const warnings = uniquePatchPreviewQueueStrings([
    ...(input.evidenceWarnings ?? []),
    ...(candidate.confidence < 0.45 ? ["Low confidence recommendation requires investigation-needed or blocked handling."] : []),
    ...(targetFiles.length === 0 ? ["Target file required before queueing Safe Patch Preview."] : []),
  ]);
  const baseItem: PatchPreviewQueueItem = {
    id: `patch-preview-queue:${buildPatchPreviewQueueStableKey(candidate.id, primaryFile, candidate.goal)}`,
    sourceGroundedFixId: candidate.id,
    sourceRecommendationTitle: candidate.title,
    goal: candidate.goal,
    targetFiles,
    primaryFile,
    suspectedRootCause: candidate.suspectedRootCause,
    recommendedApproach: candidate.recommendedApproach,
    evidenceIds: uniquePatchPreviewQueueStrings(candidate.evidenceIds),
    confidence,
    riskLevel: candidate.riskLevel,
    priority: "normal",
    priorityScore: 0,
    queueState,
    reviewState,
    patchPreviewPlanInput: {
      selectedFilePath: primaryFile,
      goal: candidate.goal,
      fileRole: "Patch Preview Queue primary target",
      expectedTouchedFiles: targetFiles,
      hasTestsOrSmokeScripts: (input.suggestedTests?.length ?? 0) > 0,
      appearsSafetyCritical: candidate.riskLevel === "high" || candidate.riskLevel === "critical",
      requiresApproval: true,
      capabilityPolicyPosture:
        "Safe Patch Preview required; preview diff only; apply, file mutation, command execution, and Brain graph mutation blocked.",
    },
    safeNextAction:
      queueState === "blocked"
        ? "Resolve queue blockers before Safe Patch Preview handoff."
        : "Review queued item, verify current files, then hand off to Safe Patch Preview for preview diff only.",
    noMutationGuarantee:
      "Patch Preview Queue performs no file writes, no command execution, no apply, no source mutation, and no Brain memory mutation.",
    suggestedTests: uniquePatchPreviewQueueStrings(input.suggestedTests ?? []),
    rollbackNotes: uniquePatchPreviewQueueStrings(
      input.rollbackNotes ?? ["Keep preview diff reversible.", "Record rollback note before any future edit approval."]
    ),
    warnings,
    userSelected: Boolean(input.userSelected),
    sourceImportance: input.sourceImportance ?? (candidate.riskLevel === "critical" ? "critical" : "high"),
  };
  const priorityScore = scorePatchPreviewQueuePriority(baseItem);
  const priority = classifyPatchPreviewQueuePriority(priorityScore, queueState === "blocked");

  return { ...baseItem, priorityScore, priority };
}

export function buildPatchPreviewQueueItems(inputs: readonly PatchPreviewQueueItemInput[]): PatchPreviewQueueItem[] {
  return inputs.map((input) => buildPatchPreviewQueueItem(input));
}

export function summarizePatchPreviewQueueItem(item: PatchPreviewQueueItem): string[] {
  return [
    `${item.sourceRecommendationTitle} queued from ${item.sourceGroundedFixId}.`,
    `Primary file is ${item.primaryFile}; ${item.targetFiles.length} target files attached.`,
    `Priority is ${item.priority} at ${item.priorityScore}; confidence is ${item.confidence}.`,
    "Safe Patch Preview handoff is preview-only and does not apply patches.",
  ];
}
