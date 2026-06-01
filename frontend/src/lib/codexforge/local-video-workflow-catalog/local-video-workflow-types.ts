export type LocalVideoWorkflowType =
  | "prompt-to-keyframe"
  | "keyframe-to-short-video-draft"
  | "image-to-video-draft"
  | "low-res-video-draft"
  | "upscale-video"
  | "interpolate-frames"
  | "storyboard-to-shots"
  | "batch-render-queue"
  | "local-draft-then-cloud-final";

export type LocalVideoWorkflowStep = {
  id: string;
  label: string;
  plainEnglish: string;
  order: number;
};

export type LocalVideoWorkflowRequirement = {
  id: string;
  label: string;
  manualSetup: string;
};

export type LocalVideoWorkflowRisk = {
  id: string;
  label: string;
  mitigation: string;
};

export type LocalVideoWorkflowRouting = {
  id: string;
  localFirstReason: string;
  cloudFallbackRule: string;
  approvalBoundary: string;
};

export type LocalVideoWorkflow = {
  id: string;
  type: LocalVideoWorkflowType;
  title: string;
  whenToUse: string;
  steps: LocalVideoWorkflowStep[];
  requirements: LocalVideoWorkflowRequirement[];
  risks: LocalVideoWorkflowRisk[];
  routing: LocalVideoWorkflowRouting;
};

export type LocalVideoWorkflowSummary = {
  workflows: LocalVideoWorkflow[];
  workflowCount: number;
  localDraftCount: number;
  summary: string;
  nextAction: string;
};
