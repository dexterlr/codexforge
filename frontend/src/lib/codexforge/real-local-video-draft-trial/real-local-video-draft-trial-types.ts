export type RealLocalVideoDraftTrialCheckId =
  | "image trial readiness"
  | "keyframe trial readiness"
  | "video workflow package validation"
  | "explicit approval"
  | "local ComfyUI only"
  | "frame count and duration bounded"
  | "gpu worker guidance reviewed"
  | "no cloud fallback"
  | "artifact capture handoff"
  | "retry and recovery path"
  | "review before promotion";

export type RealLocalVideoDraftTrialCheckStatus =
  | "ready"
  | "needs-review"
  | "blocked";

export type RealLocalVideoDraftTrialStatus =
  | "not-ready"
  | "approval-ready"
  | "blocked";

export type RealLocalVideoDraftTrialFlowStage = {
  id: string;
  label: string;
  plainEnglish: string;
  localOnly: boolean;
  approvalGated: boolean;
};

export type RealLocalVideoDraftTrialCheck = {
  id: RealLocalVideoDraftTrialCheckId;
  status: RealLocalVideoDraftTrialCheckStatus;
  label: string;
  plainEnglish: string;
  blocksTrial: boolean;
};

export type RealLocalVideoDraftTrialBounds = {
  id: "real-local-video-draft-trial-bounds";
  frameCountLabel: string;
  durationLabel: string;
  resolutionLabel: string;
  frameCountBounded: true;
  durationBounded: true;
};

export type RealLocalVideoDraftTrialGpuGuidance = {
  id: "real-local-video-draft-trial-gpu-guidance";
  dualGpuMode: "Dual GPUs are parallel workers";
  memorySharingClaim: "No multi-GPU memory sharing claim unless workflow supports it";
  workerGuidance: string;
};

export type RealLocalVideoDraftTrialBoundary = {
  id: "real-local-video-draft-trial-boundary";
  localVideoDraftOnly: true;
  explicitApprovalRequired: true;
  localComfyUiOnly: true;
  frameCountAndDurationBounded: true;
  dualGpusParallelWorkers: true;
  noCloudFallback: true;
  artifactCaptureHandoff: true;
  retryRecoveryPath: true;
  reviewBeforePromotion: true;
  queueMutationAllowed: false;
  arbitraryQueueSubmitAllowed: false;
  artifactDeletionAllowed: false;
  automaticRunAllowed: false;
};

export type RealLocalVideoDraftTrialSummary = {
  flow: RealLocalVideoDraftTrialFlowStage[];
  checks: RealLocalVideoDraftTrialCheck[];
  bounds: RealLocalVideoDraftTrialBounds;
  gpuGuidance: RealLocalVideoDraftTrialGpuGuidance;
  boundary: RealLocalVideoDraftTrialBoundary;
  status: RealLocalVideoDraftTrialStatus;
  approvalCopy: string;
  readyForApprovedLocalTrial: boolean;
  summary: string;
};

export function buildRealLocalVideoDraftTrialStableKey(
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
