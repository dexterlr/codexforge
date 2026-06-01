export type WorkflowParameterGroupKind =
  | "prompt"
  | "negative prompt"
  | "seed"
  | "resolution"
  | "frames"
  | "duration"
  | "sampler/steps"
  | "model/checkpoint"
  | "LoRA/style"
  | "input image/keyframe"
  | "output path"
  | "batch count";

export type WorkflowParameterSafetyLevel =
  | "safe editable"
  | "review before edit"
  | "advanced only"
  | "blocked for first run"
  | "unknown";

export type WorkflowParameter = {
  id: string;
  group: WorkflowParameterGroupKind;
  label: string;
  plainEnglish: string;
  safetyLevel: WorkflowParameterSafetyLevel;
};

export type WorkflowParameterGroup = {
  id: string;
  group: WorkflowParameterGroupKind;
  explanation: string;
  parameterIds: string[];
};

export type WorkflowParameterSafety = {
  id: string;
  level: WorkflowParameterSafetyLevel;
  explanation: string;
};

export type WorkflowParameterPreset = {
  id: string;
  label: string;
  plainEnglish: string;
  lockedValues: string[];
};

export type WorkflowParameterMapping = {
  id: string;
  parameters: WorkflowParameter[];
  groups: WorkflowParameterGroup[];
  safety: WorkflowParameterSafety[];
  preset: WorkflowParameterPreset;
  workflowMutationAllowed: false;
};

export type WorkflowParameterHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type WorkflowParameterSummary = {
  mapping: WorkflowParameterMapping;
  handoff: WorkflowParameterHandoff;
  summary: string;
};
