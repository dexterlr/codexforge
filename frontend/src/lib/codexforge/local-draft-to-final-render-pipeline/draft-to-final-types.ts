export type DraftToFinalDecisionState =
  | "ready-for-future-approved-final-render"
  | "needs-better-draft"
  | "needs-upscale-plan"
  | "needs-interpolation-plan"
  | "needs-review"
  | "blocked"
  | "unknown";

export type DraftToFinalPipeline = {
  id: string;
  stages: string[];
  localFirstPosture: string;
  approvalRequired: true;
  noAutoRun: true;
};

export type DraftToFinalReadinessCheck = {
  id: string;
  label: string;
  ready: boolean;
  plainEnglish: string;
};

export type DraftToFinalReadiness = {
  id: string;
  checks: DraftToFinalReadinessCheck[];
};

export type DraftToFinalDecision = {
  id: string;
  state: DraftToFinalDecisionState;
  plainEnglish: string;
};

export type DraftToFinalResourcePlan = {
  id: string;
  gpuTimePosture: string;
  manualCostNote: string;
  plainEnglish: string;
};

export type DraftToFinalArtifactPlan = {
  id: string;
  artifactDestination: string;
  versionNote: string;
  recoveryPath: string;
};

export type DraftToFinalHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type DraftToFinalSummary = {
  pipeline: DraftToFinalPipeline;
  readiness: DraftToFinalReadiness;
  decision: DraftToFinalDecision;
  resourcePlan: DraftToFinalResourcePlan;
  artifactPlan: DraftToFinalArtifactPlan;
  handoff: DraftToFinalHandoff;
  summary: string;
};
