export type RealLocalKeyframeGenerationTrialCheckId =
  | "local-only target"
  | "approved workflow package"
  | "explicit user approval"
  | "no cloud calls"
  | "no prompt or file upload"
  | "no arbitrary file browsing"
  | "no artifact deletion"
  | "artifact capture destination defined"
  | "recovery path defined"
  | "shot and scene linkage reviewed";

export type RealLocalKeyframeGenerationTrialCheckStatus =
  | "ready"
  | "needs-review"
  | "blocked";

export type RealLocalKeyframeGenerationTrialStatus =
  | "not-ready"
  | "approval-ready"
  | "blocked";

export type RealLocalKeyframeGenerationTrialFlowStage = {
  id: string;
  label: string;
  plainEnglish: string;
  localOnly: boolean;
  approvalGated: boolean;
};

export type RealLocalKeyframeGenerationTrialCheck = {
  id: RealLocalKeyframeGenerationTrialCheckId;
  status: RealLocalKeyframeGenerationTrialCheckStatus;
  label: string;
  plainEnglish: string;
  blocksTrial: boolean;
};

export type RealLocalKeyframeGenerationTrialShotLink = {
  id: string;
  shot: string;
  scene: string;
  reviewGuidance: string;
};

export type RealLocalKeyframeGenerationTrialPlan = {
  id: "real-local-keyframe-generation-trial-plan";
  planId: string;
  promptCount: number;
  selectedShotCount: number;
  shotSceneLinks: RealLocalKeyframeGenerationTrialShotLink[];
  reviewGuidance: string;
};

export type RealLocalKeyframeGenerationTrialBoundary = {
  id: "real-local-keyframe-generation-trial-boundary";
  keyframesReviewedFirst: true;
  localOnlyKeyframeWorkflow: true;
  explicitApprovalRequired: true;
  approvedWorkflowPackageRequired: true;
  artifactCaptureDestinationDefined: true;
  recoveryPathBeforeRetry: true;
  cloudCallsAllowed: false;
  promptOrFileUploadAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  artifactDeletionAllowed: false;
  automaticRunAllowed: false;
};

export type RealLocalKeyframeGenerationTrialSummary = {
  flow: RealLocalKeyframeGenerationTrialFlowStage[];
  checks: RealLocalKeyframeGenerationTrialCheck[];
  plan: RealLocalKeyframeGenerationTrialPlan;
  boundary: RealLocalKeyframeGenerationTrialBoundary;
  status: RealLocalKeyframeGenerationTrialStatus;
  approvalCopy: string;
  readyForApprovedLocalTrial: boolean;
  summary: string;
};

export function buildRealLocalKeyframeGenerationTrialStableKey(
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
