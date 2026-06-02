export type GpuWorkerId = "GPU 1" | "GPU 2" | "manual override";

export type GpuWorkerRole = {
  id: string;
  workerId: GpuWorkerId;
  label: string;
  role: string;
  whenUseful: string;
  explicitReviewRequired: true;
};

export type DualGpuProfile = {
  id: string;
  workstation: string;
  gpuLabel: string;
  gpuCount: 2;
  memoryGuidance: string;
  manualProfileOnly: true;
};

export type GpuWorkerAssignment = {
  id: string;
  jobLabel: string;
  recommendedWorker: GpuWorkerId;
  reason: string;
  reviewRequired: true;
};

export type GpuWorkerSafety = {
  id: string;
  notes: string[];
  blocked: string;
};

export type GpuWorkerRoutingStrategy = {
  id: string;
  plainEnglish: string;
  rules: string[];
  combinedVramWarning: string;
};

export type GpuWorkerHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type DualGpuWorkerSummary = {
  profile: DualGpuProfile;
  roles: GpuWorkerRole[];
  assignments: GpuWorkerAssignment[];
  safety: GpuWorkerSafety;
  routingStrategy: GpuWorkerRoutingStrategy;
  handoff: GpuWorkerHandoff;
  summary: string;
};
