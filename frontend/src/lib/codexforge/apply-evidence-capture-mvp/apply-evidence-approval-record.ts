import type { ApplyEvidenceApprovalRecord } from "./apply-evidence-capture-types";

export function buildApplyEvidenceApprovalRecord(status: "approved" | "missing" | "invalid" = "missing"): ApplyEvidenceApprovalRecord {
  return { status, exactApprovalRequired: true, approvalInvalidatesOnChange: true };
}
