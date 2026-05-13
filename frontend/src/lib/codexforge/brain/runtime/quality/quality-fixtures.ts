import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import { CODEXFORGE_BRAIN_GRAPH_VERSION } from "@/lib/codexforge/brain/graph/types";
import {
  buildBrainPanelIntegrationFixtureAdapters,
  buildBrainPanelIntegrationReadinessMap,
} from "@/lib/codexforge/brain/runtime/panels";
import { buildCodexForgeBrainRuntimeSnapshot } from "@/lib/codexforge/brain/runtime/snapshot";
import { evaluateBrainEmptyState } from "./empty-state-gates";
import { evaluateBrainGraphLoadState } from "./graph-load-gates";
import { evaluateBrainSnapshotPanelGates } from "./snapshot-panel-gates";
import type {
  CodexForgeBrainGraphLoadGateResult,
  CodexForgeBrainQualitySummary,
} from "./quality-types";

export const CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS = 1767225600000;

export function buildBrainQualityFixtureGraph(): CodexForgeBrainGraph {
  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [
      {
        id: "quality-fixture:workspace",
        kind: "workspace",
        data: {
          label: "Quality gate workspace",
          summary: "Fixture graph for brain loading recovery quality gates.",
        },
        meta: {
          createdAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          updatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          status: "active",
          importance: "high",
        },
      },
      {
        id: "quality-fixture:memory",
        kind: "memory",
        data: {
          label: "Recovery action memory",
          memoryType: "decision",
          content: "Empty graph is a valid loaded state and must not render as loading.",
        },
        meta: {
          createdAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          updatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          status: "active",
          importance: "critical",
        },
      },
    ],
    edges: [
      {
        id: "quality-fixture:edge",
        kind: "relates_to",
        from: "quality-fixture:workspace",
        to: "quality-fixture:memory",
        meta: {
          createdAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          updatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
          status: "active",
          importance: "medium",
        },
      },
    ],
    meta: {
      createdAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
      updatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
      workspaceId: "brain-quality-fixture",
      projectId: "codexforge-foundation",
    },
  };
}

export function buildBrainQualityFixtureSnapshot() {
  return buildCodexForgeBrainRuntimeSnapshot({
    graph: buildBrainQualityFixtureGraph(),
    selectedNodeId: "quality-fixture:memory",
    now: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
  });
}

export function buildBrainQualityFixturePanelReadiness() {
  const adapters = buildBrainPanelIntegrationFixtureAdapters();
  const readiness = buildBrainPanelIntegrationReadinessMap(adapters);

  return {
    ...readiness,
    agents: {
      ...readiness.agents,
      source: "unavailable" as const,
      status: "unavailable" as const,
      summary: "Blocked panel fixture for quality gates.",
      evidence: ["blocked panel state"],
      nextSafeAction: "Inspect blocked panel readiness.",
    },
    "knowledge-topology": {
      ...readiness["knowledge-topology"],
      source: "mixed" as const,
      status: "partial" as const,
      summary: "Mixed panel fixture for quality gates.",
      evidence: ["mixed panel state"],
      nextSafeAction: "Treat mixed panel evidence as advisory.",
    },
  };
}

export function buildBrainQualityFixtureLoadStates(): Record<
  "loading" | "loadedEmpty" | "loadedLive" | "recoverableStorageError" | "fixtureFallback",
  CodexForgeBrainGraphLoadGateResult
> {
  const emptyGraph: CodexForgeBrainGraph = {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [],
    edges: [],
    meta: {
      createdAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
      updatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
    },
  };
  const liveGraph = buildBrainQualityFixtureGraph();

  return {
    loading: evaluateBrainGraphLoadState({ mounted: true, loaded: false, graph: null }),
    loadedEmpty: evaluateBrainGraphLoadState({ mounted: true, loaded: true, graph: emptyGraph }),
    loadedLive: evaluateBrainGraphLoadState({ mounted: true, loaded: true, graph: liveGraph }),
    recoverableStorageError: evaluateBrainGraphLoadState({
      mounted: true,
      loaded: true,
      graph: null,
      error: "localStorage parse error",
    }),
    fixtureFallback: evaluateBrainGraphLoadState({
      mounted: true,
      loaded: true,
      graph: liveGraph,
      usingFixture: true,
    }),
  };
}

export function buildBrainQualityFixtureSummary(): CodexForgeBrainQualitySummary {
  const loadStates = buildBrainQualityFixtureLoadStates();
  const panelGates = evaluateBrainSnapshotPanelGates({
    snapshot: buildBrainQualityFixtureSnapshot(),
    panelReadiness: buildBrainQualityFixturePanelReadiness(),
    now: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
  });
  const emptyState = evaluateBrainEmptyState({
    graph: loadStates.loadedEmpty.graph,
    includeResetAction: true,
  });

  return {
    generatedAt: CODEXFORGE_BRAIN_QUALITY_FIXTURE_TS,
    readOnly: true,
    loadPhase: loadStates.loadedLive.phase,
    graphStatus: loadStates.loadedLive.status,
    snapshotStatus: panelGates.snapshotStatus,
    panelStatus: panelGates.panelStatus,
    sourceStatus: "loading, loaded-empty, loaded-live, fixture fallback, recoverable error, blocked panel, mixed panel",
    gates: [
      loadStates.loading.gate,
      loadStates.loadedEmpty.gate,
      loadStates.loadedLive.gate,
      loadStates.recoverableStorageError.gate,
      loadStates.fixtureFallback.gate,
      panelGates.snapshotGate,
      panelGates.panelGate,
      emptyState.gate,
      ...emptyState.actions,
    ],
    nextSafeAction: "Refresh graph, open workspace, or keep fixture fallback.",
  };
}
