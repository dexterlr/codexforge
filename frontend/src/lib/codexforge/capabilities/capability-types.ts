import type {
  CodexForgeCapabilityBridgeConsent,
  CodexForgeCapabilityBridgeId,
  CodexForgeCapabilityBridgeRiskLevel,
  CodexForgeCapabilityBridgeStatus,
  CodexForgeResolvedCapabilityBridge,
} from "@/lib/codexforge/tools/capability-bridge-manifest";
import type {
  CodexForgeToolAdapterCapability,
  CodexForgeToolAdapterDescriptor,
  CodexForgeToolAdapterExecutionMode,
} from "@/lib/codexforge/tools/tool-adapter-registry";

export type CodexForgeCapabilityId = CodexForgeCapabilityBridgeId;
export type CodexForgeCapabilityStatus = CodexForgeCapabilityBridgeStatus;
export type CodexForgeCapabilityConsent = CodexForgeCapabilityBridgeConsent;
export type CodexForgeCapabilityRiskLevel = CodexForgeCapabilityBridgeRiskLevel;
export type CodexForgeCapabilityDescriptor = CodexForgeResolvedCapabilityBridge;
export type CodexForgeCapabilityAdapter = CodexForgeToolAdapterDescriptor;
export type CodexForgeCapabilityAdapterCapability = CodexForgeToolAdapterCapability;
export type CodexForgeCapabilityAdapterExecutionMode = CodexForgeToolAdapterExecutionMode;

export type CodexForgeCapabilitySafetyClass =
  | "read-only"
  | "research-approval-gated"
  | "creative-approval-gated"
  | "explicit-session-consent"
  | "local-safe-simulated"
  | "blocked";

export type CodexForgeCapabilityReadiness = {
  id: CodexForgeCapabilityId;
  label: string;
  status: CodexForgeCapabilityStatus;
  riskLevel: CodexForgeCapabilityRiskLevel;
  operatorMode: CodexForgeCapabilityDescriptor["operatorMode"];
  adapterPresent: boolean;
  adapterCount: number;
  missingAdapterToolNames: string[];
  approvalRequired: boolean;
  executionBlocked: boolean;
  consentRequirement: CodexForgeCapabilityConsent;
  sideEffectRisk: CodexForgeCapabilityAdapter["sideEffect"] | "mixed";
  smokeCoverageHint: string;
  nextMilestone: string;
  safeNextAction: string;
  score: number;
  summary: string;
};

export type CodexForgeCapabilityApprovalBoundary = {
  capabilityId: CodexForgeCapabilityId;
  title: string;
  required: boolean;
  blocked: boolean;
  consent: CodexForgeCapabilityConsent;
  operatorMessage: string;
  allowedNow: string[];
  requiresApprovalBefore: string[];
  neverAllowedInCockpit: string[];
};

export type CodexForgeCapabilityWorkflowStepStatus =
  | "ready"
  | "preview-only"
  | "approval-required"
  | "blocked";

export type CodexForgeCapabilityWorkflowStep = {
  id: string;
  label: string;
  status: CodexForgeCapabilityWorkflowStepStatus;
  summary: string;
};

export type CodexForgeCapabilityWorkflow = {
  capabilityId: CodexForgeCapabilityId;
  label: string;
  steps: CodexForgeCapabilityWorkflowStep[];
  nextAction: string;
  summary: string;
};

export type CodexForgeCreativeProductionStage = {
  id: string;
  label: string;
  status: "planned" | "preview" | "approval-required" | "simulated";
  summary: string;
  artifacts: string[];
};

export type CodexForgeCreativeProductionPlan = {
  id: string;
  capabilityId: CodexForgeCapabilityId;
  label: string;
  productionGoalPlaceholder: string;
  assetPlan: string[];
  sceneWorkflowLevelPlan: string[];
  stages: CodexForgeCreativeProductionStage[];
  approvalBoundary: string;
  artifactOutputPreview: string[];
  renderQueuePreview: CodexForgeCreativeRenderQueueItem[];
  summary: string;
};

export type CodexForgeCreativeRenderQueueItem = {
  id: string;
  label: string;
  capabilityId: CodexForgeCapabilityId;
  executionMode: "local-safe-simulated" | "approval-gated-preview";
  status: "queued-preview" | "blocked-until-approval";
  outputPathPlaceholder: string;
  safetyNote: string;
};

export type CodexForgeAdapterHealth = {
  toolName: string;
  label: string;
  capability: CodexForgeCapabilityAdapterCapability;
  executionMode: CodexForgeCapabilityAdapterExecutionMode;
  requiresApproval: boolean;
  blockedByDefault: boolean;
  sideEffect: CodexForgeCapabilityAdapter["sideEffect"];
  readinessSummary: string;
};

export type CodexForgeCapabilityArtifact = {
  artifactId: string;
  capabilityId: CodexForgeCapabilityId;
  type: "plan" | "scene" | "workflow" | "level" | "render-preview" | "research-note" | "audit-note";
  label: string;
  status: "preview-only" | "planned" | "blocked";
  outputPathPlaceholder: string;
  createdByStage: string;
  safetyNote: string;
};

export type CodexForgeCapabilityRoadmapItem = {
  id: string;
  capabilityId: CodexForgeCapabilityId;
  label: string;
  status: CodexForgeCapabilityStatus;
  nextMilestone: string;
  safetyGate: string;
};

export function buildCodexForgeCapabilityReactKey(
  scope: string,
  parts: readonly unknown[],
  index: number
): string {
  const stableParts = parts
    .map((part) => {
      if (typeof part === "string" || typeof part === "number" || typeof part === "boolean") {
        return String(part);
      }

      return "";
    })
    .map((part) => part.trim().toLowerCase().replace(/[^a-z0-9_.:/-]+/g, "-"))
    .filter(Boolean);

  return [scope, ...stableParts, String(index)].join(":");
}
