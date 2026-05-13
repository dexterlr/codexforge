import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";

export type CodexForgeBrainSeedKind =
  | "starter-runtime"
  | "starter-memory"
  | "starter-workspace"
  | "starter-agent-team"
  | "starter-safety"
  | "starter-files"
  | "starter-recommendations"
  | "starter-health"
  | "starter-context";

export type CodexForgeBrainSeedStatus =
  | "preview"
  | "ready"
  | "blocked"
  | "created"
  | "skipped";

export type CodexForgeBrainSeedNodePlan = {
  id: string;
  kind: CodexForgeBrainSeedKind;
  graphNode: CodexForgeBrainNode;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  sourceLabel: string;
  readOnly: true;
};

export type CodexForgeBrainSeedEdgePlan = {
  id: string;
  kind: CodexForgeBrainSeedKind;
  graphEdge: CodexForgeBrainEdge;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  sourceLabel: string;
  readOnly: true;
};

export type CodexForgeBrainSeedSummary = {
  nodeCount: number;
  edgeCount: number;
  seedKinds: CodexForgeBrainSeedKind[];
  sourceLabels: string[];
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  readOnly: true;
  destructive: false;
};

export type CodexForgeBrainSeedQualityGate = {
  id: string;
  label: string;
  status: CodexForgeBrainSeedStatus;
  passed: boolean;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  readOnly: true;
  destructive: false;
};

export type CodexForgeBrainSeedGraphPlan = {
  id: string;
  status: CodexForgeBrainSeedStatus;
  graph: CodexForgeBrainGraph;
  nodePlans: CodexForgeBrainSeedNodePlan[];
  edgePlans: CodexForgeBrainSeedEdgePlan[];
  summary: CodexForgeBrainSeedSummary;
  qualityGates: CodexForgeBrainSeedQualityGate[];
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  sourceLabel: string;
  readOnly: true;
  destructive: false;
  mayOverwriteExistingGraph: false;
};

export type CodexForgeBrainSeedPreview = {
  id: string;
  status: CodexForgeBrainSeedStatus;
  plan: CodexForgeBrainSeedGraphPlan;
  summary: CodexForgeBrainSeedSummary;
  qualityGates: CodexForgeBrainSeedQualityGate[];
  actions: Array<{
    id: "create-starter-graph" | "keep-empty-graph";
    label: string;
    status: CodexForgeBrainSeedStatus;
    reason: string;
    evidence: string[];
    nextSafeAction: string;
    readOnly: boolean;
    destructive: false;
  }>;
  readOnly: true;
  destructive: false;
};

export type CodexForgeBrainOnboardingStep = {
  id:
    | "inspect-graph"
    | "preview-starter-graph"
    | "create-starter-graph"
    | "open-workspace"
    | "send-first-message"
    | "review-memory-clusters"
    | "inspect-runtime-health"
    | "explore-recommendations"
    | "review-approval-boundary"
    | "use-command-palette";
  title: string;
  status: CodexForgeBrainSeedStatus;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  readOnly: boolean;
  destructive: false;
};

export type CodexForgeBrainOnboardingPlan = {
  id: string;
  status: CodexForgeBrainSeedStatus;
  steps: CodexForgeBrainOnboardingStep[];
  nextStep: CodexForgeBrainOnboardingStep | null;
  reason: string;
  evidence: string[];
  nextSafeAction: string;
  readOnly: true;
  destructive: false;
};

export type CodexForgeBrainSeedBuildInput = {
  now?: number;
  existingGraph?: CodexForgeBrainGraph | null;
  seedId?: string;
};
