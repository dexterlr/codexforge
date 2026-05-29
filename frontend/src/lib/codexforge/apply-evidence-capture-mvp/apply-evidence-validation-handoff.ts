import type { ApplyEvidenceValidationHandoff } from "./apply-evidence-capture-types";

export function buildApplyEvidenceValidationHandoff(): ApplyEvidenceValidationHandoff {
  return { targetRoute: "/validation-results", summary: "Validation handoff: paste command output manually; no auto-run.", copyAllowed: true };
}
