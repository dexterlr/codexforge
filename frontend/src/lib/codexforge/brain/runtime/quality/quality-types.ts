import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataReadiness,
  CodexForgeBrainPanelId,
} from "@/lib/codexforge/brain/runtime/panels";
import type { CodexForgeBrainRuntimeSnapshot } from "@/lib/codexforge/brain/runtime/snapshot";

export type CodexForgeBrainLoadPhase =
  | "initializing"
  | "loading"
  | "loaded"
  | "empty"
  | "fixture"
  | "error";

export type CodexForgeBrainLoadStatus =
  | "ready"
  | "partial"
  | "empty"
  | "recoverable-error"
  | "blocked";

export type CodexForgeBrainQualityGateSeverity =
  | "info"
  | "low"
  | "medium"
  | "high"
  | "critical";

export type CodexForgeBrainQualityGate = {
  id: string;
  label: string;
  status: CodexForgeBrainLoadStatus;
  severity: CodexForgeBrainQualityGateSeverity;
  reason: string;
  evidence: readonly string[];
  nextSafeAction: string;
  readOnly: true;
};

export type CodexForgeBrainGraphLoadGateResult = {
  phase: CodexForgeBrainLoadPhase;
  status: CodexForgeBrainLoadStatus;
  gate: CodexForgeBrainQualityGate;
  graph?: CodexForgeBrainGraph | null;
  loaded: boolean;
  mounted: boolean;
  nodeCount: number;
  edgeCount: number;
  errorMessage?: string;
};

export type CodexForgeBrainSnapshotPanelGateResult = {
  snapshotStatus: CodexForgeBrainLoadStatus;
  panelStatus: CodexForgeBrainLoadStatus;
  snapshotGate: CodexForgeBrainQualityGate;
  panelGate: CodexForgeBrainQualityGate;
  blockedPanels: readonly CodexForgeBrainPanelId[];
  livePanels: readonly CodexForgeBrainPanelId[];
  mixedPanels: readonly CodexForgeBrainPanelId[];
  fixturePanels: readonly CodexForgeBrainPanelId[];
  unavailablePanels: readonly CodexForgeBrainPanelId[];
  stalePanels: readonly CodexForgeBrainPanelId[];
  emptyPanels: readonly CodexForgeBrainPanelId[];
};

export type CodexForgeBrainEmptyStateGateResult = {
  isEmpty: boolean;
  status: CodexForgeBrainLoadStatus;
  gate: CodexForgeBrainQualityGate;
  actions: readonly CodexForgeBrainQualityGate[];
  nodeCount: number;
  edgeCount: number;
};

export type CodexForgeBrainQualitySummary = {
  generatedAt: number;
  readOnly: true;
  loadPhase: CodexForgeBrainLoadPhase;
  graphStatus: CodexForgeBrainLoadStatus;
  snapshotStatus: CodexForgeBrainLoadStatus;
  panelStatus: CodexForgeBrainLoadStatus;
  sourceStatus: string;
  gates: readonly CodexForgeBrainQualityGate[];
  nextSafeAction: string;
};

export type CodexForgeBrainGraphLoadInput = {
  mounted?: boolean;
  loaded?: boolean;
  graph?: CodexForgeBrainGraph | null;
  error?: string | Error | null;
  usingFixture?: boolean;
};

export type CodexForgeBrainSnapshotPanelGateInput = {
  snapshot?: CodexForgeBrainRuntimeSnapshot | null;
  panelData?: Partial<Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>>;
  panelReadiness?: Partial<Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataReadiness>>;
  now?: number;
};
