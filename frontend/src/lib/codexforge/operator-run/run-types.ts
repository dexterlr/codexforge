import type { CodexForgeToolAdapterDescriptor } from "@/lib/codexforge/tools/tool-adapter-registry";

export type OperatorRunSourceSurface =
  | "files"
  | "patch-preview"
  | "creative"
  | "capabilities"
  | "brain"
  | "chat";

export type OperatorRunStatus =
  | "draft"
  | "preview"
  | "waiting-approval"
  | "blocked"
  | "simulated"
  | "completed-preview"
  | "failed-preview";

export type OperatorRunApprovalState =
  | "not-required"
  | "required"
  | "pending"
  | "approved-for-preview"
  | "blocked";

export type OperatorRunSideEffectLevel =
  | "none"
  | "read-only"
  | "local-file-write"
  | "local-app-control"
  | "external-network"
  | "broker-action";

export type OperatorRunRiskLevel = "low" | "medium" | "high" | "blocked";

export type OperatorRunTimelineStage =
  | "drafted"
  | "plan-prepared"
  | "policy-checked"
  | "approval-boundary"
  | "artifact-preview"
  | "future-execution-gated";

export type OperatorRunArtifactType =
  | "patch-preview"
  | "storyboard"
  | "blender-script-preview"
  | "comfyui-workflow-preview"
  | "unreal-command-preview"
  | "render-queue-manifest"
  | "research-summary"
  | "generic-output-placeholder";

export type OperatorRunStep = {
  id: string;
  label: string;
  summary: string;
  status: OperatorRunStatus;
  approvalRequired: boolean;
};

export type OperatorRunTimelineItem = {
  id: string;
  stage: OperatorRunTimelineStage;
  label: string;
  summary: string;
  status: OperatorRunStatus;
};

export type OperatorRunArtifactPreview = {
  id: string;
  type: OperatorRunArtifactType;
  label: string;
  summary: string;
  previewOnly: true;
};

export type OperatorRunReplay = {
  id: string;
  sourcePrompt: string;
  selectedTarget: string;
  planSummary: string;
  policyBoundary: string;
  artifactPreviewList: string[];
  validationChecklist: string[];
  approvalNotes: string[];
  prompt: string;
};

export type OperatorRunContext = {
  id: string;
  capabilityReadiness: string;
  creativePlan: string;
  patchPreviewPlan: string;
  brainRuntimeContext: string;
  notes: string[];
};

export type OperatorRunPolicyBoundary = {
  id: string;
  toolName: string;
  adapterId: string;
  executionBlocked: boolean;
  approvalRequired: boolean;
  previewAllowed: boolean;
  applyExecuteImplemented: false;
  reasons: string[];
  nextAction: string;
};

export type OperatorRunReadiness = {
  id: string;
  score: number;
  dimensions: {
    policy: number;
    context: number;
    artifact: number;
    adapter: number;
    approval: number;
    rollbackReplay: number;
  };
  summary: string;
};

export type OperatorRun = {
  id: string;
  title: string;
  sourceSurface: OperatorRunSourceSurface;
  capabilityId: string;
  adapterId: string;
  toolName: string;
  status: OperatorRunStatus;
  approvalState: OperatorRunApprovalState;
  sideEffectLevel: OperatorRunSideEffectLevel;
  riskLevel: OperatorRunRiskLevel;
  sourcePrompt: string;
  steps: OperatorRunStep[];
  timeline: OperatorRunTimelineItem[];
  expectedArtifacts: OperatorRunArtifactPreview[];
  replaySummary: OperatorRunReplay;
  context: OperatorRunContext;
  policyBoundary: OperatorRunPolicyBoundary;
  readiness: OperatorRunReadiness;
  safeNextAction: string;
};

export type OperatorRunInput = {
  id?: string;
  title?: string;
  sourceSurface?: OperatorRunSourceSurface;
  capabilityId?: string;
  adapterId?: string;
  toolName?: string;
  sourcePrompt?: string;
  selectedTarget?: string;
  planSummary?: string;
  adapter?: CodexForgeToolAdapterDescriptor | null;
};

export type OperatorRunQueue = {
  id: string;
  runs: OperatorRun[];
  summary: string;
  blockedCount: number;
  approvalRequiredCount: number;
  previewableCount: number;
};

export function buildOperatorRunReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}

export function normalizeOperatorRunId(value: string): string {
  return buildOperatorRunReactKey("run", value).replace(/:+/g, ":");
}
