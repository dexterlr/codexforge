import type {
  CodexForgeCapabilityBridgeId,
  CodexForgeCapabilityBridgeRiskLevel,
} from "@/lib/codexforge/tools/capability-bridge-manifest";
import type {
  CodexForgeToolAdapterCapability,
  CodexForgeToolAdapterExecutionMode,
} from "@/lib/codexforge/tools/tool-adapter-registry";

export type BridgeMode = "preview-only";

export type BridgeConsentStatus =
  | "preview-allowed"
  | "future-session-consent-required"
  | "approval-required"
  | "blocked";

export type BridgeReadinessStatus = "ready" | "guarded" | "blocked";

export type BridgeOperatorPresence = {
  status: "operator-present";
  label: string;
  detail: string;
};

export type BridgeCapabilityFamily =
  | "self-inspection"
  | "AI router"
  | "web research"
  | "render-job"
  | "video-render"
  | "Blender"
  | "ComfyUI"
  | "Unreal"
  | "PC bridge"
  | "camera"
  | "trading research"
  | "broker execution"
  | "file mutation"
  | "command execution"
  | "creative tool execution";

export type BridgeActionId =
  | "preview-readiness"
  | "desktop-control"
  | "camera-inspection"
  | "file-mutation"
  | "command-execution"
  | "creative-execution"
  | "broker-execution"
  | "run-handoff";

export type BridgeConsentRule = {
  id: BridgeActionId;
  label: string;
  status: BridgeConsentStatus;
  allowedInPreview: boolean;
  reason: string;
  futureRequirement: string;
};

export type BridgeConsentBoundary = {
  mode: BridgeMode;
  status: BridgeConsentStatus;
  rules: BridgeConsentRule[];
  summary: string[];
};

export type BridgeSession = {
  id: string;
  mode: BridgeMode;
  operatorPresence: BridgeOperatorPresence;
  consentStatus: BridgeConsentStatus;
  allowedCapabilityFamilies: BridgeCapabilityFamily[];
  blockedCapabilityFamilies: BridgeCapabilityFamily[];
  timeoutLabel: string;
  safeNextAction: string;
};

export type BridgeReadinessDimension = {
  id: string;
  label: string;
  status: BridgeReadinessStatus;
  score: number;
  detail: string;
};

export type BridgeReadiness = {
  dimensions: BridgeReadinessDimension[];
  score: number;
  label: string;
  summary: string[];
};

export type BridgeHandshakeStepId =
  | "inspect-adapter"
  | "check-consent-boundary"
  | "check-policy"
  | "prepare-run-handoff"
  | "await-explicit-approval"
  | "future-external-execution";

export type BridgeHandshakeStep = {
  id: BridgeHandshakeStepId;
  label: string;
  status: BridgeReadinessStatus;
  detail: string;
  safe: boolean;
};

export type BridgeHandshakePreview = {
  id: string;
  adapterFamily: BridgeCapabilityFamily;
  mode: BridgeMode;
  steps: BridgeHandshakeStep[];
  blocked: boolean;
  summary: string[];
};

export type BridgeAdapterMatrixItem = {
  id: CodexForgeCapabilityBridgeId | "render-job";
  family: BridgeCapabilityFamily;
  label: string;
  capability: CodexForgeToolAdapterCapability | "rendering";
  mode: CodexForgeToolAdapterExecutionMode | BridgeMode;
  readiness: BridgeReadinessStatus;
  approvalRequired: boolean;
  blockedReason: string | null;
  nextSafeMilestone: string;
  riskLevel: CodexForgeCapabilityBridgeRiskLevel;
};

export type BridgeAdapterGroup = {
  family: BridgeCapabilityFamily;
  items: BridgeAdapterMatrixItem[];
};

export type BridgeAdapterMatrix = {
  items: BridgeAdapterMatrixItem[];
  groups: BridgeAdapterGroup[];
  summary: string[];
};

export type BridgeRiskLevel = "low" | "medium" | "high" | "critical";

export type BridgePolicyRule = {
  id: string;
  label: string;
  risk: BridgeRiskLevel;
  enforced: boolean;
  detail: string;
};

export type BridgePolicyBoundary = {
  mode: BridgeMode;
  rules: BridgePolicyRule[];
  blockedActions: BridgeActionId[];
  summary: string[];
};

export type BridgeAuditItem = {
  id: string;
  label: string;
  status: "recorded" | "blocked";
  detail: string;
};

export type BridgeAuditTrail = {
  mode: BridgeMode;
  items: BridgeAuditItem[];
  summary: string[];
};

export type BridgeRunHandoff = {
  id: string;
  selectedAdapter: BridgeAdapterMatrixItem;
  consentBoundary: BridgeConsentBoundary;
  policyBoundary: BridgePolicyBoundary;
  previewRunPayload: {
    mode: BridgeMode;
    adapter: string;
    capability: string;
    action: string;
  };
  validationChecklist: string[];
  blocked: boolean;
  approvalState: "not-requested" | "required-before-future-execution" | "blocked";
};

export type BridgeSummary = {
  session: string[];
  consent: string[];
  readiness: string[];
  handshake: string[];
  adapters: string[];
  policy: string[];
  audit: string[];
  handoff: string[];
};

export type BridgeCenterModel = {
  session: BridgeSession;
  consentBoundary: BridgeConsentBoundary;
  readiness: BridgeReadiness;
  handshake: BridgeHandshakePreview;
  adapterMatrix: BridgeAdapterMatrix;
  policyBoundary: BridgePolicyBoundary;
  auditTrail: BridgeAuditTrail;
  runHandoff: BridgeRunHandoff;
  summary: BridgeSummary;
};
