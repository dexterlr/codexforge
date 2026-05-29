import type { ApplyEvidencePolicyDecision } from "./apply-evidence-capture-types";

export function buildApplyEvidencePolicyDecision(decision: "allowed" | "blocked" = "blocked"): ApplyEvidencePolicyDecision {
  return {
    decision,
    allowedReasons: decision === "allowed" ? ["Policy decision allowed one file, one diff, preview diff, and exact approval."] : [],
    blockedReasons: decision === "blocked" ? ["Policy decision blocked until approval and preview evidence are complete."] : [],
  };
}
