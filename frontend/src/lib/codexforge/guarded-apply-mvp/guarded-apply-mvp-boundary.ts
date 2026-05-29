import type { GuardedApplyMvpApproval, GuardedApplyMvpBoundary, GuardedApplyMvpPolicy, GuardedApplyMvpRequest } from "./guarded-apply-mvp-types";

export function buildGuardedApplyMvpBoundary(request: GuardedApplyMvpRequest, policy: GuardedApplyMvpPolicy, approval: GuardedApplyMvpApproval): GuardedApplyMvpBoundary {
  const blockedReasons = [...policy.blockedReasons, ...approval.blockedReasons];
  return {
    status: blockedReasons.length === 0 ? "request-ready" : "blocked",
    canUseExistingApprovedBoundary: blockedReasons.length === 0,
    requestReady: blockedReasons.length === 0,
    executionAllowed: false,
    boundaryNotes: [
      "If existing approved apply boundary is present, expose it only as policy-gated/request-ready.",
      "If no safe boundary exists, return blocked/request-ready with clear reasons.",
      "Do not fabricate success.",
      "Do not auto-apply.",
    ],
    blockedReasons,
  };
}

export function evaluateGuardedApplyMvpBoundary(boundary: GuardedApplyMvpBoundary): GuardedApplyMvpBoundary {
  return boundary;
}
