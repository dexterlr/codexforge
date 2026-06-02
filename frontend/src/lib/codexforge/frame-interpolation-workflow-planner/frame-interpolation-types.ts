export type InterpolationSmoothnessTarget = "natural" | "cinematic" | "extra-smooth" | "preview-only";

export type InterpolationWorkflowPlan = {
  id: string;
  sourceDraft: string;
  sourceFps: string;
  targetFps: string;
  smoothnessTarget: InterpolationSmoothnessTarget;
  outputDuration: string;
  localGpuTimePosture: string;
  approvalRequired: true;
  noAutoRun: true;
};

export type InterpolationSourceReview = {
  id: string;
  sourceQuality: string;
  motionNotes: string;
  plainEnglish: string;
};

export type InterpolationTargetProfile = {
  id: string;
  targetFps: string;
  smoothnessTarget: InterpolationSmoothnessTarget;
  outputDuration: string;
  plainEnglish: string;
};

export type InterpolationRiskReview = {
  id: string;
  artifactRisk: string;
  flickerRisk: string;
  safeReviewNotes: string[];
};

export type InterpolationResourceEstimate = {
  id: string;
  localGpuTimePosture: string;
  expectedWait: string;
  costSignal: string;
  plainEnglish: string;
};

export type InterpolationHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type InterpolationSummary = {
  plan: InterpolationWorkflowPlan;
  sourceReview: InterpolationSourceReview;
  targetProfile: InterpolationTargetProfile;
  riskReview: InterpolationRiskReview;
  resourceEstimate: InterpolationResourceEstimate;
  handoff: InterpolationHandoff;
  summary: string;
};
