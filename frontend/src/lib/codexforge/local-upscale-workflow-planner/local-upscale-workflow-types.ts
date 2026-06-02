export type UpscaleQualityTarget = "balanced" | "detail-preserving" | "fast-preview" | "final-candidate";

export type UpscaleWorkflowPlan = {
  id: string;
  sourceDraft: string;
  targetResolution: string;
  qualityTarget: UpscaleQualityTarget;
  artifactDestination: string;
  localFirstPosture: string;
  gpuTimePosture: string;
  approvalRequired: true;
  noAutoRun: true;
};

export type UpscaleSourceReview = {
  id: string;
  draftSelected: boolean;
  sourceResolution: string;
  reviewStatus: string;
  plainEnglish: string;
};

export type UpscaleTargetProfile = {
  id: string;
  targetResolution: string;
  qualityTarget: UpscaleQualityTarget;
  plainEnglish: string;
};

export type UpscaleResourceEstimate = {
  id: string;
  gpuTimePosture: string;
  expectedWait: string;
  costSignal: string;
  plainEnglish: string;
};

export type UpscaleSafetyReview = {
  id: string;
  localFirst: true;
  approvalRequired: true;
  noAutoRunGuarantee: true;
  blockedUntilApprovedExecution: true;
  safeSettings: string[];
};

export type UpscaleWorkflowHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type UpscaleWorkflowSummary = {
  plan: UpscaleWorkflowPlan;
  sourceReview: UpscaleSourceReview;
  targetProfile: UpscaleTargetProfile;
  resourceEstimate: UpscaleResourceEstimate;
  safetyReview: UpscaleSafetyReview;
  handoff: UpscaleWorkflowHandoff;
  summary: string;
};
