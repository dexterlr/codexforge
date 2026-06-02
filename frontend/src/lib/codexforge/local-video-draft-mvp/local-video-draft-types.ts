export type VideoDraftApprovalStatus =
  | "needs-review"
  | "request-reviewed"
  | "approved-boundary-only"
  | "blocked";

export type VideoDraftExecutionPosture =
  | "request-only"
  | "blocked-until-approved-executor"
  | "approved-boundary-result-supplied"
  | "unknown";

export type VideoDraftReadinessStatus =
  | "needs-prompt"
  | "needs-storyboard"
  | "needs-keyframes"
  | "needs-workflow-package"
  | "needs-safety-review"
  | "needs-dry-run"
  | "needs-submit-boundary"
  | "request-ready"
  | "blocked-no-executor"
  | "result-supplied"
  | "unknown";

export type VideoDraftResultStatus =
  | "not-generated"
  | "supplied-preview"
  | "approved-boundary-result"
  | "failed-supplied"
  | "blocked"
  | "unknown";

export type VideoDraftRequest = {
  id: string;
  prompt: string;
  storyboard: string;
  keyframes: string[];
  workflowPackage: string;
  targetDuration: string;
  targetResolution: string;
  localProvider: string;
  artifactDestination: string;
  renderQueuePosture: string;
  dryRunReviewed: boolean;
  submitBoundaryReviewed: boolean;
  approvalStatus: VideoDraftApprovalStatus;
  executionPosture: VideoDraftExecutionPosture;
  noAutoRunGuarantee: true;
};

export type VideoDraftInputReview = {
  id: string;
  promptReady: boolean;
  storyboardReady: boolean;
  keyframesReady: boolean;
  workflowReady: boolean;
  plainEnglish: string;
};

export type VideoDraftReadiness = {
  id: string;
  status: VideoDraftReadinessStatus;
  blockers: string[];
  nextStep: string;
};

export type VideoDraftSafety = {
  id: string;
  localOnly: true;
  draftOnly: true;
  finalLater: true;
  noCloudSpend: true;
  noComfyUiCall: true;
  noQueueMutation: true;
  noAutoRun: true;
  approvalRequired: true;
  plainEnglish: string;
};

export type VideoDraftResult = {
  id: string;
  status: VideoDraftResultStatus;
  suppliedDraftLabel: string;
  captureMode: "manual-supplied" | "approved-boundary-supplied" | "blocked";
  reviewNote: string;
};

export type VideoDraftHandoff = {
  id: string;
  copyLabel: string;
  requestHandoff: string;
  resultHandoff: string;
  nextStep: string;
};

export type VideoDraftSummary = {
  request: VideoDraftRequest;
  inputReview: VideoDraftInputReview;
  readiness: VideoDraftReadiness;
  safety: VideoDraftSafety;
  result: VideoDraftResult;
  handoff: VideoDraftHandoff;
  summary: string;
};
