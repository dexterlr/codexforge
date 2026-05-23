import { buildRunHistoryStableKey, type RunHistoryRecord, type RunHistoryRecordInput, type RunHistoryRecordValidation } from "./run-history-types";

export function buildRunHistoryRecord(input: RunHistoryRecordInput = {}): RunHistoryRecord {
  const runKind = input.runKind ?? "unknown";
  const sourceWorkflowResultId = input.sourceWorkflowResultId?.trim() || "sample-workflow-result";
  const sourceRoute = input.sourceRoute?.trim() || "/workflow-results";
  const label = input.label?.trim() || "Recent workflow run";
  const runId = buildRunHistoryStableKey("run-history", runKind, sourceWorkflowResultId, sourceRoute, label);
  return {
    runId,
    runKind,
    label,
    sourceWorkflowResultId,
    sourceRoute,
    selectedFilePath: input.selectedFilePath?.trim() || null,
    changeSummary: input.changeSummary?.trim() || null,
    validationStatus: input.validationStatus ?? "unknown",
    reviewStatus: input.reviewStatus ?? "needs-review",
    handoffReadiness: input.handoffReadiness ?? "needs-review",
    memoryCandidateReadiness: input.memoryCandidateReadiness ?? "not-candidate",
    currentNextAction: input.currentNextAction?.trim() || "Review the workflow result before handoff.",
    privacySensitivity: input.privacySensitivity ?? "project-context",
    persistenceMode: input.persistenceMode ?? "copyable-handoff",
    noAutoPromotionGuarantee: true,
    noBrainMutationGuarantee: true,
    noFilesystemWriteGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority before using this run history record.",
  };
}

export function validateRunHistoryRecord(record: RunHistoryRecord): RunHistoryRecordValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (record.persistenceMode === "disabled") blockedReasons.push("Persistence mode is disabled.");
  if (!record.noAutoPromotionGuarantee) blockedReasons.push("No-auto-promotion guarantee is missing.");
  if (!record.noBrainMutationGuarantee) blockedReasons.push("No Brain mutation guarantee is missing.");
  if (record.privacySensitivity === "possible-secret") warnings.push("Possible secret details must be excluded before copy or memory review.");
  if (record.reviewStatus === "unknown") warnings.push("Review status is unknown.");
  if (record.memoryCandidateReadiness === "ready-for-review" && record.reviewStatus !== "ready-for-memory-review" && record.reviewStatus !== "reviewed" && record.reviewStatus !== "complete") warnings.push("Memory candidate readiness should follow explicit review.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeRunHistoryRecord(record: RunHistoryRecord): string[] {
  return [
    `${record.label}: ${record.runKind}, ${record.reviewStatus}, validation ${record.validationStatus}.`,
    `Source result ${record.sourceWorkflowResultId} from ${record.sourceRoute}; selected file ${record.selectedFilePath ?? "not selected"}.`,
    `Persistence mode ${record.persistenceMode}; handoff ${record.handoffReadiness}; memory candidate ${record.memoryCandidateReadiness}.`,
    "No auto-promotion, no Brain auto-mutation, no filesystem writes, and review required before reuse.",
    record.latestMessageAuthorityReminder,
  ];
}
