export type ImageGenerationApprovalStatus =
  | "needs-review"
  | "request-reviewed"
  | "approved-boundary-only"
  | "blocked";

export type ImageGenerationExecutionPosture =
  | "request-only"
  | "blocked-until-approved-executor"
  | "approved-boundary-result-supplied"
  | "unknown";

export type ImageGenerationReadinessStatus =
  | "needs-prompt"
  | "needs-workflow"
  | "needs-safety-review"
  | "needs-approval"
  | "request-ready"
  | "blocked-no-executor"
  | "result-supplied"
  | "unknown";

export type ImageGenerationResultStatus =
  | "not-generated"
  | "supplied-preview"
  | "approved-boundary-result"
  | "failed-supplied"
  | "blocked"
  | "unknown";

export type ImageGenerationRequest = {
  id: string;
  prompt: string;
  negativePrompt: string;
  style: string;
  sizeTarget: string;
  localProvider: string;
  workflowPackage: string;
  artifactDestination: string;
  approvalStatus: ImageGenerationApprovalStatus;
  executionPosture: ImageGenerationExecutionPosture;
  noAutoRunGuarantee: true;
};

export type ImageGenerationPrompt = {
  id: string;
  positive: string;
  negative: string;
  styleGuide: string;
  copyLabel: string;
};

export type ImageGenerationReadiness = {
  id: string;
  status: ImageGenerationReadinessStatus;
  blockers: string[];
  nextStep: string;
};

export type ImageGenerationSafety = {
  id: string;
  localOnly: true;
  noCloudSpend: true;
  noComfyUiCall: true;
  noAutoRun: true;
  noSecrets: true;
  approvalRequired: true;
  plainEnglish: string;
};

export type ImageGenerationResult = {
  id: string;
  status: ImageGenerationResultStatus;
  suppliedArtifactLabel: string;
  captureMode: "manual-supplied" | "approved-boundary-supplied" | "blocked";
  reviewNote: string;
};

export type ImageGenerationHandoff = {
  id: string;
  copyLabel: string;
  requestHandoff: string;
  resultHandoff: string;
  nextStep: string;
};

export type ImageGenerationSummary = {
  request: ImageGenerationRequest;
  prompt: ImageGenerationPrompt;
  readiness: ImageGenerationReadiness;
  safety: ImageGenerationSafety;
  result: ImageGenerationResult;
  handoff: ImageGenerationHandoff;
  summary: string;
};
