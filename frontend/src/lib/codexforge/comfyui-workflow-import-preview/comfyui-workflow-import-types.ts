export type ComfyUiWorkflowSourceType =
  | "pasted-json-preview"
  | "file-reference-preview"
  | "manual-workflow-note"
  | "template-workflow"
  | "future-import";

export type ComfyUiWorkflowSource = {
  id: string;
  type: ComfyUiWorkflowSourceType;
  label: string;
  plainEnglish: string;
  rawJsonPreview?: string;
  importAllowed: false;
};

export type ComfyUiWorkflowImportPlan = {
  id: string;
  sourceId: string;
  steps: string[];
  previewOnly: true;
};

export type ComfyUiWorkflowNodeSummary = {
  id: string;
  nodeKind: string;
  plainEnglish: string;
  safeToShow: boolean;
};

export type ComfyUiWorkflowAssetReference = {
  id: string;
  assetKind: string;
  reference: string;
  downloadAllowed: false;
  status: "planned" | "missing" | "unknown";
};

export type ComfyUiWorkflowImportSafety = {
  id: string;
  label: string;
  safeSummaryByDefault: true;
  workflowExecutionAllowed: false;
  comfyUiApiCallAllowed: false;
  automaticAssetDownloadAllowed: false;
  promptSendAllowed: false;
  rawJsonSecondary: true;
};

export type ComfyUiWorkflowImportHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type ComfyUiWorkflowImportSummary = {
  sources: ComfyUiWorkflowSource[];
  plan: ComfyUiWorkflowImportPlan;
  nodes: ComfyUiWorkflowNodeSummary[];
  assets: ComfyUiWorkflowAssetReference[];
  safety: ComfyUiWorkflowImportSafety;
  handoff: ComfyUiWorkflowImportHandoff;
  summary: string;
};
