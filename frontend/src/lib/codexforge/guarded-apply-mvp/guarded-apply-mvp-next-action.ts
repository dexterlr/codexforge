import type { GuardedApplyMvpBoundary, GuardedApplyMvpNextAction } from "./guarded-apply-mvp-types";

export function selectGuardedApplyMvpNextAction(boundary: GuardedApplyMvpBoundary): GuardedApplyMvpNextAction {
  if (boundary.status === "request-ready") {
    return {
      id: "copy-apply-evidence",
      label: "Capture apply evidence",
      href: "/apply-evidence",
      reason: "Request-ready boundary needs evidence capture before validation handoff.",
      copyPayload: "Copy apply request, boundary status, rollback guidance, and validation handoff.",
    };
  }
  return {
    id: "review-apply-request",
    label: "Review apply request",
    href: "/guarded-apply-mvp",
    reason: "Blocked request needs one-file, one-diff, preview, approval, and rollback fixes.",
    copyPayload: boundary.blockedReasons.join("; "),
  };
}
