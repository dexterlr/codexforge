export type GpuJobKind =
  | "keyframe generation"
  | "short video draft"
  | "upscale pass"
  | "interpolation pass"
  | "final render candidate"
  | "artifact review task"
  | "background batch"
  | "urgent retry";

export type GpuJobPriorityLevel = "now" | "soon" | "later" | "background" | "blocked";

export type GpuJobResourcePosture = "light" | "medium" | "heavy" | "very-heavy" | "unknown";

export type GpuJobProfile = {
  id: string;
  kind: GpuJobKind;
  label: string;
  plainEnglish: string;
  resourcePosture: GpuJobResourcePosture;
  estimatedTimePosture: string;
  approvalRequired: true;
};

export type GpuJobPriority = {
  id: string;
  jobId: string;
  level: GpuJobPriorityLevel;
  reason: string;
};

export type GpuJobResourcePlan = {
  id: string;
  jobId: string;
  resourcePosture: GpuJobResourcePosture;
  queueReason: string;
  workerHint: string;
  safetyNote: string;
};

export type GpuJobSchedulePreview = {
  id: string;
  orderedJobIds: string[];
  lanes: string[];
  plainEnglish: string;
  executionAllowed: false;
};

export type GpuJobSchedulerSafety = {
  id: string;
  notes: string[];
  blocked: string;
};

export type GpuJobSchedulerHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type GpuJobSchedulerSummary = {
  profiles: GpuJobProfile[];
  priorities: GpuJobPriority[];
  resourcePlans: GpuJobResourcePlan[];
  schedule: GpuJobSchedulePreview;
  safety: GpuJobSchedulerSafety;
  handoff: GpuJobSchedulerHandoff;
  summary: string;
};
