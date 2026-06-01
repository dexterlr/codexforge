export type VideoFailureCaseKind =
  | "missing model"
  | "missing custom node"
  | "out of memory"
  | "output too short"
  | "output too blurry"
  | "bad motion"
  | "flicker"
  | "bad prompt"
  | "wrong resolution"
  | "artifact path missing"
  | "workflow invalid"
  | "result unknown";

export type VideoFailureCase = {
  id: string;
  kind: VideoFailureCaseKind;
  plainEnglish: string;
};

export type VideoFailureDiagnosis = {
  id: string;
  caseId: string;
  likelyCause: string;
  confidence: "low" | "medium" | "high";
};

export type VideoFailureSafeNextStep = {
  id: string;
  label: string;
  plainEnglish: string;
  automaticRetryAllowed: false;
};

export type VideoFailureRetryPlan = {
  id: string;
  label: string;
  steps: string[];
  runAllowed: false;
};

export type VideoFailureWorkflowFix = {
  id: string;
  label: string;
  plainEnglish: string;
  workflowMutationAllowed: false;
};

export type VideoFailureHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type VideoFailureRecoverySummary = {
  cases: VideoFailureCase[];
  diagnoses: VideoFailureDiagnosis[];
  nextSteps: VideoFailureSafeNextStep[];
  retryPlan: VideoFailureRetryPlan;
  workflowFix: VideoFailureWorkflowFix;
  handoff: VideoFailureHandoff;
  summary: string;
};
