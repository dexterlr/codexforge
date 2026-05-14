export type CodexForgePatchRiskLevel = "low" | "medium" | "high" | "critical";

export type CodexForgePatchPreviewStepStatus =
  | "ready"
  | "current"
  | "blocked"
  | "future";

export type CodexForgePatchPreviewStepId =
  | "inspect"
  | "context"
  | "plan"
  | "preview-diff"
  | "test-plan"
  | "approval-boundary"
  | "rollback";

export type CodexForgePatchPreviewStep = {
  id: CodexForgePatchPreviewStepId;
  label: string;
  status: CodexForgePatchPreviewStepStatus;
  detail: string;
};

export type CodexForgePatchRiskInput = {
  filePath: string;
  fileRole: string;
  relatedBrainMemoryCount?: number;
  hasTestsOrSmokeScripts?: boolean;
  appearsSafetyCritical?: boolean;
  requiresApproval?: boolean;
};

export type CodexForgePatchRiskBoard = {
  filePath: string;
  level: CodexForgePatchRiskLevel;
  score: number;
  signals: Array<{
    id: string;
    label: string;
    level: CodexForgePatchRiskLevel;
    score: number;
    summary: string;
  }>;
  summary: string;
};

export type CodexForgePatchTestPlan = {
  filePath: string;
  suggestedTests: string[];
  smokeTests: string[];
  summary: string;
};

export type CodexForgePatchRollbackPlan = {
  filePath: string;
  notes: string[];
  summary: string;
};

export type CodexForgePatchApprovalBoundary = {
  phase: "Phase 6";
  previewAllowed: true;
  applyBlocked: true;
  fileMutationBlocked: true;
  commandExecutionBlocked: true;
  futureApprovalRequired: true;
  blockedCapabilities: string[];
  summary: string;
};

export type CodexForgePatchPreviewPlan = {
  id: string;
  selectedFilePath: string;
  goal: string;
  fileRole: string;
  relatedBrainContextSummary: string;
  capabilityPolicyPosture: string;
  expectedTouchedFiles: string[];
  previewSteps: CodexForgePatchPreviewStep[];
  riskLevel: CodexForgePatchRiskLevel;
  riskBoard: CodexForgePatchRiskBoard;
  approvalBoundary: CodexForgePatchApprovalBoundary;
  suggestedTests: string[];
  testPlan: CodexForgePatchTestPlan;
  rollbackNotes: string[];
  rollbackPlan: CodexForgePatchRollbackPlan;
  diffPreviewPlaceholder: string;
  noMutationGuarantee: string;
  nextAction: string;
};

export type CodexForgePatchPreviewPlanInput = {
  selectedFilePath: string;
  goal?: string;
  fileRole?: string;
  relatedBrainContextSummary?: string;
  relatedBrainMemoryCount?: number;
  capabilityPolicyPosture?: string;
  expectedTouchedFiles?: string[];
  hasTestsOrSmokeScripts?: boolean;
  appearsSafetyCritical?: boolean;
  requiresApproval?: boolean;
};
