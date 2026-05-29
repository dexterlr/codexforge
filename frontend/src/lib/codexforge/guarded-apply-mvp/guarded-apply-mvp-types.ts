export type GuardedApplyMvpBoundaryStatus = "request-ready" | "blocked";
export type GuardedApplyMvpDecision = "allowed" | "blocked";

export type GuardedApplyMvpRequestSource = {
  requestId?: string;
  selectedFile?: string;
  diffLabel?: string;
  diffSummary?: string;
  previewDiffSupplied?: boolean;
  fileCount?: number;
  diffCount?: number;
  includesBinaryPatch?: boolean;
  touchesBlockedPath?: boolean;
  rollbackGuidance?: string;
  latestMessageAuthorityPreserved?: boolean;
};

export type GuardedApplyMvpRequest = {
  requestId: string;
  selectedFile: string | null;
  diffLabel: string;
  diffSummary: string;
  previewDiffSupplied: boolean;
  fileCount: number;
  diffCount: number;
  includesBinaryPatch: boolean;
  touchesBlockedPath: boolean;
  rollbackGuidance: string;
  noDirectUiApplyDiff: true;
  noDirectUiWriteFile: true;
  noDirectUiRunCommand: true;
  noCombinedApplyValidateButton: true;
  validationRemainsSeparate: true;
  latestMessageAuthorityPreserved: boolean;
};

export type GuardedApplyMvpValidation = {
  ok: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type GuardedApplyMvpPolicy = {
  decision: GuardedApplyMvpDecision;
  allowed: boolean;
  allowedReasons: string[];
  blockedReasons: string[];
  safetyRules: string[];
};

export type GuardedApplyMvpDiffContract = {
  selectedFile: string | null;
  diffLabel: string;
  previewDiffRequired: true;
  oneFileOnly: boolean;
  oneDiffOnly: boolean;
  binaryPatchBlocked: boolean;
  blockedPathEditsRejected: boolean;
  contractSummary: string;
};

export type GuardedApplyMvpApprovalSource = {
  approvalText?: string;
  requestId?: string;
  selectedFile?: string;
  diffLabel?: string;
};

export type GuardedApplyMvpApproval = {
  approved: boolean;
  approvalText: string;
  expectedApprovalText: string;
  approvalBoundTo: string;
  invalidatedIfRequestChanges: true;
  blockedReasons: string[];
};

export type GuardedApplyMvpBoundary = {
  status: GuardedApplyMvpBoundaryStatus;
  canUseExistingApprovedBoundary: boolean;
  requestReady: boolean;
  executionAllowed: false;
  boundaryNotes: string[];
  blockedReasons: string[];
};

export type GuardedApplyMvpResult = {
  status: GuardedApplyMvpBoundaryStatus;
  resultSummary: string;
  noAutoApplyGuarantee: true;
  noAutoRunGuarantee: true;
  validationHandoff: string;
  rollbackGuidance: string;
};

export type GuardedApplyMvpNextAction = {
  id: string;
  label: string;
  href: "/guarded-apply-mvp" | "/apply-evidence" | "/validation-results" | "/apply-validation" | "/code-flow/live-run";
  reason: string;
  copyPayload: string;
};

export type GuardedApplyMvpSummary = {
  title: string;
  status: GuardedApplyMvpBoundaryStatus;
  selectedFile: string;
  blockedReasonCount: number;
  nextAction: string;
};
