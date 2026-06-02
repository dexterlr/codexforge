export type KeyframeGenerationApprovalStatus =
  | "needs-review"
  | "request-reviewed"
  | "approved-boundary-only"
  | "blocked";

export type KeyframeGenerationExecutionPosture =
  | "request-only"
  | "blocked-until-approved-executor"
  | "approved-boundary-result-supplied"
  | "unknown";

export type KeyframeGenerationReadinessStatus =
  | "needs-prompt"
  | "needs-workflow"
  | "needs-safety-review"
  | "needs-approval"
  | "request-ready"
  | "blocked-no-executor"
  | "result-supplied"
  | "unknown";

export type KeyframeGenerationResultStatus =
  | "not-generated"
  | "supplied-preview"
  | "approved-boundary-result"
  | "failed-supplied"
  | "blocked"
  | "unknown";

export type KeyframeGenerationRequest = {
  id: string;
  keyframePlanId: string;
  selectedShots: string[];
  promptSet: string[];
  consistencyNotes: string[];
  localImageWorkflowPackage: string;
  artifactDestination: string;
  approvalStatus: KeyframeGenerationApprovalStatus;
  executionPosture: KeyframeGenerationExecutionPosture;
  noAutoRunGuarantee: true;
};

export type KeyframeGenerationPlanReview = {
  id: string;
  planId: string;
  selectedShotCount: number;
  plainEnglish: string;
  nextStep: string;
};

export type KeyframeGenerationReadiness = {
  id: string;
  status: KeyframeGenerationReadinessStatus;
  blockers: string[];
  nextStep: string;
};

export type KeyframeGenerationSafety = {
  id: string;
  localOnly: true;
  stillFramesOnly: true;
  noCloudSpend: true;
  noComfyUiCall: true;
  noAutoRun: true;
  noSecrets: true;
  approvalRequired: true;
  plainEnglish: string;
};

export type KeyframeGenerationResult = {
  id: string;
  status: KeyframeGenerationResultStatus;
  suppliedKeyframeLabels: string[];
  captureMode: "manual-supplied" | "approved-boundary-supplied" | "blocked";
  reviewNote: string;
};

export type KeyframeGenerationHandoff = {
  id: string;
  copyLabel: string;
  requestHandoff: string;
  resultHandoff: string;
  nextStep: string;
};

export type KeyframeGenerationSummary = {
  request: KeyframeGenerationRequest;
  planReview: KeyframeGenerationPlanReview;
  readiness: KeyframeGenerationReadiness;
  safety: KeyframeGenerationSafety;
  result: KeyframeGenerationResult;
  handoff: KeyframeGenerationHandoff;
  summary: string;
};
