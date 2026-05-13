import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import type {
  CodexForgeBrainEmptyStateGateResult,
  CodexForgeBrainQualityGate,
  CodexForgeBrainQualitySummary,
} from "./quality-types";

export function buildBrainEmptyStateRecoveryAction(
  action:
    | "open-workspace"
    | "refresh-graph"
    | "inspect-storage-error"
    | "use-fixture-fallback"
    | "reset-graph"
): CodexForgeBrainQualityGate {
  const approvalLike = action === "reset-graph";
  const labels = {
    "open-workspace": "Open workspace",
    "refresh-graph": "Refresh graph",
    "inspect-storage-error": "Inspect storage error",
    "use-fixture-fallback": "Use fixture fallback",
    "reset-graph": "Reset graph explicitly",
  } as const;

  return {
    id: `brain.empty.action.${action}`,
    label: labels[action],
    status: approvalLike ? "partial" : "ready",
    severity: approvalLike ? "high" : "info",
    reason: approvalLike
      ? "Reset is available only when the user explicitly chooses it."
      : `${labels[action]} is a safe recovery action for an empty loaded graph.`,
    evidence: [`action:${action}`, approvalLike ? "explicit-user-choice-required" : "read-only:true"],
    nextSafeAction: labels[action],
    readOnly: approvalLike ? true : true,
  };
}

export function evaluateBrainEmptyState(input: {
  graph?: CodexForgeBrainGraph | null;
  error?: string | null;
  includeResetAction?: boolean;
}): CodexForgeBrainEmptyStateGateResult {
  const nodeCount = input.graph?.nodes.length ?? 0;
  const edgeCount = input.graph?.edges.length ?? 0;
  const isEmpty = Boolean(input.graph) && nodeCount === 0 && edgeCount === 0;
  const actions = [
    buildBrainEmptyStateRecoveryAction("refresh-graph"),
    buildBrainEmptyStateRecoveryAction("open-workspace"),
    input.error
      ? buildBrainEmptyStateRecoveryAction("inspect-storage-error")
      : buildBrainEmptyStateRecoveryAction("use-fixture-fallback"),
    ...(input.includeResetAction ? [buildBrainEmptyStateRecoveryAction("reset-graph")] : []),
  ];

  return {
    isEmpty,
    status: isEmpty ? "empty" : "ready",
    gate: {
      id: "brain.empty.state",
      label: "Empty graph",
      status: isEmpty ? "empty" : "ready",
      severity: isEmpty ? "low" : "info",
      reason: isEmpty
        ? "Graph loaded successfully with zero nodes and zero edges."
        : "Graph has live content or is not loaded yet.",
      evidence: [`nodes:${nodeCount}`, `edges:${edgeCount}`],
      nextSafeAction: isEmpty
        ? "Refresh graph, open workspace, or keep fixture fallback."
        : "Continue with the loaded graph.",
      readOnly: true,
    },
    actions,
    nodeCount,
    edgeCount,
  };
}

export function summarizeBrainEmptyState(
  result: CodexForgeBrainEmptyStateGateResult,
  generatedAt = 0
): CodexForgeBrainQualitySummary {
  return {
    generatedAt,
    readOnly: true,
    loadPhase: result.isEmpty ? "empty" : "loaded",
    graphStatus: result.status,
    snapshotStatus: "partial",
    panelStatus: "partial",
    sourceStatus: result.isEmpty ? "empty-live-graph" : "loaded-live-graph",
    gates: [result.gate, ...result.actions],
    nextSafeAction: result.gate.nextSafeAction,
  };
}
