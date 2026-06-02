export type FinishingStepStatus = "manual-review" | "planned" | "blocked-until-approved";

export type FinishingStep = {
  id: string;
  label: string;
  plainEnglish: string;
  status: FinishingStepStatus;
};

export type FinishingPipeline = {
  id: string;
  title: string;
  steps: FinishingStep[];
  localFirstPosture: string;
  approvalRequired: true;
  noAutoRun: true;
};

export type FinishingQualityGate = {
  id: string;
  label: string;
  passed: boolean;
  plainEnglish: string;
};

export type FinishingResourcePlan = {
  id: string;
  gpuTimePosture: string;
  reviewCost: string;
  manualNotes: string;
};

export type FinishingExportPlan = {
  id: string;
  targetFormat: string;
  artifactDestination: string;
  plainEnglish: string;
};

export type FinishingHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type FinishingSummary = {
  pipeline: FinishingPipeline;
  qualityGates: FinishingQualityGate[];
  resourcePlan: FinishingResourcePlan;
  exportPlan: FinishingExportPlan;
  handoff: FinishingHandoff;
  summary: string;
};
