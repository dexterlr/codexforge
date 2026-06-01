export type ComfyUiJobReadinessLabel =
  | "prompt ready"
  | "storyboard ready"
  | "keyframes planned"
  | "workflow imported"
  | "safety inspected"
  | "parameters mapped"
  | "artifact destination planned"
  | "local provider selected"
  | "approval required"
  | "no-auto-run guarantee";

export type ComfyUiJobInput = {
  id: string;
  label: string;
  source: string;
  ready: boolean;
};

export type ComfyUiJobParameterSet = {
  id: string;
  label: string;
  parameters: string[];
  safeForFirstPackage: boolean;
};

export type ComfyUiJobArtifactPlan = {
  id: string;
  destination: string;
  reviewSurface: string;
  deletionAllowed: false;
};

export type ComfyUiJobApprovalCheck = {
  id: string;
  label: ComfyUiJobReadinessLabel;
  passed: boolean;
  plainEnglish: string;
};

export type ComfyUiJobPackage = {
  id: string;
  title: string;
  inputs: ComfyUiJobInput[];
  parameterSet: ComfyUiJobParameterSet;
  artifactPlan: ComfyUiJobArtifactPlan;
  approvalChecks: ComfyUiJobApprovalCheck[];
  futureSubmitAllowed: false;
};

export type ComfyUiJobPackageHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type ComfyUiJobPackageSummary = {
  jobPackage: ComfyUiJobPackage;
  handoff: ComfyUiJobPackageHandoff;
  summary: string;
};
