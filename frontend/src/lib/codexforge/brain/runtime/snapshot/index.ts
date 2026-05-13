import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import {
  listCodexForgeAgentRuntimeProfiles,
  type CodexForgeAgentRuntimeProfile,
} from "@/lib/codexforge/agents/runtime";
import { assembleContext, rankMemory } from "../runtime";
import { clusterMemorySignals } from "../memory";
import {
  buildPredictiveContext,
  prioritizeContextRisks,
} from "../context";
import {
  buildBrainRuntimeLineage,
  buildBrainRuntimeReplay,
  summarizeBrainRuntimeReplay,
} from "../replay";
import {
  buildKnowledgeTopology,
  buildSemanticHeatmap,
} from "../topology";
import {
  buildInsightQueue,
  buildRuntimeRecommendations,
  summarizeRuntimeRecommendations,
} from "../recommendations";
import { buildRuntimeHealthDashboard } from "../health";
import { buildBrainFocusModel } from "../focus";
import type {
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import type { CodexForgePredictiveContextResult, CodexForgePrioritizedRisk } from "../context";
import type {
  CodexForgeBrainLineageGraph,
  CodexForgeBrainReplayFrame,
  CodexForgeBrainReplayLane,
  CodexForgeBrainReplaySummary,
} from "../replay";
import type {
  CodexForgeKnowledgeTopology,
  CodexForgeSemanticHeatmap,
} from "../topology";
import type {
  CodexForgeInsightQueue,
  CodexForgeRecommendationSummary,
  CodexForgeRuntimeRecommendation,
} from "../recommendations";
import type { CodexForgeRuntimeHealthDashboard } from "../health";
import type {
  CodexForgeBrainFocusModel,
} from "../focus";
import type {
  CodexForgeBrainRankedMemory,
} from "../runtime-types";
import type { CodexForgeMemoryCluster } from "../memory";

export type CodexForgeBrainRuntimeSnapshotStatus =
  | "ready"
  | "partial"
  | "empty";

export type CodexForgeBrainRuntimeSnapshotStats = {
  nodeCount: number;
  edgeCount: number;
  memoryNodeCount: number;
  taskNodeCount: number;
  riskNodeCount: number;
  runNodeCount: number;
  snapshotNodeCount: number;
  updatedAt: CodexForgeBrainTimestamp;
};

export type CodexForgeBrainRuntimeSnapshot = {
  id: string;
  generatedAt: CodexForgeBrainTimestamp;
  status: CodexForgeBrainRuntimeSnapshotStatus;
  readOnly: true;
  graph: CodexForgeBrainGraph;
  stats: CodexForgeBrainRuntimeSnapshotStats;
  events: readonly CodexForgeBrainRuntimeEvent[];
  context: CodexForgeBrainRuntimeContext;
  memory: readonly CodexForgeBrainRankedMemory[];
  memoryClusters: readonly CodexForgeMemoryCluster[];
  predictiveContext: CodexForgePredictiveContextResult;
  risks: readonly CodexForgePrioritizedRisk[];
  replay: {
    lanes: readonly CodexForgeBrainReplayLane[];
    frames: readonly CodexForgeBrainReplayFrame[];
    summary: CodexForgeBrainReplaySummary;
  };
  lineage: CodexForgeBrainLineageGraph;
  topology: CodexForgeKnowledgeTopology;
  semanticHeatmap: CodexForgeSemanticHeatmap;
  recommendations: readonly CodexForgeRuntimeRecommendation[];
  recommendationSummary: CodexForgeRecommendationSummary;
  insightQueue: CodexForgeInsightQueue;
  health: CodexForgeRuntimeHealthDashboard;
  focus: CodexForgeBrainFocusModel;
  agents: {
    profiles: readonly CodexForgeAgentRuntimeProfile[];
  };
};

export type CodexForgeBrainRuntimeSnapshotInput = {
  graph: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  selectedNodeId?: string | null;
  now?: CodexForgeBrainTimestamp;
};

function labelForNode(node: CodexForgeBrainNode | null | undefined): string | undefined {
  if (!node) return undefined;
  const data = node.data as Record<string, unknown>;
  const label = data.label ?? data.summary ?? data.goal ?? data.content ?? data.text;
  return typeof label === "string" && label.trim() ? label.trim() : node.id;
}

function pathForNode(node: CodexForgeBrainNode | null | undefined): string | undefined {
  if (!node) return undefined;
  const data = node.data as Record<string, unknown>;
  const path = data.filePath ?? data.path ?? data.repoPath;
  return typeof path === "string" && path.trim() ? path.trim() : undefined;
}

function updatedAtForGraph(graph: CodexForgeBrainGraph): CodexForgeBrainTimestamp {
  return Math.max(
    graph.meta.updatedAt ?? 0,
    ...graph.nodes.map((node) => node.meta.updatedAt ?? node.meta.createdAt ?? 0),
    ...graph.edges.map((edge) => edge.meta.updatedAt ?? edge.meta.createdAt ?? 0)
  );
}

function buildSnapshotStats(
  graph: CodexForgeBrainGraph,
  updatedAt: CodexForgeBrainTimestamp
): CodexForgeBrainRuntimeSnapshotStats {
  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    memoryNodeCount: graph.nodes.filter((node) =>
      ["memory", "decision", "note", "concept"].includes(node.kind)
    ).length,
    taskNodeCount: graph.nodes.filter((node) =>
      ["task", "plan", "step"].includes(node.kind)
    ).length,
    riskNodeCount: graph.nodes.filter((node) =>
      node.meta.status === "blocked" || node.meta.status === "error"
    ).length,
    runNodeCount: graph.nodes.filter((node) => node.kind === "run").length,
    snapshotNodeCount: graph.nodes.filter((node) => node.kind === "snapshot").length,
    updatedAt,
  };
}

export function buildCodexForgeBrainRuntimeSnapshot(
  input: CodexForgeBrainRuntimeSnapshotInput
): CodexForgeBrainRuntimeSnapshot {
  const graph = input.graph;
  const generatedAt = input.now ?? updatedAtForGraph(graph);
  const events = [...(input.events ?? [])].sort(
    (left, right) => left.ts - right.ts || left.id.localeCompare(right.id)
  );
  const selectedNode =
    input.selectedNodeId
      ? graph.nodes.find((node) => node.id === input.selectedNodeId) ?? null
      : null;
  const focusNodeIds = selectedNode ? [selectedNode.id] : undefined;
  const context = assembleContext({
    graph,
    events,
    focusNodeIds,
    now: generatedAt,
  });
  const memory = rankMemory({
    graph,
    events,
    focusNodeIds,
    now: generatedAt,
  });
  const memoryClusters = clusterMemorySignals({
    nodes: graph.nodes.filter((node) =>
      ["memory", "decision", "note", "concept"].includes(node.kind)
    ),
    events,
    limit: 8,
  });
  const predictiveContext = buildPredictiveContext({
    graph,
    events,
    memoryRankings: memory,
    activeFocus: selectedNode
      ? {
          text: labelForNode(selectedNode),
          filePath: pathForNode(selectedNode),
          nodeIds: [selectedNode.id],
          taskId: selectedNode.kind === "task" ? selectedNode.id : undefined,
        }
      : undefined,
    now: generatedAt,
  });
  const risks = prioritizeContextRisks({
    graph,
    events,
    filePaths: graph.nodes
      .map((node) => pathForNode(node))
      .filter((path): path is string => Boolean(path)),
    now: generatedAt,
  });
  const replayRuntime = buildBrainRuntimeReplay({
    graph,
    events,
    now: generatedAt,
  });
  const lineage = buildBrainRuntimeLineage({
    graph,
    events,
    now: generatedAt,
  });
  const topology = buildKnowledgeTopology({
    graph,
    events,
    rankedMemory: memory,
    predictiveContext,
    prioritizedRisks: risks,
    replayFrames: replayRuntime.frames,
    lineage,
    now: generatedAt,
  });
  const semanticHeatmap = buildSemanticHeatmap({
    graph,
    events,
    rankedMemory: memory,
    predictiveContext,
    prioritizedRisks: risks,
    replayFrames: replayRuntime.frames,
    lineage,
    now: generatedAt,
  });
  const recommendations = buildRuntimeRecommendations({
    graph,
    events,
    predictiveContext,
    semanticTopology: topology,
    now: generatedAt,
    limit: 12,
  });
  const recommendationSummary = summarizeRuntimeRecommendations(
    recommendations,
    generatedAt
  );
  const insightQueue = buildInsightQueue({
    recommendations,
    generatedAt,
  });
  const replaySummary = summarizeBrainRuntimeReplay(replayRuntime);
  const health = buildRuntimeHealthDashboard({
    generatedAt,
    recommendationSummary,
    recommendations,
    insightQueue,
    topologySummary: topology.summary,
    replaySummary,
    memoryReadiness: {
      status: memoryClusters.length > 0 ? "ready" : "partial",
      score: Math.min(1, memoryClusters.length / 4),
      clusters: memoryClusters.map((cluster) => cluster.summary),
      evidence: [`memory-clusters:${memoryClusters.length}`],
    },
    contextReadiness: {
      status: predictiveContext.signals.length > 0 ? "ready" : "partial",
      score: predictiveContext.contextConfidence,
      predictiveContext,
      evidence: [`context-signals:${predictiveContext.signals.length}`],
    },
  });
  const focus = buildBrainFocusModel({
    graph,
    selectedNodeId: input.selectedNodeId,
    events,
    predictiveContext,
    prioritizedRisks: risks,
    replayFrames: replayRuntime.frames,
    replayLineage: lineage,
    semanticTopology: topology,
    recommendations,
    insightQueue,
    runtimeHealth: health,
    now: generatedAt,
  });
  const stats = buildSnapshotStats(graph, generatedAt);

  return {
    id: `runtime-snapshot:${generatedAt}:${stats.nodeCount}:${stats.edgeCount}`,
    generatedAt,
    status: stats.nodeCount > 0 ? "ready" : "empty",
    readOnly: true,
    graph,
    stats,
    events,
    context,
    memory,
    memoryClusters,
    predictiveContext,
    risks,
    replay: {
      ...replayRuntime,
      summary: replaySummary,
    },
    lineage,
    topology,
    semanticHeatmap,
    recommendations,
    recommendationSummary,
    insightQueue,
    health,
    focus,
    agents: {
      profiles: listCodexForgeAgentRuntimeProfiles(),
    },
  };
}
