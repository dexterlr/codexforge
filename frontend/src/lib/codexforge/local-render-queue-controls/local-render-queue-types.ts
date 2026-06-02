export type RenderQueueStateId =
  | "empty"
  | "draft"
  | "needs-review"
  | "approved-preview-only"
  | "held"
  | "blocked"
  | "future-running"
  | "complete-supplied"
  | "failed-supplied";

export type RenderQueueControlId =
  | "review"
  | "hold"
  | "prioritize"
  | "remove-from-preview"
  | "retry-plan"
  | "cancel-future-job"
  | "pause-future-queue"
  | "resume-future-queue";

export type RenderQueueItem = {
  id: string;
  label: string;
  state: RenderQueueStateId;
  resourcePosture: string;
  workerPreference: string;
  reviewNote: string;
  executionAllowed: false;
};

export type RenderQueueState = {
  id: RenderQueueStateId;
  label: string;
  plainEnglish: string;
  executionAllowed: false;
};

export type RenderQueueControl = {
  id: RenderQueueControlId;
  label: string;
  plainEnglish: string;
  previewOnly: true;
  destructive: false;
};

export type RenderQueuePolicy = {
  id: string;
  rules: string[];
  plainEnglish: string;
};

export type RenderQueueSafety = {
  id: string;
  notes: string[];
  blocked: string;
};

export type RenderQueueHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type RenderQueueSummary = {
  items: RenderQueueItem[];
  states: RenderQueueState[];
  controls: RenderQueueControl[];
  policy: RenderQueuePolicy;
  safety: RenderQueueSafety;
  handoff: RenderQueueHandoff;
  summary: string;
};
