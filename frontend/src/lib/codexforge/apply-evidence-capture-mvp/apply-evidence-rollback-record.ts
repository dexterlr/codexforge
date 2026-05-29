import type { ApplyEvidenceRollbackRecord } from "./apply-evidence-capture-types";

export function buildApplyEvidenceRollbackRecord(): ApplyEvidenceRollbackRecord {
  return { guidance: "Rollback guidance: use git restore before commit or git revert after commit.", copyAllowed: true };
}
