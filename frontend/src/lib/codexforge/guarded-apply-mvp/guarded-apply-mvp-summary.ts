import type { GuardedApplyMvpBoundary, GuardedApplyMvpRequest, GuardedApplyMvpSummary } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpSummary(request: GuardedApplyMvpRequest, boundary: GuardedApplyMvpBoundary): GuardedApplyMvpSummary {
  return {
    title: "Guarded apply MVP",
    status: boundary.status,
    selectedFile: request.selectedFile ?? "No file selected",
    blockedReasonCount: boundary.blockedReasons.length,
    nextAction: boundary.status === "request-ready" ? "Copy evidence pack" : "Review apply request",
  };
}
