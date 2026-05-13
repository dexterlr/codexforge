import type {
  CodexForgeBrainGraphLoadGateResult,
  CodexForgeBrainGraphLoadInput,
  CodexForgeBrainLoadPhase,
  CodexForgeBrainLoadStatus,
  CodexForgeBrainQualityGate,
  CodexForgeBrainQualitySummary,
} from "./quality-types";

function errorMessage(error: string | Error | null | undefined): string {
  if (!error) return "";
  if (typeof error === "string") return error.trim();
  return error.message.trim();
}

function isRecoverableStorageError(message: string): boolean {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("storage") ||
    normalized.includes("localstorage") ||
    normalized.includes("quota") ||
    normalized.includes("json") ||
    normalized.includes("parse") ||
    normalized.includes("security")
  );
}

export function normalizeBrainGraphLoadPhase(input: {
  mounted?: boolean;
  loaded?: boolean;
  nodeCount?: number;
  edgeCount?: number;
  error?: string | Error | null;
  usingFixture?: boolean;
}): CodexForgeBrainLoadPhase {
  const message = errorMessage(input.error);
  if (message) return "error";
  if (input.usingFixture) return "fixture";
  if (!input.mounted) return "initializing";
  if (!input.loaded) return "loading";
  if ((input.nodeCount ?? 0) === 0 && (input.edgeCount ?? 0) === 0) return "empty";
  return "loaded";
}

export function buildBrainGraphLoadGate(input: {
  phase: CodexForgeBrainLoadPhase;
  nodeCount?: number;
  edgeCount?: number;
  error?: string | Error | null;
}): CodexForgeBrainQualityGate {
  const message = errorMessage(input.error);
  const nodeCount = input.nodeCount ?? 0;
  const edgeCount = input.edgeCount ?? 0;

  if (input.phase === "error") {
    const recoverable = isRecoverableStorageError(message);
    return {
      id: "brain.graph.load.error",
      label: "Graph load",
      status: recoverable ? "recoverable-error" : "blocked",
      severity: recoverable ? "high" : "critical",
      reason: message || "Brain graph load failed before a graph was available.",
      evidence: [recoverable ? "recoverable-storage-error" : "blocked-load-error"],
      nextSafeAction: recoverable
        ? "Retry load, inspect storage diagnostics, or use fixture fallback."
        : "Review the graph load diagnostic before continuing.",
      readOnly: true,
    };
  }

  if (input.phase === "empty") {
    return {
      id: "brain.graph.load.empty",
      label: "Graph load",
      status: "empty",
      severity: "low",
      reason: "Graph loaded with zero nodes and zero edges.",
      evidence: ["nodes:0", "edges:0", "loaded:true"],
      nextSafeAction: "Refresh graph, open workspace, or keep fixture fallback.",
      readOnly: true,
    };
  }

  if (input.phase === "loaded") {
    return {
      id: "brain.graph.load.ready",
      label: "Graph load",
      status: "ready",
      severity: "info",
      reason: "Graph loaded and can render the command center.",
      evidence: [`nodes:${nodeCount}`, `edges:${edgeCount}`, "loaded:true"],
      nextSafeAction: "Continue inspecting the graph and runtime panels.",
      readOnly: true,
    };
  }

  if (input.phase === "fixture") {
    return {
      id: "brain.graph.load.fixture",
      label: "Graph load",
      status: "partial",
      severity: "medium",
      reason: "Fixture fallback is available while live graph evidence is incomplete.",
      evidence: ["fixture-fallback:true"],
      nextSafeAction: "Treat fixture data as advisory and retry live graph load.",
      readOnly: true,
    };
  }

  return {
    id: "brain.graph.load.pending",
    label: "Graph load",
    status: "partial",
    severity: "info",
    reason:
      input.phase === "initializing"
        ? "Brain page is waiting for client mount before loading the graph."
        : "Brain graph load is in progress.",
    evidence: [`phase:${input.phase}`],
    nextSafeAction: "Wait briefly; if loading persists, retry graph load.",
    readOnly: true,
  };
}

export function evaluateBrainGraphLoadState(
  input: CodexForgeBrainGraphLoadInput
): CodexForgeBrainGraphLoadGateResult {
  const nodeCount = input.graph?.nodes.length ?? 0;
  const edgeCount = input.graph?.edges.length ?? 0;
  const phase = normalizeBrainGraphLoadPhase({
    mounted: input.mounted,
    loaded: input.loaded,
    nodeCount,
    edgeCount,
    error: input.error,
    usingFixture: input.usingFixture,
  });
  const gate = buildBrainGraphLoadGate({
    phase,
    nodeCount,
    edgeCount,
    error: input.error,
  });

  return {
    phase,
    status: gate.status,
    gate,
    graph: input.graph ?? null,
    loaded: input.loaded === true,
    mounted: input.mounted === true,
    nodeCount,
    edgeCount,
    ...(errorMessage(input.error) ? { errorMessage: errorMessage(input.error) } : {}),
  };
}

export function summarizeBrainGraphLoadState(
  result: CodexForgeBrainGraphLoadGateResult,
  generatedAt = 0
): CodexForgeBrainQualitySummary {
  return {
    generatedAt,
    readOnly: true,
    loadPhase: result.phase,
    graphStatus: result.status,
    snapshotStatus: "partial",
    panelStatus: "partial",
    sourceStatus: result.phase === "fixture" ? "fixture" : result.phase,
    gates: [result.gate],
    nextSafeAction: result.gate.nextSafeAction,
  };
}
