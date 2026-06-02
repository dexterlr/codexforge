export type DryRunCheckId =
  | "workflow imported"
  | "safety inspected"
  | "parameters mapped"
  | "package built"
  | "metadata reviewed"
  | "local provider ready or unknown"
  | "render queue preview ready"
  | "artifact destination planned"
  | "recovery path planned"
  | "approval required"
  | "no-auto-run guarantee";

export type DryRunCheckStatus = "passed" | "needs-review" | "blocked" | "unknown";

export type DryRunDecisionStatus =
  | "ready-for-approved-submit-review"
  | "needs-workflow-import"
  | "needs-safety-inspection"
  | "needs-parameter-map"
  | "needs-metadata-review"
  | "needs-artifact-plan"
  | "blocked"
  | "unknown";

export type DryRunContract = {
  id: string;
  label: string;
  scope: string[];
  dryRunMeans: string[];
  runningComfyUiAllowed: false;
};

export type DryRunCheck = {
  id: DryRunCheckId;
  status: DryRunCheckStatus;
  plainEnglish: string;
  blocksSubmitReview: boolean;
};

export type DryRunPackageReview = {
  id: string;
  complete: boolean;
  checks: string[];
  plainEnglish: string;
};

export type DryRunParameterReview = {
  id: string;
  mapped: boolean;
  checks: string[];
  plainEnglish: string;
};

export type DryRunArtifactReview = {
  id: string;
  planned: boolean;
  checks: string[];
  plainEnglish: string;
};

export type DryRunDecision = {
  id: string;
  status: DryRunDecisionStatus;
  label: string;
  explanation: string;
  submitReviewAllowed: boolean;
};

export type DryRunHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type DryRunSummary = {
  contract: DryRunContract;
  checks: DryRunCheck[];
  packageReview: DryRunPackageReview;
  parameterReview: DryRunParameterReview;
  artifactReview: DryRunArtifactReview;
  decision: DryRunDecision;
  handoff: DryRunHandoff;
  summary: string;
};
