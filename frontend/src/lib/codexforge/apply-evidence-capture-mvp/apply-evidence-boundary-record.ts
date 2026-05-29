import type { ApplyEvidenceBoundaryRecord } from "./apply-evidence-capture-types";

export function buildApplyEvidenceBoundaryRecord(status: "request-ready" | "blocked" = "blocked"): ApplyEvidenceBoundaryRecord {
  return { status, executionAllowed: false, reasons: status === "blocked" ? ["Boundary status blocked or request-ready only; no auto-apply."] : ["Boundary request-ready; execution stays outside this UI."] };
}
