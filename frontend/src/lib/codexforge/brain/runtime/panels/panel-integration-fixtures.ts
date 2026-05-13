import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import { CODEXFORGE_BRAIN_GRAPH_VERSION } from "@/lib/codexforge/brain/graph/types";
import { buildCodexForgeBrainRuntimeSnapshot } from "../snapshot";
import type { CodexForgeBrainRuntimeSnapshot } from "../snapshot";
import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataReadiness,
  CodexForgeBrainPanelDataSignal,
  CodexForgeBrainPanelDataSource,
  CodexForgeBrainPanelDataStatus,
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelIntegrationSummary,
} from "./panel-data-types";
import { CODEXFORGE_BRAIN_PANEL_IDS } from "./panel-data-types";
import { buildBrainPanelDataSignal } from "./panel-data-sources";
import {
  buildBrainPanelIntegrationReadinessMap,
  summarizeBrainPanelIntegrationReadiness,
} from "./panel-readiness-map";

export const CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS = 1767225600000;

function fixtureNode(
  id: string,
  kind: CodexForgeBrainNode["kind"],
  data: Record<string, unknown>,
  importance: "low" | "medium" | "high" | "critical" = "medium"
): CodexForgeBrainNode {
  return {
    id,
    kind,
    data: data as CodexForgeBrainNode["data"],
    meta: {
      createdAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
      updatedAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
      status: "active",
      importance,
      pinned: importance === "critical" || importance === "high",
      archived: false,
      sourceRefs: [{ type: "derived", id: `panel-fixture:${id}` }],
      version: 1,
    },
  };
}

function fixtureSignal(
  panelId: CodexForgeBrainPanelId,
  source: CodexForgeBrainPanelDataSource,
  status: CodexForgeBrainPanelDataStatus,
  label: string,
  detail: string
): CodexForgeBrainPanelDataSignal {
  return buildBrainPanelDataSignal({
    id: `${panelId}:${source}:${status}`,
    panelId,
    label,
    detail,
    source,
    status,
    severity: status === "stale" ? "medium" : source === "unavailable" ? "high" : "info",
    score: source === "live" ? 0.9 : source === "mixed" ? 0.68 : source === "fixture" ? 0.46 : 0,
    timestamp: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
    reason: `${panelId} ${source} ${status}`,
    evidence: [
      `fixture-ts:${CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS}`,
      `source:${source}`,
      `status:${status}`,
    ],
    nextSafeAction: "Read this panel as advisory evidence only.",
  });
}

function fixtureResult(args: {
  panelId: CodexForgeBrainPanelId;
  source: CodexForgeBrainPanelDataSource;
  status: CodexForgeBrainPanelDataStatus;
  signals?: readonly CodexForgeBrainPanelDataSignal[];
  reason: string;
  nextSafeAction?: string;
  liveCount?: number;
  fixtureCount?: number;
  snapshot?: CodexForgeBrainRuntimeSnapshot;
}): CodexForgeBrainPanelDataAdapterResult {
  const signals = args.signals ?? [
    fixtureSignal(args.panelId, args.source, args.status, args.reason, args.reason),
  ];

  return {
    panelId: args.panelId,
    source: args.source,
    status: args.status,
    generatedAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
    readOnly: true,
    signals,
    counts: {
      live: args.liveCount ?? (args.source === "live" || args.source === "mixed" ? 1 : 0),
      fixture: args.fixtureCount ?? (args.source === "fixture" || args.source === "mixed" ? 1 : 0),
      total: signals.length,
      nodes: args.snapshot?.stats.nodeCount,
      edges: args.snapshot?.stats.edgeCount,
      events: args.snapshot?.events.length,
    },
    evidence: signals.flatMap((signal) => signal.evidence),
    reason: args.reason,
    nextSafeAction:
      args.nextSafeAction ?? "Use fixture data only as deterministic fallback context.",
    data: args.snapshot
      ? {
          graph: args.snapshot.graph,
          context: args.snapshot.context,
          memoryClusters: args.snapshot.memoryClusters,
          predictiveContext: args.snapshot.predictiveContext,
          risks: args.snapshot.risks,
          topology: args.snapshot.topology,
          semanticHeatmap: args.snapshot.semanticHeatmap,
          recommendations: args.snapshot.recommendations,
          insightQueue: args.snapshot.insightQueue,
          health: args.snapshot.health,
          focus: args.snapshot.focus,
        }
      : undefined,
  };
}

export function buildBrainPanelIntegrationFixtureSnapshot(): CodexForgeBrainRuntimeSnapshot {
  const graph: CodexForgeBrainGraph = {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [
      fixtureNode(
        "panel-fixture:memory:runtime-boundary",
        "memory",
        {
          label: "Runtime boundary memory",
          memoryType: "decision",
          content: "Panel data must remain read-only and live-backed when snapshot evidence exists.",
          summary: "Live graph-backed memory fixture for panel readiness.",
          tags: ["runtime", "panel", "read-only"],
        },
        "high"
      ),
      fixtureNode(
        "panel-fixture:task:topology",
        "task",
        {
          label: "Topology integration pass",
          goal: "Connect panel source labels to supplied runtime snapshot evidence.",
          nextAction: "Inspect topology fallbacks before replacing fixture-only panels.",
          tags: ["topology", "integration"],
        },
        "medium"
      ),
      fixtureNode(
        "panel-fixture:risk:prediction-stale",
        "decision",
        {
          label: "Prediction staleness boundary",
          summary: "Prediction data can be stale when live focus evidence is missing.",
          rationale: "Deterministic fallback must clearly disclose stale source status.",
          nextAction: "Refresh runtime snapshot input before trusting prediction order.",
          tags: ["prediction", "stale"],
        },
        "medium"
      ),
      fixtureNode(
        "panel-fixture:snapshot:ready",
        "snapshot",
        {
          label: "Ready runtime snapshot",
          fileCount: 6,
          sampledPaths: [
            "src/lib/codexforge/brain/runtime/panels/panel-data-types.ts",
            "src/lib/codexforge/brain/runtime/panels/panel-data-adapters.ts",
          ],
          summary: "Ready live-snapshot panel fixture.",
        },
        "high"
      ),
    ],
    edges: [
      {
        id: "panel-fixture:edge:memory-task",
        kind: "relates_to",
        from: "panel-fixture:memory:runtime-boundary",
        to: "panel-fixture:task:topology",
        label: "supports",
        weight: 0.72,
        meta: {
          createdAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
          updatedAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
          status: "active",
          importance: "medium",
          archived: false,
          version: 1,
        },
      },
      {
        id: "panel-fixture:edge:task-snapshot",
        kind: "references",
        from: "panel-fixture:task:topology",
        to: "panel-fixture:snapshot:ready",
        label: "reads",
        weight: 0.64,
        meta: {
          createdAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
          updatedAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
          status: "active",
          importance: "medium",
          archived: false,
          version: 1,
        },
      },
    ],
    meta: {
      createdAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
      updatedAt: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
      workspaceId: "codexforge-panel-integration-fixture",
      projectId: "codexforge-foundation",
      repoPath: "codexforge/frontend",
    },
  };

  return buildCodexForgeBrainRuntimeSnapshot({
    graph,
    selectedNodeId: "panel-fixture:memory:runtime-boundary",
    now: CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS,
  });
}

export function buildBrainPanelIntegrationFixtureAdapters(): Record<
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelDataAdapterResult
> {
  const snapshot = buildBrainPanelIntegrationFixtureSnapshot();
  const base = Object.fromEntries(
    CODEXFORGE_BRAIN_PANEL_IDS.map((panelId) => [
      panelId,
      fixtureResult({
        panelId,
        source: "fixture",
        status: "ready",
        reason: `${panelId} deterministic fixture fallback`,
        snapshot,
      }),
    ])
  ) as Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>;

  return {
    ...base,
    memory: fixtureResult({
      panelId: "memory",
      source: "live",
      status: "ready",
      reason: "Memory panel is graph-backed by the supplied fixture snapshot.",
      nextSafeAction: "Review graph-backed memory clusters before relying on recommendations.",
      liveCount: snapshot.memoryClusters.length,
      fixtureCount: 0,
      snapshot,
    }),
    "knowledge-topology": fixtureResult({
      panelId: "knowledge-topology",
      source: "mixed",
      status: "partial",
      reason: "Topology panel has live graph clusters plus deterministic fallback labels.",
      nextSafeAction: "Replace remaining topology fallback labels with supplied snapshot evidence.",
      liveCount: Math.max(1, snapshot.topology.clusters.length),
      fixtureCount: 1,
      snapshot,
    }),
    recommendations: fixtureResult({
      panelId: "recommendations",
      source: "fixture",
      status: "ready",
      reason: "Recommendations remain fixture-backed until enough live advisory evidence exists.",
      nextSafeAction: "Inspect live risks and topology before trusting recommendation rank.",
      liveCount: 0,
      fixtureCount: 1,
      snapshot,
    }),
    prediction: fixtureResult({
      panelId: "prediction",
      source: "fixture",
      status: "stale",
      reason: "Prediction panel fixture is stale without current focus evidence.",
      nextSafeAction: "Supply selected focus and runtime snapshot evidence.",
      liveCount: 0,
      fixtureCount: 1,
      snapshot,
    }),
    agents: fixtureResult({
      panelId: "agents",
      source: "unavailable",
      status: "unavailable",
      signals: [],
      reason: "Agent activity has no supplied runtime activity evidence in this fixture.",
      nextSafeAction: "Provide agent runtime activity through the snapshot boundary.",
      liveCount: 0,
      fixtureCount: 0,
      snapshot,
    }),
    "live-snapshot": fixtureResult({
      panelId: "live-snapshot",
      source: "live",
      status: "ready",
      reason: "Live-snapshot panel has a ready read-only fixture snapshot.",
      nextSafeAction: "Use this panel to verify panel data source labels.",
      liveCount: 1,
      fixtureCount: 0,
      snapshot,
    }),
  };
}

export function buildBrainPanelIntegrationFixtureReadiness(): Record<
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelDataReadiness
> {
  return buildBrainPanelIntegrationReadinessMap(
    buildBrainPanelIntegrationFixtureAdapters()
  );
}

export function buildBrainPanelIntegrationFixtureSummary(): CodexForgeBrainPanelIntegrationSummary {
  return summarizeBrainPanelIntegrationReadiness(
    buildBrainPanelIntegrationFixtureReadiness(),
    CODEXFORGE_BRAIN_PANEL_INTEGRATION_FIXTURE_TS
  );
}
