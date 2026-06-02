export type RealApprovedComfyUiSubmitTrialCheckId =
  | "health probe is ready"
  | "metadata reader is acceptable"
  | "workflow package validator is ready"
  | "approved ComfyUI submit boundary exists"
  | "artifact capture path is defined"
  | "recovery path is defined"
  | "user approval copy is present"
  | "final live queue call remains behind boundary";

export type RealApprovedComfyUiSubmitTrialCheckStatus =
  | "ready"
  | "needs-review"
  | "blocked";

export type RealApprovedComfyUiSubmitTrialStatus =
  | "not-ready"
  | "handoff-ready"
  | "blocked";

export type RealApprovedComfyUiSubmitTrialFlowStage = {
  id: string;
  label: string;
  plainEnglish: string;
  localOnly: boolean;
  requiresApproval: boolean;
};

export type RealApprovedComfyUiSubmitTrialCheck = {
  id: RealApprovedComfyUiSubmitTrialCheckId;
  status: RealApprovedComfyUiSubmitTrialCheckStatus;
  label: string;
  plainEnglish: string;
  blocksTrial: boolean;
};

export type RealApprovedComfyUiSubmitTrialBoundary = {
  id: "real-approved-comfyui-submit-trial-boundary";
  notRandomGenerateButton: true;
  explicitApprovalRequired: true;
  localComfyUiOnly: true;
  artifactCaptureHandoff: true;
  recoveryPathBeforeRetry: true;
  cloudCallsAllowed: false;
  secretsShown: false;
  arbitraryUiSubmitAllowed: false;
  finalLiveQueueCallAllowed: false;
};

export type RealApprovedComfyUiSubmitTrialSummary = {
  flow: RealApprovedComfyUiSubmitTrialFlowStage[];
  checks: RealApprovedComfyUiSubmitTrialCheck[];
  boundary: RealApprovedComfyUiSubmitTrialBoundary;
  status: RealApprovedComfyUiSubmitTrialStatus;
  readyForLiveSubmit: boolean;
  approvalCopy: string;
  summary: string;
};

export function buildRealApprovedComfyUiSubmitTrialStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
