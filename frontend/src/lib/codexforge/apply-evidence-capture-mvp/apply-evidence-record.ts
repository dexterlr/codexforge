import type { ApplyEvidenceInputSource, ApplyEvidenceRecord, ApplyEvidenceValidation } from "./apply-evidence-capture-types";
import { buildApplyEvidenceApprovalRecord } from "./apply-evidence-approval-record";
import { buildApplyEvidenceBoundaryRecord } from "./apply-evidence-boundary-record";
import { buildApplyEvidenceDiffRecord } from "./apply-evidence-diff-record";
import { buildApplyEvidenceInput, buildApplyEvidenceStableKey } from "./apply-evidence-input";
import { buildApplyEvidencePolicyDecision } from "./apply-evidence-policy-decision";
import { buildApplyEvidenceRollbackRecord } from "./apply-evidence-rollback-record";
import { buildApplyEvidenceValidationHandoff } from "./apply-evidence-validation-handoff";

export function buildApplyEvidenceRecord(source: ApplyEvidenceInputSource = {}): ApplyEvidenceRecord {
  const input = buildApplyEvidenceInput(source);
  return {
    recordId: `apply-evidence:${buildApplyEvidenceStableKey(input.selectedFile, input.diffLabel)}`,
    input,
    policyDecision: buildApplyEvidencePolicyDecision(source.policyDecision),
    approvalRecord: buildApplyEvidenceApprovalRecord(source.approvalStatus),
    diffRecord: buildApplyEvidenceDiffRecord(input),
    boundaryRecord: buildApplyEvidenceBoundaryRecord(source.boundaryStatus),
    rollbackRecord: buildApplyEvidenceRollbackRecord(),
    validationHandoff: buildApplyEvidenceValidationHandoff(),
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority; do not reuse stale approval or evidence.",
  };
}

export function validateApplyEvidenceRecord(record: ApplyEvidenceRecord): ApplyEvidenceValidation {
  const blockedReasons: string[] = [];
  if (!record.input.selectedFile || record.input.selectedFile === "No file selected") blockedReasons.push("selected file required");
  if (!record.input.diffLabel) blockedReasons.push("diff label required");
  if (!record.rollbackRecord.guidance) blockedReasons.push("rollback guidance required");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings: ["no auto-persistence", "no Brain mutation", "no memory auto-promotion", "no raw huge diff by default", "no secrets", "cap excerpts"] };
}
