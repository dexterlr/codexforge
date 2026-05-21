import { buildWorkflowResultStableKey, type WorkflowResultRecord, type WorkflowResultRecordInput, type WorkflowResultRecordValidation } from "./workflow-result-types";

export function buildWorkflowResultRecord(input: WorkflowResultRecordInput = {}): WorkflowResultRecord {
  const workflowKind = input.workflowKind ?? "code-fix";
  const sourceFlowId = input.sourceFlowId?.trim() || "manual-session";
  const selectedFilePath = input.selectedFilePath?.trim() || null;
  const finalStatus = input.finalStatus ?? "unknown";
  const resultId = buildWorkflowResultStableKey("workflow-result", workflowKind, sourceFlowId, selectedFilePath, finalStatus);
  return {
    resultId,
    workflowKind,
    sourceFlowId,
    sourceRoute: input.sourceRoute?.trim() || "/code-flow",
    selectedFilePath,
    changeRequestSummary: input.changeRequestSummary?.trim() || null,
    previewSummary: input.previewSummary?.trim() || null,
    applySummary: input.applySummary?.trim() || null,
    validationSummary: input.validationSummary?.trim() || null,
    finalStatus,
    resultLabel: input.resultLabel?.trim() || "Workflow result needs review",
    operatorNote: input.operatorNote?.trim() || null,
    reviewRequired: input.reviewRequired ?? true,
    persistenceMode: input.persistenceMode ?? "copyable-handoff",
    noAutoPromotionGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority before using this record.",
    noBrainMutationGuarantee: true,
    noFilesystemWriteGuarantee: true,
  };
}

export function validateWorkflowResultRecord(record: WorkflowResultRecord): WorkflowResultRecordValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (record.persistenceMode === "disabled") blockedReasons.push("Persistence mode is disabled.");
  if (!record.reviewRequired) warnings.push("Review should stay required before handoff or memory candidacy.");
  if (record.persistenceMode === "memory-candidate" && !record.operatorNote) warnings.push("Memory candidate mode should include an operator review note.");
  if (!record.noAutoPromotionGuarantee) blockedReasons.push("No-auto-promotion guarantee is missing.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeWorkflowResultRecord(record: WorkflowResultRecord): string[] {
  return [
    `${record.resultLabel}: ${record.finalStatus}.`,
    `Source ${record.sourceFlowId} from ${record.sourceRoute}; selected file ${record.selectedFilePath ?? "not selected"}.`,
    `Persistence mode ${record.persistenceMode}; review required=${record.reviewRequired}; no auto-promotion and no Brain auto-mutation.`,
    record.latestMessageAuthorityReminder,
  ];
}
