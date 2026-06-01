export type VideoJobStatusId =
  | "draft"
  | "needs-review"
  | "approved-preview-only"
  | "queued-planned"
  | "blocked"
  | "running-future"
  | "complete-supplied"
  | "failed-supplied";

export type VideoJobRequest = {
  id: string;
  prompt: string;
  workflowType: string;
  provider: string;
  localCloudPosture: "local-draft-first" | "local-only-preview" | "cloud-fallback-later";
  resolutionTarget: string;
  durationTarget: string;
  mode: "draft" | "final";
  estimatedGpuTimePosture: string;
  artifactDestination: string;
  approvalRequired: true;
  noAutoRunGuarantee: true;
};

export type VideoJobReview = {
  id: string;
  requestId: string;
  checklist: string[];
  approvalRequired: true;
};

export type VideoJobStatus = {
  id: VideoJobStatusId;
  label: string;
  plainEnglish: string;
  executionAllowed: false;
};

export type VideoJobResourceEstimate = {
  id: string;
  requestId: string;
  gpuPosture: string;
  timePosture: string;
  costPosture: string;
};

export type VideoJobArtifactPlan = {
  id: string;
  requestId: string;
  destination: string;
  expectedArtifacts: string[];
  writeBoundary: string;
};

export type VideoJobQueueSummary = {
  requests: VideoJobRequest[];
  reviews: VideoJobReview[];
  statuses: VideoJobStatus[];
  estimates: VideoJobResourceEstimate[];
  artifactPlans: VideoJobArtifactPlan[];
  summary: string;
  nextAction: string;
};
