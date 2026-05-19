export type ComfyUiWorkflowNode = {
  id: string;
  label: string;
  kind: "prompt" | "model" | "sampler" | "conditioning" | "output";
  detail: string;
};

export type ComfyUiAdapterPreviewModel = {
  id: string;
  workflowName: string;
  summary: {
    nodeCount: number;
    promptNodeCount: number;
    outputCount: number;
    approvalRequired: boolean;
    executionStatus: "blocked";
  };
  nodes: ComfyUiWorkflowNode[];
  seedPolicy: string;
  modelPolicy: string;
  outputPlaceholders: string[];
  approvalPacket: string[];
  safetyBoundaries: string[];
  handoff: string;
};

