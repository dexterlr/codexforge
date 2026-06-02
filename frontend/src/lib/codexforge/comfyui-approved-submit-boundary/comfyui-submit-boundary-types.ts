export type SubmitBoundaryExecutionPostureStatus =
  | "preview-only"
  | "approved-submit-boundary-prepared"
  | "blocked-no-executor"
  | "blocked-policy"
  | "blocked-missing-approval"
  | "future-approved-executor-required"
  | "result-supplied";

export type SubmitBoundaryRequest = {
  id: string;
  localOnlyComfyUiTarget: true;
  liveHealthGateReviewed: boolean;
  metadataReviewed: boolean;
  workflowImported: boolean;
  safetyInspected: boolean;
  parametersMapped: boolean;
  jobPackageBuilt: boolean;
  dryRunContractPassed: boolean;
  renderQueuePreviewReady: boolean;
  artifactDestinationPlanned: boolean;
  recoveryPathPlanned: boolean;
  noAutoRunDefault: true;
  noSecretExposure: true;
  noCloudUrl: true;
  guardedExecutorAvailable: false;
};

export type SubmitBoundaryApproval = {
  id: string;
  boundaryReviewApproved: boolean;
  futureExecutionApprovalRequired: true;
  futureExecutionApprovalGranted: false;
  approvalNote: string;
};

export type SubmitBoundaryPolicy = {
  id: string;
  requirements: string[];
  failures: string[];
  allRequirementsMet: boolean;
  executionAllowed: boolean;
};

export type SubmitBoundarySafety = {
  id: string;
  guarantees: string[];
  blocked: string[];
};

export type SubmitBoundaryExecutionPosture = {
  id: string;
  status: SubmitBoundaryExecutionPostureStatus;
  label: string;
  explanation: string;
  executionAllowed: boolean;
};

export type SubmitBoundaryResult = {
  id: string;
  status: "execution-blocked" | "result-supplied";
  source: "preview" | "future-approved-executor" | "supplied";
  plainEnglish: string;
};

export type SubmitBoundaryHandoff = {
  id: string;
  submitPacketLabel: string;
  safetyReportLabel: string;
  nextImplementationHandoffLabel: string;
  safetyNote: string;
};

export type SubmitBoundarySummary = {
  request: SubmitBoundaryRequest;
  approval: SubmitBoundaryApproval;
  policy: SubmitBoundaryPolicy;
  safety: SubmitBoundarySafety;
  executionPosture: SubmitBoundaryExecutionPosture;
  result: SubmitBoundaryResult;
  handoff: SubmitBoundaryHandoff;
  summary: string;
};
