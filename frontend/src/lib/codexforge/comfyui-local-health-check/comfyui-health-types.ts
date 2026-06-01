export type ComfyUiHealthTarget = {
  id: string;
  name: string;
  expectedBaseUrl: string;
  hostRule: string;
  localOnlyRecommended: true;
};

export type ComfyUiHealthPlan = {
  id: string;
  checks: string[];
  verifies: string[];
  liveChecking: "planned-approved-boundary-only";
  workflowRunAllowed: false;
};

export type ComfyUiHealthSafety = {
  id: string;
  guarantees: string[];
  blocked: string[];
};

export type ComfyUiHealthResult = {
  id: string;
  status: "preview-only" | "blocked-until-approved" | "manual-setup-required";
  meaning: string;
};

export type ComfyUiHealthSummary = {
  target: ComfyUiHealthTarget;
  plan: ComfyUiHealthPlan;
  safety: ComfyUiHealthSafety;
  result: ComfyUiHealthResult;
  summary: string;
  nextAction: string;
};
