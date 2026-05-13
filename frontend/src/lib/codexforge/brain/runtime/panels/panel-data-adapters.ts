import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataPayload,
  CodexForgeBrainPanelDataSeverity,
  CodexForgeBrainPanelDataSignal,
  CodexForgeBrainPanelId,
  CodexForgeBrainPanelIntegrationInput,
} from "./panel-data-types";
import { CODEXFORGE_BRAIN_PANEL_IDS } from "./panel-data-types";
import {
  buildBrainPanelDataSignal,
  classifyBrainPanelDataSource,
  mergePanelLiveAndFixtureSignals,
  sortBrainPanelDataSignals,
  summarizeBrainPanelDataSource,
} from "./panel-data-sources";
import type { CodexForgeBrainRuntimeSnapshot } from "../snapshot";

type AdapterBuildOptions = {
  panelId: CodexForgeBrainPanelId;
  liveSignals: readonly CodexForgeBrainPanelDataSignal[];
  liveData?: CodexForgeBrainPanelDataPayload;
  requiredLiveCount?: number;
  stale?: boolean;
  nextSafeAction?: string;
  evidence?: readonly string[];
};

function severityFromRuntime(value?: string): CodexForgeBrainPanelDataSeverity {
  if (value === "critical") return "critical";
  if (value === "high" || value === "error" || value === "blocked") return "high";
  if (value === "medium" || value === "degraded" || value === "partial") return "medium";
  if (value === "low") return "low";
  return "info";
}

function sourceTime(input: CodexForgeBrainPanelIntegrationInput): number {
  return input.now ?? input.snapshot?.generatedAt ?? input.fixtureSnapshot?.generatedAt ?? 0;
}

function liveGraphAvailable(
  snapshot: CodexForgeBrainRuntimeSnapshot | null | undefined
): snapshot is CodexForgeBrainRuntimeSnapshot {
  return Boolean(snapshot && snapshot.stats.nodeCount > 0);
}

function buildResult(
  input: CodexForgeBrainPanelIntegrationInput,
  options: AdapterBuildOptions
): CodexForgeBrainPanelDataAdapterResult {
  const fixture = input.fixtureAdapters?.[options.panelId];
  const requiredLiveCount = Math.max(1, options.requiredLiveCount ?? 1);
  const useFixtureSignals =
    options.liveSignals.length < requiredLiveCount ? fixture?.signals ?? [] : [];
  const classification = classifyBrainPanelDataSource({
    liveCount: options.liveSignals.length,
    fixtureCount: useFixtureSignals.length,
    requiredLiveCount,
    stale: options.stale,
  });
  const signals =
    classification.source === "mixed"
      ? mergePanelLiveAndFixtureSignals({
          liveSignals: options.liveSignals,
          fixtureSignals: useFixtureSignals,
        })
      : classification.source === "fixture"
        ? sortBrainPanelDataSignals(useFixtureSignals)
        : sortBrainPanelDataSignals(options.liveSignals);
  const fixtureEvidence =
    classification.source === "mixed" || classification.source === "fixture"
      ? fixture?.evidence ?? []
      : [];
  const evidence = [
    ...(options.evidence ?? []),
    ...fixtureEvidence,
    ...signals.flatMap((signal) => signal.evidence),
  ]
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));
  const data =
    classification.source === "fixture" ? fixture?.data : options.liveData ?? fixture?.data;
  const generatedAt = sourceTime(input) || fixture?.generatedAt || 0;

  return {
    panelId: options.panelId,
    source: classification.source,
    status: classification.status,
    generatedAt,
    readOnly: true,
    signals,
    counts: {
      live: options.liveSignals.length,
      fixture: useFixtureSignals.length,
      total: signals.length,
      nodes: input.snapshot?.stats.nodeCount ?? input.fixtureSnapshot?.stats.nodeCount,
      edges: input.snapshot?.stats.edgeCount ?? input.fixtureSnapshot?.stats.edgeCount,
      events: input.snapshot?.events.length ?? input.fixtureSnapshot?.events.length,
    },
    evidence,
    reason: summarizeBrainPanelDataSource({
      panelId: options.panelId,
      source: classification.source,
      status: classification.status,
      liveCount: options.liveSignals.length,
      fixtureCount: useFixtureSignals.length,
    }),
    nextSafeAction:
      classification.source === "fixture"
        ? fixture?.nextSafeAction ?? "Inspect the fixture fallback before relying on it."
        : options.nextSafeAction ?? "Inspect live panel evidence before taking the next step.",
    data,
  };
}

function unavailableResult(
  input: CodexForgeBrainPanelIntegrationInput,
  panelId: CodexForgeBrainPanelId
): CodexForgeBrainPanelDataAdapterResult {
  return buildResult(input, {
    panelId,
    liveSignals: [],
    requiredLiveCount: 1,
    nextSafeAction: "Supply a runtime snapshot or deterministic fixture data.",
  });
}

export function adaptBrainMemoryPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals = liveGraphAvailable(snapshot)
    ? snapshot.memoryClusters.slice(0, 8).map((cluster) =>
        buildBrainPanelDataSignal({
          id: `memory:${cluster.id}`,
          panelId: "memory",
          label: cluster.label,
          detail: `${cluster.summary.itemCount} memory signals with ${cluster.summary.sourceCount} sources.`,
          source: "live",
          severity: cluster.summary.itemCount > 3 ? "medium" : "info",
          score: Math.min(1, cluster.summary.itemCount / 6),
          timestamp: snapshot.generatedAt,
          reason: cluster.summary.nextAction,
          evidence: [
            `cluster:${cluster.id}`,
            `items:${cluster.summary.itemCount}`,
          ],
          nextSafeAction: cluster.summary.nextAction,
          refs: { nodeIds: cluster.itemIds },
        })
      )
    : [];

  return buildResult(input, {
    panelId: "memory",
    liveSignals,
    liveData: {
      graph: snapshot?.graph,
      context: snapshot?.context,
      memoryClusters: snapshot?.memoryClusters,
    },
    evidence: snapshot ? [`ranked-memory:${snapshot.memory.length}`] : [],
    nextSafeAction: "Review the top memory clusters before routing context.",
  });
}

export function adaptBrainRiskPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals = liveGraphAvailable(snapshot)
    ? (
        snapshot.risks.length > 0
          ? snapshot.risks.slice(0, 8).map((risk) =>
              buildBrainPanelDataSignal({
                id: `risk:${risk.id}`,
                panelId: "risk",
                label: risk.label,
                detail: risk.mitigation,
                source: "live",
                severity: severityFromRuntime(risk.severity),
                score: risk.score,
                timestamp: risk.timestamp,
                reason: risk.reasons.join(", ") || risk.label,
                evidence: risk.reasons,
                nextSafeAction: risk.nextSafeAction,
                refs: { sourceIds: [risk.id] },
              })
            )
          : [
              buildBrainPanelDataSignal({
                id: "risk:clear",
                panelId: "risk",
                label: "No prioritized runtime risks",
                detail: "The supplied snapshot did not produce a high-priority risk signal.",
                source: "live",
                severity: "info",
                score: 0.2,
                timestamp: snapshot.generatedAt,
                reason: "Risk prioritizer returned an empty list.",
                evidence: [`graph-nodes:${snapshot.stats.nodeCount}`],
                nextSafeAction: "Keep reviewing stale, blocked, and error nodes before edits.",
              }),
            ]
      )
    : [];

  return buildResult(input, {
    panelId: "risk",
    liveSignals,
    liveData: { graph: snapshot?.graph, risks: snapshot?.risks },
    evidence: snapshot ? [`risk-count:${snapshot.risks.length}`] : [],
    nextSafeAction: "Inspect the top risk evidence before selecting work.",
  });
}

export function adaptBrainPredictionPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals = liveGraphAvailable(snapshot)
    ? snapshot.predictiveContext.signals.slice(0, 10).map((signal) =>
        buildBrainPanelDataSignal({
          id: `prediction:${signal.id}`,
          panelId: "prediction",
          label: signal.label,
          detail: signal.reasons.join(", ") || signal.kind,
          source: "live",
          severity: severityFromRuntime(signal.kind === "risk" ? "high" : undefined),
          score: signal.score,
          timestamp: signal.timestamp,
          reason: signal.source,
          evidence: signal.reasons,
          nextSafeAction: "Use this as context only; inspect the referenced graph node or file.",
          refs: {
            nodeIds: signal.ref?.nodeId ? [signal.ref.nodeId] : [],
            eventIds: signal.ref?.eventId ? [signal.ref.eventId] : [],
            filePaths: signal.ref?.path ? [signal.ref.path] : [],
          },
        })
      )
    : [];

  return buildResult(input, {
    panelId: "prediction",
    liveSignals,
    liveData: { predictiveContext: snapshot?.predictiveContext },
    requiredLiveCount: 2,
    evidence: snapshot
      ? [`prediction-confidence:${snapshot.predictiveContext.contextConfidence.toFixed(2)}`]
      : [],
    nextSafeAction: "Inspect predicted context references before using them.",
  });
}

export function adaptBrainAgentPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && snapshot.agents.profiles.length > 0
      ? snapshot.agents.profiles.slice(0, 8).map((profile) =>
          buildBrainPanelDataSignal({
            id: `agent:${profile.role}`,
            panelId: "agents",
            label: profile.label,
            detail: profile.safeBoundaries[0] ?? profile.permission,
            source: "live",
            severity: profile.permission === "blocked" ? "high" : "info",
            score: profile.permission === "read-only" ? 0.86 : 0.55,
            timestamp: snapshot.generatedAt,
            reason: profile.reasons[0] ?? profile.role,
            evidence: profile.capabilities.map((capability) => `capability:${capability}`),
            nextSafeAction: "Review agent boundary details without starting execution.",
            refs: { sourceIds: [profile.role] },
          })
        )
      : [];

  return buildResult(input, {
    panelId: "agents",
    liveSignals,
    liveData: { agents: snapshot?.agents },
    requiredLiveCount: 2,
    evidence: snapshot ? [`agent-profiles:${snapshot.agents.profiles.length}`] : [],
    nextSafeAction: "Use agent lanes as read-only planning context.",
  });
}

export function adaptBrainReplayPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && snapshot.replay.frames.length > 0
      ? snapshot.replay.frames.slice(0, 8).map((frame) =>
          buildBrainPanelDataSignal({
            id: `replay:${frame.id}`,
            panelId: "replay",
            label: frame.label,
            detail: frame.summary,
            source: "live",
            severity: "info",
            score: Math.min(1, (frame.index + 1) / Math.max(1, snapshot.replay.frames.length)),
            timestamp: frame.timestamp,
            reason: frame.activeLaneId,
            evidence: [`items:${frame.itemIds.length}`],
            nextSafeAction: "Inspect replay frames before interpreting execution flow.",
            refs: {
              nodeIds: frame.highlightedNodeIds,
              edgeIds: frame.highlightedEdgeIds,
            },
          })
        )
      : [];

  return buildResult(input, {
    panelId: "replay",
    liveSignals,
    liveData: {
      replay: snapshot
        ? { lanes: snapshot.replay.lanes, frames: snapshot.replay.frames }
        : undefined,
    },
    evidence: snapshot ? [`replay-frames:${snapshot.replay.frames.length}`] : [],
    nextSafeAction: "Review frame highlights before drawing conclusions.",
  });
}

export function adaptBrainLineagePanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && snapshot.lineage.nodes.length > 0
      ? snapshot.lineage.nodes.slice(0, 8).map((node) =>
          buildBrainPanelDataSignal({
            id: `lineage:${node.id}`,
            panelId: "lineage",
            label: node.label,
            detail: node.summary,
            source: "live",
            severity: severityFromRuntime(node.severity),
            score: node.severity === "critical" ? 1 : node.severity === "high" ? 0.78 : 0.5,
            timestamp: node.timestamp ?? snapshot.generatedAt,
            reason: node.kind,
            evidence: [`source:${node.source}`],
            nextSafeAction: "Inspect lineage handoffs before using them as context.",
            refs: { nodeIds: node.graphNodeId ? [node.graphNodeId] : [] },
          })
        )
      : [];

  return buildResult(input, {
    panelId: "lineage",
    liveSignals,
    liveData: { lineage: snapshot?.lineage },
    evidence: snapshot
      ? [`lineage-nodes:${snapshot.lineage.nodes.length}`, `lineage-edges:${snapshot.lineage.edges.length}`]
      : [],
    nextSafeAction: "Trace the selected lineage path before acting.",
  });
}

export function adaptBrainTopologyPanelData(
  input: CodexForgeBrainPanelIntegrationInput,
  panelId: "knowledge-topology" | "semantic-heatmap" = "knowledge-topology"
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && panelId === "knowledge-topology"
      ? snapshot.topology.clusters.slice(0, 8).map((cluster) =>
          buildBrainPanelDataSignal({
            id: `topology:${cluster.id}`,
            panelId,
            label: cluster.label,
            detail: cluster.nextSafeAction,
            source: "live",
            severity: severityFromRuntime(cluster.risk > 0.75 ? "high" : undefined),
            score: cluster.weight,
            timestamp: snapshot.topology.generatedAt,
            reason: cluster.reasons.join(", ") || cluster.kind,
            evidence: cluster.supportingSignals,
            nextSafeAction: cluster.nextSafeAction,
            refs: {
              nodeIds: cluster.nodeIds,
              eventIds: cluster.eventIds,
              filePaths: cluster.filePaths,
            },
          })
        )
      : snapshot
        ? snapshot.semanticHeatmap.layers
            .flatMap((layer) => layer.cells)
            .slice(0, 8)
            .map((cell) =>
              buildBrainPanelDataSignal({
                id: `heatmap:${cell.id}`,
                panelId,
                label: cell.label,
                detail: cell.supportingSignals.join(", ") || cell.kind,
                source: "live",
                severity: severityFromRuntime(cell.risk > 0.75 ? "high" : undefined),
                score: cell.intensity,
                timestamp: snapshot.semanticHeatmap.generatedAt,
                reason: cell.reasons.join(", ") || cell.kind,
                evidence: cell.supportingSignals,
                nextSafeAction: "Inspect the heatmap cell before using it as priority evidence.",
                refs: cell.refs,
              })
            )
        : [];

  return buildResult(input, {
    panelId,
    liveSignals,
    liveData:
      panelId === "knowledge-topology"
        ? { topology: snapshot?.topology }
        : { semanticHeatmap: snapshot?.semanticHeatmap },
    requiredLiveCount: panelId === "knowledge-topology" ? 2 : 3,
    evidence: snapshot
      ? [
          `topology-clusters:${snapshot.topology.clusters.length}`,
          `heatmap-layers:${snapshot.semanticHeatmap.layers.length}`,
        ]
      : [],
    nextSafeAction: "Review topology evidence before prioritizing a hotspot.",
  });
}

export function adaptBrainRecommendationPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && snapshot.recommendations.length > 0
      ? snapshot.recommendations.slice(0, 8).map((recommendation) =>
          buildBrainPanelDataSignal({
            id: `recommendation:${recommendation.id}`,
            panelId: "recommendations",
            label: recommendation.title,
            detail: recommendation.summary,
            source: "live",
            severity: severityFromRuntime(recommendation.severity),
            score: recommendation.score,
            timestamp: recommendation.updatedAt,
            reason: recommendation.reasons.join(", ") || recommendation.kind,
            evidence: recommendation.evidence.map((item) => item.label),
            nextSafeAction: recommendation.nextSafeAction.description,
            refs: {
              nodeIds: recommendation.relatedNodeIds,
              filePaths: recommendation.relatedFilePaths,
            },
          })
        )
      : [];

  return buildResult(input, {
    panelId: "recommendations",
    liveSignals,
    liveData: { recommendations: snapshot?.recommendations },
    requiredLiveCount: 2,
    evidence: snapshot ? [`recommendations:${snapshot.recommendations.length}`] : [],
    nextSafeAction: "Treat recommendations as advisory and inspect evidence first.",
  });
}

export function adaptBrainHealthPanelData(
  input: CodexForgeBrainPanelIntegrationInput,
  panelId: "runtime-health" | "system-status" = "runtime-health"
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const health = snapshot?.health;
  const sourceSignals =
    panelId === "runtime-health"
      ? health?.signals ?? []
      : health?.subsystemReadiness ?? [];
  const liveSignals =
    snapshot && health
      ? sourceSignals.slice(0, 8).map((item) =>
          buildBrainPanelDataSignal({
            id: `${panelId}:${item.id}`,
            panelId,
            label: "title" in item ? item.title : item.label,
            detail: "detail" in item ? item.detail : item.reasons.join(", "),
            source: "live",
            severity: severityFromRuntime(item.severity),
            score: "readinessScore" in item ? item.readinessScore : 0.74,
            timestamp: health.generatedAt,
            reason: item.source,
            evidence: item.evidence,
            nextSafeAction:
              "nextSafeAction" in item
                ? item.nextSafeAction.detail
                : "Inspect subsystem readiness evidence.",
            refs: { sourceIds: [item.id] },
          })
        )
      : [];

  return buildResult(input, {
    panelId,
    liveSignals,
    liveData: { health },
    requiredLiveCount: 2,
    evidence: health ? [`health-score:${health.healthScore}`] : [],
    nextSafeAction: "Use health signals to choose the narrowest validation path.",
  });
}

export function adaptBrainFocusPanelData(
  input: CodexForgeBrainPanelIntegrationInput,
  panelId: "focus-mode" | "drilldown" = "focus-mode"
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const focus = snapshot?.focus;
  const liveSignals =
    snapshot && focus
      ? (panelId === "focus-mode" ? focus.lenses : focus.drilldownPaths)
          .slice(0, 8)
          .map((item) =>
            buildBrainPanelDataSignal({
              id: `${panelId}:${item.id}`,
              panelId,
              label: "title" in item ? item.title : item.label,
              detail: "summary" in item ? item.summary : focus.summary.text,
              source: "live",
              severity: severityFromRuntime("severity" in item ? item.severity : undefined),
              score: "relevance" in item ? item.relevance : 0.62,
              timestamp: focus.generatedAt,
              reason: "kind" in item ? item.kind : item.id,
              evidence: "evidence" in item ? item.evidence : item.reasons,
              nextSafeAction: item.nextSafeDrilldown,
              refs: { sourceIds: [item.id] },
            })
          )
      : [];

  return buildResult(input, {
    panelId,
    liveSignals,
    liveData: { focus },
    requiredLiveCount: 1,
    evidence: focus ? [`focus-signals:${focus.signals.length}`] : [],
    nextSafeAction: "Open the focus inspector before navigating deeper.",
  });
}

function adaptGraphPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals = snapshot
    ? [
        buildBrainPanelDataSignal({
          id: "graph:summary",
          panelId: "graph",
          label: "Canonical graph",
          detail: `${snapshot.stats.nodeCount} nodes and ${snapshot.stats.edgeCount} edges.`,
          source: "live",
          severity: snapshot.stats.nodeCount > 0 ? "info" : "low",
          score: snapshot.stats.nodeCount > 0 ? 1 : 0.25,
          timestamp: snapshot.generatedAt,
          reason: "Graph supplied through the runtime snapshot.",
          evidence: [
            `nodes:${snapshot.stats.nodeCount}`,
            `edges:${snapshot.stats.edgeCount}`,
          ],
          nextSafeAction: "Use the preserved graph inspector for node-level review.",
        }),
      ]
    : [];

  return buildResult(input, {
    panelId: "graph",
    liveSignals,
    liveData: { graph: snapshot?.graph },
    nextSafeAction: "Inspect the graph before trusting connected panel evidence.",
  });
}

function adaptInsightQueuePanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals =
    snapshot && snapshot.insightQueue.insights.length > 0
      ? snapshot.insightQueue.insights.slice(0, 8).map((insight) =>
          buildBrainPanelDataSignal({
            id: `insight:${insight.id}`,
            panelId: "insight-queue",
            label: insight.title,
            detail: insight.detail,
            source: "live",
            severity: severityFromRuntime(insight.severity),
            score: insight.score,
            timestamp: insight.timestamp,
            reason: insight.kind,
            evidence: insight.evidence.map((item) => item.label),
            nextSafeAction: insight.action.description,
            refs: {
              nodeIds: insight.relatedNodeIds,
              filePaths: insight.relatedFilePaths,
            },
          })
        )
      : [];

  return buildResult(input, {
    panelId: "insight-queue",
    liveSignals,
    liveData: { insightQueue: snapshot?.insightQueue },
    evidence: snapshot ? [`insights:${snapshot.insightQueue.insights.length}`] : [],
    nextSafeAction: "Review insight evidence before selecting a next action.",
  });
}

function adaptLiveSnapshotPanelData(
  input: CodexForgeBrainPanelIntegrationInput
): CodexForgeBrainPanelDataAdapterResult {
  const snapshot = input.snapshot;
  const liveSignals = snapshot
    ? [
        buildBrainPanelDataSignal({
          id: "live-snapshot:summary",
          panelId: "live-snapshot",
          label: "Live runtime snapshot",
          detail: `${snapshot.stats.nodeCount} graph nodes, ${snapshot.events.length} events, ${snapshot.recommendations.length} recommendations.`,
          source: "live",
          severity: snapshot.status === "empty" ? "low" : "info",
          score: snapshot.status === "empty" ? 0.35 : 1,
          timestamp: snapshot.generatedAt,
          reason: snapshot.status,
          evidence: [
            `snapshot:${snapshot.id}`,
            `status:${snapshot.status}`,
            `readOnly:${String(snapshot.readOnly)}`,
          ],
          nextSafeAction: "Use the snapshot panel to confirm live backing before reading downstream panels.",
        }),
      ]
    : [];

  return buildResult(input, {
    panelId: "live-snapshot",
    liveSignals,
    liveData: {
      graph: snapshot?.graph,
      context: snapshot?.context,
      health: snapshot?.health,
    },
    nextSafeAction: "Confirm the snapshot source before comparing panel data.",
  });
}

export function buildBrainPanelDataAdapters(
  input: CodexForgeBrainPanelIntegrationInput
): Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult> {
  const adapters: Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult> = {
    graph: adaptGraphPanelData(input),
    memory: adaptBrainMemoryPanelData(input),
    risk: adaptBrainRiskPanelData(input),
    prediction: adaptBrainPredictionPanelData(input),
    agents: adaptBrainAgentPanelData(input),
    replay: adaptBrainReplayPanelData(input),
    lineage: adaptBrainLineagePanelData(input),
    "semantic-heatmap": adaptBrainTopologyPanelData(input, "semantic-heatmap"),
    "knowledge-topology": adaptBrainTopologyPanelData(input, "knowledge-topology"),
    recommendations: adaptBrainRecommendationPanelData(input),
    "insight-queue": adaptInsightQueuePanelData(input),
    "runtime-health": adaptBrainHealthPanelData(input, "runtime-health"),
    "system-status": adaptBrainHealthPanelData(input, "system-status"),
    "focus-mode": adaptBrainFocusPanelData(input, "focus-mode"),
    drilldown: adaptBrainFocusPanelData(input, "drilldown"),
    "live-snapshot": adaptLiveSnapshotPanelData(input),
  };

  return Object.fromEntries(
    CODEXFORGE_BRAIN_PANEL_IDS.map((panelId) => [
      panelId,
      adapters[panelId] ?? unavailableResult(input, panelId),
    ])
  ) as Record<CodexForgeBrainPanelId, CodexForgeBrainPanelDataAdapterResult>;
}
