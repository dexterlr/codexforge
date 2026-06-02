export type RealLocalImageGenerationTrialCheckId =
  | "health probe ready"
  | "metadata acceptable"
  | "workflow package valid"
  | "explicit user approval"
  | "local ComfyUI only"
  | "artifact capture handoff"
  | "review inbox handoff"
  | "recovery path defined"
  | "nothing runs automatically";

export type RealLocalImageGenerationTrialCheckStatus =
  | "ready"
  | "needs-review"
  | "blocked";

export type RealLocalImageGenerationTrialStatus =
  | "not-ready"
  | "approval-ready"
  | "blocked";

export type RealLocalImageGenerationTrialFlowStage = {
  id: string;
  label: string;
  plainEnglish: string;
  localOnly: boolean;
  approvalGated: boolean;
};

export type RealLocalImageGenerationTrialCheck = {
  id: RealLocalImageGenerationTrialCheckId;
  status: RealLocalImageGenerationTrialCheckStatus;
  label: string;
  plainEnglish: string;
  blocksTrial: boolean;
};

export type RealLocalImageGenerationTrialPackageSummary = {
  id: "real-local-image-generation-trial-package";
  promptSummary: string;
  negativePromptSummary: string;
  workflowPackage: string;
  artifactDestination: string;
  safeToShowAboveFold: true;
  rawJsonShownAboveFold: false;
};

export type RealLocalImageGenerationTrialBoundary = {
  id: "real-local-image-generation-trial-boundary";
  notRandomGenerateButton: true;
  explicitApprovalBeforeLocalImageTrial: true;
  localComfyUiOnly: true;
  artifactCaptureHandoff: true;
  reviewInboxHandoff: true;
  recoveryPathBeforeRetry: true;
  cloudCallsAllowed: false;
  arbitraryQueueSubmitAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  artifactDeletionAllowed: false;
  automaticRunAllowed: false;
};

export type RealLocalImageGenerationTrialSummary = {
  flow: RealLocalImageGenerationTrialFlowStage[];
  checks: RealLocalImageGenerationTrialCheck[];
  packageSummary: RealLocalImageGenerationTrialPackageSummary;
  boundary: RealLocalImageGenerationTrialBoundary;
  status: RealLocalImageGenerationTrialStatus;
  approvalCopy: string;
  readyForApprovedLocalTrial: boolean;
  summary: string;
};

export function buildRealLocalImageGenerationTrialStableKey(
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
