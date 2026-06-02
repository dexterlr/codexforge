export type ComfyUiMetadataStatus = "supplied" | "unknown";
export type ComfyUiMetadataResultSource = "supplied" | "preview" | "future-approved-probe";
export type ComfyUiMetadataBaseUrlStatus = "supplied-local-preview" | "missing" | "blocked-nonlocal";
export type ComfyUiMetadataLocalOnlyStatus = "local-only" | "not-local" | "unknown";

export type ComfyUiMetadataTarget = {
  id: string;
  name: string;
  baseUrl: string;
  localOnly: boolean;
  metadataOnly: true;
};

export type ComfyUiMetadataRequest = {
  id: string;
  target: ComfyUiMetadataTarget;
  allowedChecks: string[];
  promptPayloadAllowed: false;
  workflowSubmissionAllowed: false;
  queueMutationAllowed: false;
  fileWriteAllowed: false;
};

export type ComfyUiMetadataResult = {
  id: string;
  baseUrlStatus: ComfyUiMetadataBaseUrlStatus;
  localOnlyStatus: ComfyUiMetadataLocalOnlyStatus;
  serverReachable: ComfyUiMetadataStatus;
  version: ComfyUiMetadataStatus;
  systemStats: ComfyUiMetadataStatus;
  queueStats: ComfyUiMetadataStatus;
  nodeList: ComfyUiMetadataStatus;
  modelList: ComfyUiMetadataStatus;
  noPromptSent: true;
  noWorkflowSubmitted: true;
  noQueueMutation: true;
  resultSource: ComfyUiMetadataResultSource;
};

export type ComfyUiMetadataSafety = {
  id: string;
  guarantees: string[];
  blocked: string[];
};

export type ComfyUiMetadataHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type ComfyUiMetadataSummary = {
  target: ComfyUiMetadataTarget;
  request: ComfyUiMetadataRequest;
  result: ComfyUiMetadataResult;
  safety: ComfyUiMetadataSafety;
  handoff: ComfyUiMetadataHandoff;
  summary: string;
};
