export type CodingFlowStep =
  | "start"
  | "select-file"
  | "describe-change"
  | "preview-patch"
  | "review-apply"
  | "prepare-validation"
  | "review-result"
  | "complete"
  | "blocked";

export type CodingFlowResultStatus = "pass" | "fail" | "unknown" | "patch-issue" | "apply-issue";
export type CodingFlowRiskLevel = "low" | "medium" | "high" | "blocked";
export type CodingFlowRoute = "/start" | "/files" | "/code-flow" | "/validation" | "/closed-loop";
export type CodingFlowHandoffKind =
  | "Open Start Wizard"
  | "Open Files"
  | "Open Real Patch Preview"
  | "Open Approved Patch Apply"
  | "Open Validation Runner"
  | "Open Closed Loop Fix"
  | "Copy patch request"
  | "Copy validation checklist"
  | "Copy result summary";

export type CodingFlowInputSource = {
  flowId?: string;
  selectedWorkflowIntent?: string;
  selectedFilePath?: string;
  selectedFileSummary?: string;
  requestedChangeText?: string;
  previewId?: string;
  applyRequestId?: string;
  validationRequestId?: string;
  resultSummary?: string;
  resultStatus?: CodingFlowResultStatus;
  currentStep?: CodingFlowStep;
};

export type CodingFlowInput = Required<Pick<CodingFlowInputSource, "selectedWorkflowIntent">> & {
  flowId: string;
  selectedFilePath: string | null;
  selectedFileSummary: string | null;
  requestedChangeText: string | null;
  previewId: string | null;
  applyRequestId: string | null;
  validationRequestId: string | null;
  resultSummary: string | null;
  resultStatus: CodingFlowResultStatus;
  currentStep: CodingFlowStep;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  latestMessageAuthorityReminder: string;
};

export type CodingFlowValidation = {
  ok: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type CodingFlowFileStep = {
  selectedFilePath: string | null;
  filePurpose: string;
  fileRisk: CodingFlowRiskLevel;
  fileCategory: string;
  contentAvailability: "available" | "not-selected" | "unknown";
  recommendedNextAction: string;
  routeHandoff: CodingFlowRouteHandoff;
  userInstruction: string;
};

export type CodingFlowChangeRequest = {
  changeRequestId: string;
  selectedFilePath: string | null;
  requestedChangeText: string | null;
  operatorIntent: string;
  constraints: string[];
  acceptanceCriteria: string[];
  riskNotes: string[];
  readyForPreview: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type CodingFlowPreviewStep = {
  selectedFile: string | null;
  requestedChange: string | null;
  previewReadiness: "ready" | "blocked";
  previewRoute: CodingFlowRoute;
  expectedPreviewOutputs: string[];
  riskLevel: CodingFlowRiskLevel;
  nextAction: string;
  blockedReasons: string[];
};

export type CodingFlowApplyStep = {
  previewId: string | null;
  applyRequestReadiness: "request-ready" | "manual-handoff" | "blocked";
  approvalStatus: "required" | "approved" | "missing";
  policyStatus: string;
  rollbackReadiness: "required" | "ready" | "missing";
  blockedReasons: string[];
  applyRoute: CodingFlowRoute;
  nextAction: string;
};

export type CodingFlowValidationStep = {
  validationReadiness: "ready" | "blocked";
  recommendedCommands: string[];
  targetedSmokeRecommendations: string[];
  commandCopyStatus: "copy-only";
  routeHandoff: CodingFlowRouteHandoff;
  outputCaptureExpectation: string;
  blockedReasons: string[];
};

export type CodingFlowResultStep = {
  validationResultStatus: CodingFlowResultStatus;
  failureSummary: string | null;
  recommendedRoute: CodingFlowRoute;
  closedLoopHandoff: CodingFlowRouteHandoff | null;
  nextSafeAction: string;
  completionStatus: "complete" | "needs-review" | "blocked";
};

export type CodingFlowRouteHandoff = {
  id: string;
  label: CodingFlowHandoffKind;
  route: CodingFlowRoute;
  copyPayload: string | null;
  safetyNote: string;
};

export type CodingFlowRouteHandoffAction = CodingFlowRouteHandoff & {
  actionText: string;
  noUnsafeExecution: true;
};

export type CodingFlowNextAction = {
  id: string;
  label: string;
  route: CodingFlowRoute;
  reason: string;
  copyPayload: string | null;
  requiresApproval: boolean;
  noMutation: true;
};

export type CodingFlowNextActionPlan = {
  selected: CodingFlowNextAction;
  actions: CodingFlowNextAction[];
  smallestUnblockStep: string;
};

export type RealCodingFlowSummary = {
  currentStep: CodingFlowStep;
  selectedFile: string;
  changeRequestReady: boolean;
  previewReady: boolean;
  applyReady: boolean;
  validationReady: boolean;
  resultStatus: CodingFlowResultStatus;
  blockerCount: number;
  nextSafeAction: string;
};
