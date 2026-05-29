import type { GuardedApplyMvpBoundary, GuardedApplyMvpRequest, GuardedApplyMvpResult } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpResult(request: GuardedApplyMvpRequest, boundary: GuardedApplyMvpBoundary): GuardedApplyMvpResult {
  return {
    status: boundary.status,
    resultSummary: boundary.status === "request-ready" ? "Guarded apply request is ready for the approved boundary, but this UI does not apply it." : "Guarded apply request is blocked until policy and approval issues are cleared.",
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    validationHandoff: "After any separately approved apply, capture validation manually in /validation-results.",
    rollbackGuidance: request.rollbackGuidance,
  };
}
