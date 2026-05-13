import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainFocusBuildInput,
  CodexForgeBrainFocusLens,
  CodexForgeBrainFocusModel,
  CodexForgeBrainFocusSeverity,
  CodexForgeBrainFocusSignal,
  CodexForgeBrainFocusSignalKind,
  CodexForgeBrainFocusSummary,
  CodexForgeBrainFocusTarget,
  CodexForgeBrainFocusTargetKind,
} from "./focus-types";
import { buildBrainDrilldownPaths } from "./drilldown-navigation";
import { buildBrainFocusBreadcrumbs } from "./focus-breadcrumbs";
import {
  CODEXFORGE_BRAIN_FOCUS_SIGNAL_KINDS,
  buildBrainFocusNeighborhood,
} from "./focus-neighborhood";
import { buildBrainFocusFixtureModel } from "./focus-fixtures";

export function buildBrainFocusModel(
  input: CodexForgeBrainFocusBuildInput = {}
): CodexForgeBrainFocusModel {
  if (!input.graph || input.graph.nodes.length === 0) {
    return buildBrainFocusFixtureModel();
  }

  const generatedAt = input.now ?? input.graph.meta.updatedAt;
  const targets = buildTargets(input, generatedAt);
  const focusTarget =
    targets.find((target) => target.nodeId === input.selectedNodeId || target.id === input.selectedNodeId) ??
    targets[0] ??
    buildBrainFocusTarget({
      id: "focus:empty",
      kind: "subsystem",
      label: "Empty focus",
      summary: "No focus data is available.",
      severity: "info",
      relevance: 0,
      updatedAt: generatedAt,
      source: "fixture",
      reasons: ["empty-focus"],
      evidence: ["No graph nodes were available."],
      nextSafeDrilldown: "Inspect the preserved graph view.",
    });
  const signals = buildSignals(input, focusTarget, generatedAt);
  const neighborhood = buildBrainFocusNeighborhood({ focusTarget, signals });
  const drilldownPaths = buildBrainDrilldownPaths({ focusTarget, neighborhood });
  const breadcrumbs = buildBrainFocusBreadcrumbs({ focusTarget, paths: drilldownPaths });
  const lenses = buildFocusLenses(signals);
  const summary = summarizeBrainFocusTarget({
    generatedAt,
    focusTarget,
    targets,
    signals,
    lenses,
    pathCount: drilldownPaths.length,
    nextSafeDrilldown: neighborhood.nextSafeDrilldown,
  });

  return {
    generatedAt,
    focusTarget,
    targets,
    signals,
    neighborhood,
    drilldownPaths,
    breadcrumbs,
    lenses,
    summary,
    readOnly: true,
  };
}

export function buildBrainFocusTarget(input: {
  id: string;
  kind: CodexForgeBrainFocusTargetKind;
  label: string;
  summary: string;
  status?: string;
  severity?: CodexForgeBrainFocusSeverity;
  relevance?: number;
  updatedAt: number;
  source: CodexForgeBrainFocusTarget["source"];
  nodeId?: string;
  filePath?: string;
  sourceRefs?: CodexForgeBrainFocusTarget["sourceRefs"];
  reasons?: readonly string[];
  evidence?: readonly string[];
  readOnly?: boolean;
  approvalRequired?: boolean;
  nextSafeDrilldown?: string;
  graphNode?: CodexForgeBrainNode;
}): CodexForgeBrainFocusTarget {
  return {
    id: input.id,
    kind: input.kind,
    label: input.label,
    summary: input.summary,
    status: input.status ?? "ready",
    severity: input.severity ?? "info",
    relevance: clampFocusScore(input.relevance ?? 0.5),
    updatedAt: input.updatedAt,
    source: input.source,
    nodeId: input.nodeId,
    filePath: input.filePath,
    sourceRefs: [...(input.sourceRefs ?? [])].sort((a, b) => `${a.type}:${a.id}`.localeCompare(`${b.type}:${b.id}`)),
    reasons: [...(input.reasons ?? [])].sort(),
    evidence: [...(input.evidence ?? [])].sort(),
    readOnly: input.readOnly ?? true,
    approvalRequired: input.approvalRequired ?? false,
    nextSafeDrilldown: input.nextSafeDrilldown ?? "Inspect related cognitive signals without executing actions.",
    graphNode: input.graphNode,
  };
}

export function buildBrainFocusSignal(input: {
  id: string;
  kind: CodexForgeBrainFocusSignalKind;
  label: string;
  summary: string;
  severity?: CodexForgeBrainFocusSeverity;
  weight?: number;
  relevance?: number;
  timestamp: number;
  targetId?: string;
  relatedTargetIds?: readonly string[];
  nodeIds?: readonly string[];
  eventIds?: readonly string[];
  filePaths?: readonly string[];
  sourceRefs?: CodexForgeBrainFocusSignal["sourceRefs"];
  reasons?: readonly string[];
  evidence?: readonly string[];
  readOnly?: boolean;
  approvalRequired?: boolean;
  nextSafeDrilldown?: string;
}): CodexForgeBrainFocusSignal {
  return {
    id: input.id,
    kind: input.kind,
    label: input.label,
    summary: input.summary,
    severity: input.severity ?? "info",
    weight: clampFocusScore(input.weight ?? input.relevance ?? 0.5),
    relevance: clampFocusScore(input.relevance ?? input.weight ?? 0.5),
    timestamp: input.timestamp,
    targetId: input.targetId,
    relatedTargetIds: [...(input.relatedTargetIds ?? [])].sort(),
    nodeIds: [...(input.nodeIds ?? [])].sort(),
    eventIds: [...(input.eventIds ?? [])].sort(),
    filePaths: [...(input.filePaths ?? [])].sort(),
    sourceRefs: [...(input.sourceRefs ?? [])].sort((a, b) => `${a.type}:${a.id}`.localeCompare(`${b.type}:${b.id}`)),
    reasons: [...(input.reasons ?? [])].sort(),
    evidence: [...(input.evidence ?? [])].sort(),
    readOnly: input.readOnly ?? true,
    approvalRequired: input.approvalRequired ?? false,
    nextSafeDrilldown: input.nextSafeDrilldown ?? "Inspect this signal in the focus inspector.",
  };
}

export function summarizeBrainFocusTarget(input: {
  generatedAt: number;
  focusTarget: CodexForgeBrainFocusTarget;
  targets: readonly CodexForgeBrainFocusTarget[];
  signals: readonly CodexForgeBrainFocusSignal[];
  lenses: readonly CodexForgeBrainFocusLens[];
  pathCount: number;
  nextSafeDrilldown: string;
}): CodexForgeBrainFocusSummary {
  const topSignalKinds = CODEXFORGE_BRAIN_FOCUS_SIGNAL_KINDS
    .filter((kind) => input.signals.some((signal) => signal.kind === kind))
    .slice(0, 6);

  return {
    generatedAt: input.generatedAt,
    focusTarget: input.focusTarget,
    text: `${input.focusTarget.label} has ${input.signals.length} related signals across ${topSignalKinds.join(", ") || "no active kinds"}.`,
    targetCount: input.targets.length,
    signalCount: input.signals.length,
    lensCount: input.lenses.length,
    pathCount: input.pathCount,
    topSignalKinds,
    nextSafeDrilldown: input.nextSafeDrilldown,
    readOnly: true,
  };
}

function buildTargets(
  input: CodexForgeBrainFocusBuildInput,
  generatedAt: number
): CodexForgeBrainFocusTarget[] {
  const graphTargets = (input.graph?.nodes ?? []).map((node) => targetFromNode(node));
  const topologyTargets = (input.semanticTopology?.clusters ?? []).map((cluster) => ({
    ...buildBrainFocusTarget({
      id: `topology-target:${cluster.id}`,
      kind: "topology-cluster",
      label: cluster.label,
      summary: cluster.nextSafeAction,
      severity: severityFromRisk(cluster.risk),
      relevance: cluster.weight,
      updatedAt: generatedAt,
      source: "topology",
      reasons: cluster.reasons,
      evidence: cluster.supportingSignals,
      nextSafeDrilldown: cluster.nextSafeAction,
    }),
    topologyCluster: cluster,
  }));
  const recommendationTargets = (input.recommendations ?? []).map((item) => ({
    ...buildBrainFocusTarget({
      id: `recommendation-target:${item.id}`,
      kind: "recommendation",
      label: item.title,
      summary: item.summary,
      severity: item.severity,
      relevance: item.score,
      updatedAt: item.updatedAt,
      source: "recommendation",
      reasons: item.reasons,
      evidence: item.evidence.map((evidence) => evidence.detail),
      approvalRequired: item.nextSafeAction.approvalRequired,
      nextSafeDrilldown: item.nextSafeAction.description,
    }),
    recommendation: item,
  }));
  const healthTargets = (input.runtimeHealth?.subsystemReadiness ?? []).map((subsystem) => ({
    ...buildBrainFocusTarget({
      id: `subsystem-target:${subsystem.id}`,
      kind: "subsystem",
      label: subsystem.label,
      summary: subsystem.nextSafeAction.detail,
      severity: subsystem.severity,
      relevance: subsystem.readinessScore,
      updatedAt: generatedAt,
      source: "health",
      reasons: subsystem.reasons,
      evidence: subsystem.evidence,
      approvalRequired: subsystem.nextSafeAction.approvalRequired,
      nextSafeDrilldown: subsystem.nextSafeAction.detail,
    }),
    subsystem,
  }));
  const agentTargets = (input.agents?.tasks ?? []).map((task) => ({
    ...buildBrainFocusTarget({
      id: `agent-target:${task.id}`,
      kind: "agent",
      label: task.goal,
      summary: task.contextHints.join(", ") || "Agent task focus.",
      severity: task.risk === "critical" ? "critical" : task.risk,
      relevance: task.confidence,
      updatedAt: task.createdAt,
      source: "agent",
      reasons: task.reasons,
      evidence: task.filePaths,
      approvalRequired: task.requestedAction === "mutate",
      nextSafeDrilldown: "Inspect agent handoff and review evidence.",
    }),
    agentTask: task,
  }));

  return [...graphTargets, ...topologyTargets, ...recommendationTargets, ...healthTargets, ...agentTargets]
    .sort(compareTargets)
    .slice(0, Math.max(1, input.limit ?? 32));
}

function buildSignals(
  input: CodexForgeBrainFocusBuildInput,
  target: CodexForgeBrainFocusTarget,
  generatedAt: number
): CodexForgeBrainFocusSignal[] {
  const nodeSignals = (input.graph?.nodes ?? []).map((node) =>
    buildBrainFocusSignal({
      id: `signal:graph:${node.id}`,
      kind: signalKindFromNode(node),
      label: getNodeLabel(node),
      summary: getNodeSummary(node),
      severity: severityFromImportance(node.meta.importance),
      relevance: node.id === target.nodeId ? 1 : relevanceFromNode(node),
      timestamp: node.meta.updatedAt ?? generatedAt,
      targetId: target.id,
      nodeIds: [node.id],
      filePaths: getNodeFilePath(node) ? [getNodeFilePath(node) as string] : [],
      reasons: ["canonical-graph-node", node.kind],
      evidence: [node.id, getNodeSummary(node)].filter(Boolean),
      nextSafeDrilldown: "Open this graph node in the preserved inspector.",
    })
  );
  const eventSignals = (input.events ?? []).map((event) =>
    buildBrainFocusSignal({
      id: `signal:event:${event.id}`,
      kind: signalKindFromEvent(event.type),
      label: event.type,
      summary: summarizeEvent(event),
      severity: event.type === "failure.detected" ? "high" : "medium",
      relevance: event.payload.nodeId === target.nodeId ? 0.92 : 0.62,
      timestamp: event.ts,
      targetId: target.id,
      nodeIds: event.payload.nodeId ? [event.payload.nodeId] : [],
      eventIds: [event.id],
      reasons: ["runtime-event", event.type],
      evidence: [summarizeEvent(event)],
      nextSafeDrilldown: "Inspect replay and lineage evidence for this event.",
    })
  );
  const memorySignals = (input.cognitiveMemory ?? []).map((memory) =>
    buildBrainFocusSignal({
      id: `signal:memory:${memory.node.id}`,
      kind: "memory",
      label: getNodeLabel(memory.node),
      summary: getNodeSummary(memory.node),
      severity: severityFromImportance(memory.node.meta.importance),
      relevance: memory.score,
      weight: memory.importance,
      timestamp: memory.updatedAt,
      targetId: target.id,
      nodeIds: [memory.node.id],
      reasons: memory.reasons,
      evidence: memory.breakdown.reasons,
      nextSafeDrilldown: "Trace memory into concepts and source nodes.",
    })
  );
  const contextSignals = (input.predictiveContext?.signals ?? []).map((signal) =>
    buildBrainFocusSignal({
      id: `signal:context:${signal.id}`,
      kind: signal.kind === "file" ? "file" : signal.kind === "architecture" ? "architecture" : "context",
      label: signal.label,
      summary: signal.reasons.join(", "),
      severity: "medium",
      relevance: signal.score,
      timestamp: signal.timestamp,
      targetId: target.id,
      filePaths: signal.ref && "path" in signal.ref && typeof signal.ref.path === "string" ? [signal.ref.path] : [],
      reasons: signal.reasons,
      evidence: [signal.source],
      nextSafeDrilldown: "Inspect predictive context without changing route state.",
    })
  );
  const riskSignals = [
    ...(input.prioritizedRisks ?? []).map((risk) =>
      buildBrainFocusSignal({
        id: `signal:risk:${risk.id}`,
        kind: "risk",
        label: risk.label,
        summary: risk.mitigation,
        severity: risk.severity,
        relevance: risk.score,
        timestamp: risk.timestamp,
        targetId: target.id,
        reasons: risk.reasons,
        evidence: [risk.mitigation],
        nextSafeDrilldown: risk.nextSafeAction,
      })
    ),
    ...(input.predictiveContext?.risks ?? []).map((risk) =>
      buildBrainFocusSignal({
        id: `signal:context-risk:${risk.id}`,
        kind: "risk",
        label: risk.label,
        summary: risk.mitigation,
        severity: risk.severity,
        relevance: risk.score,
        timestamp: risk.timestamp,
        targetId: target.id,
        reasons: risk.reasons,
        evidence: [risk.mitigation],
        nextSafeDrilldown: risk.nextSafeAction,
      })
    ),
  ];
  const topologySignals = (input.semanticTopology?.clusters ?? []).map((cluster) =>
    buildBrainFocusSignal({
      id: `signal:topology:${cluster.id}`,
      kind: cluster.kind === "architecture" ? "architecture" : "topology",
      label: cluster.label,
      summary: cluster.nextSafeAction,
      severity: severityFromRisk(cluster.risk),
      relevance: cluster.weight,
      timestamp: generatedAt,
      targetId: target.id,
      nodeIds: cluster.nodeIds,
      eventIds: cluster.eventIds,
      filePaths: cluster.filePaths,
      reasons: cluster.reasons,
      evidence: cluster.supportingSignals,
      nextSafeDrilldown: cluster.nextSafeAction,
    })
  );
  const recommendationSignals = (input.recommendations ?? []).map((recommendation) =>
    buildBrainFocusSignal({
      id: `signal:recommendation:${recommendation.id}`,
      kind: "recommendation",
      label: recommendation.title,
      summary: recommendation.summary,
      severity: recommendation.severity,
      relevance: recommendation.score,
      timestamp: recommendation.updatedAt,
      targetId: target.id,
      nodeIds: recommendation.relatedNodeIds,
      filePaths: recommendation.relatedFilePaths,
      reasons: recommendation.reasons,
      evidence: recommendation.evidence.map((evidence) => evidence.detail),
      approvalRequired: recommendation.nextSafeAction.approvalRequired,
      nextSafeDrilldown: recommendation.nextSafeAction.description,
    })
  );
  const insightSignals = (input.insightQueue?.insights ?? []).map((insight) =>
    buildBrainFocusSignal({
      id: `signal:insight:${insight.id}`,
      kind: "insight",
      label: insight.title,
      summary: insight.detail,
      severity: insight.severity,
      relevance: insight.score,
      timestamp: insight.timestamp,
      targetId: target.id,
      nodeIds: insight.relatedNodeIds,
      filePaths: insight.relatedFilePaths,
      reasons: [insight.whyItMatters],
      evidence: insight.evidence.map((evidence) => evidence.detail),
      approvalRequired: insight.action.approvalRequired,
      nextSafeDrilldown: insight.action.description,
    })
  );
  const healthSignals = (input.runtimeHealth?.signals ?? []).map((signal) =>
    buildBrainFocusSignal({
      id: `signal:health:${signal.id}`,
      kind: signal.relatedSubsystem === "approval-boundary" ? "approval-boundary" : "health",
      label: signal.title,
      summary: signal.detail,
      severity: signal.severity,
      relevance: signal.severity === "critical" ? 0.95 : 0.74,
      timestamp: generatedAt,
      targetId: target.id,
      reasons: signal.reasons,
      evidence: signal.evidence,
      approvalRequired: signal.nextSafeAction.approvalRequired,
      nextSafeDrilldown: signal.nextSafeAction.detail,
    })
  );
  const agentSignals = [
    ...(input.agents?.tasks ?? []).map((task) =>
      buildBrainFocusSignal({
        id: `signal:agent-task:${task.id}`,
        kind: "agent",
        label: task.goal,
        summary: task.contextHints.join(", ") || "Agent task signal.",
        severity: task.risk === "critical" ? "critical" : task.risk,
        relevance: task.confidence,
        timestamp: task.createdAt,
        targetId: target.id,
        filePaths: task.filePaths,
        reasons: task.reasons,
        evidence: task.contextHints,
        approvalRequired: task.requestedAction === "mutate",
        nextSafeDrilldown: "Inspect agent handoff, review, and risk.",
      })
    ),
    ...(input.agents?.handoffs ?? []).map((handoff) =>
      buildBrainFocusSignal({
        id: `signal:agent-handoff:${handoff.id}`,
        kind: handoff.permission === "approval-required" ? "approval-boundary" : "agent",
        label: `${handoff.from} to ${handoff.to}`,
        summary: handoff.reason,
        severity: handoff.risk === "critical" ? "critical" : handoff.risk,
        relevance: 0.78,
        timestamp: generatedAt,
        targetId: target.id,
        reasons: [handoff.reason],
        evidence: [handoff.taskId, handoff.eventType],
        approvalRequired: handoff.permission === "approval-required",
        nextSafeDrilldown: "Review handoff evidence before any approved action.",
      })
    ),
  ];
  const replaySignals = (input.replayFrames ?? []).map((frame) =>
    buildBrainFocusSignal({
      id: `signal:replay:${frame.id}`,
      kind: "replay",
      label: frame.label,
      summary: frame.summary,
      severity: "medium",
      relevance: 0.7,
      timestamp: frame.timestamp,
      targetId: target.id,
      nodeIds: frame.highlightedNodeIds,
      reasons: [frame.activeLaneId, `items:${frame.itemIds.length}`],
      evidence: frame.itemIds,
      nextSafeDrilldown: "Inspect replay frame and lineage lane.",
    })
  );
  const lineageSignals = (input.replayLineage?.nodes ?? []).map((node) =>
    buildBrainFocusSignal({
      id: `signal:lineage:${node.id}`,
      kind: "lineage",
      label: node.label,
      summary: node.summary,
      severity: node.severity,
      relevance: severityRank(node.severity) / 5,
      timestamp: node.timestamp ?? generatedAt,
      targetId: target.id,
      nodeIds: node.graphNodeId ? [node.graphNodeId] : [],
      reasons: [node.kind, node.source],
      evidence: [node.id, node.status],
      nextSafeDrilldown: "Trace lineage neighbors without mutating graph state.",
    })
  );

  return [
    ...nodeSignals,
    ...eventSignals,
    ...memorySignals,
    ...contextSignals,
    ...riskSignals,
    ...topologySignals,
    ...recommendationSignals,
    ...insightSignals,
    ...healthSignals,
    ...agentSignals,
    ...replaySignals,
    ...lineageSignals,
  ]
    .sort(compareSignals)
    .slice(0, Math.max(16, input.limit ?? 48));
}

function buildFocusLenses(signals: readonly CodexForgeBrainFocusSignal[]): CodexForgeBrainFocusLens[] {
  return CODEXFORGE_BRAIN_FOCUS_SIGNAL_KINDS.map((kind) => {
    const kindSignals = signals.filter((signal) => signal.kind === kind).sort(compareSignals);
    if (kindSignals.length === 0) return null;
    const top = kindSignals[0];
    return {
      id: `lens:${kind}`,
      title: `${kind} lens`,
      kind,
      summary: top.summary,
      relevance: top.relevance,
      severity: top.severity,
      evidence: top.evidence.slice(0, 4),
      nextSafeDrilldown: top.nextSafeDrilldown,
      signals: kindSignals.slice(0, 5),
    };
  })
    .filter((lens): lens is CodexForgeBrainFocusLens => Boolean(lens))
    .sort((a, b) => {
      if (b.relevance !== a.relevance) return b.relevance - a.relevance;
      return a.id.localeCompare(b.id);
    });
}

function targetFromNode(node: CodexForgeBrainNode): CodexForgeBrainFocusTarget {
  return buildBrainFocusTarget({
    id: `graph-target:${node.id}`,
    kind: targetKindFromNode(node),
    label: getNodeLabel(node),
    summary: getNodeSummary(node),
    status: node.meta.status ?? "idle",
    severity: severityFromImportance(node.meta.importance),
    relevance: relevanceFromNode(node),
    updatedAt: node.meta.updatedAt,
    source: "graph",
    nodeId: node.id,
    filePath: getNodeFilePath(node),
    reasons: ["canonical-graph-node", node.kind],
    evidence: [node.id, getNodeSummary(node)].filter(Boolean),
    approvalRequired: node.meta.status === "blocked",
    nextSafeDrilldown: "Inspect graph neighborhood and related runtime signals.",
    graphNode: node,
  });
}

function clampFocusScore(value: number): number {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
}

function compareTargets(a: CodexForgeBrainFocusTarget, b: CodexForgeBrainFocusTarget): number {
  if (b.relevance !== a.relevance) return b.relevance - a.relevance;
  const severityDiff = severityRank(b.severity) - severityRank(a.severity);
  if (severityDiff !== 0) return severityDiff;
  if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
  return a.id.localeCompare(b.id);
}

function compareSignals(a: CodexForgeBrainFocusSignal, b: CodexForgeBrainFocusSignal): number {
  if (b.relevance !== a.relevance) return b.relevance - a.relevance;
  const severityDiff = severityRank(b.severity) - severityRank(a.severity);
  if (severityDiff !== 0) return severityDiff;
  if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
  return a.id.localeCompare(b.id);
}

function severityRank(severity: string): number {
  switch (severity) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}

function severityFromImportance(importance?: string): CodexForgeBrainFocusSeverity {
  if (importance === "critical" || importance === "high" || importance === "medium" || importance === "low") {
    return importance;
  }
  return "info";
}

function severityFromRisk(risk: number): CodexForgeBrainFocusSeverity {
  if (risk >= 0.86) return "critical";
  if (risk >= 0.68) return "high";
  if (risk >= 0.42) return "medium";
  if (risk > 0) return "low";
  return "info";
}

function relevanceFromNode(node: CodexForgeBrainNode): number {
  const importance = severityRank(severityFromImportance(node.meta.importance)) / 5;
  const status = node.meta.status === "active" ? 0.18 : node.meta.status === "blocked" || node.meta.status === "error" ? 0.22 : 0.08;
  const pinned = node.meta.pinned ? 0.18 : 0;
  return clampFocusScore(0.34 + importance * 0.38 + status + pinned);
}

function targetKindFromNode(node: CodexForgeBrainNode): CodexForgeBrainFocusTargetKind {
  if (node.kind === "memory" || node.kind === "note" || node.kind === "decision") return "memory";
  if (node.kind === "task" || node.kind === "plan" || node.kind === "step") return "task";
  if (node.kind === "run") return "execution";
  if (node.kind === "diff") return getNodeFilePath(node) ? "file" : "diff";
  if (node.kind === "tool") return "agent";
  return "graph-node";
}

function signalKindFromNode(node: CodexForgeBrainNode): CodexForgeBrainFocusSignalKind {
  if (node.kind === "memory" || node.kind === "note") return "memory";
  if (node.kind === "decision" || node.kind === "tag") return "concept";
  if (node.kind === "task" || node.kind === "plan" || node.kind === "step") return "task";
  if (node.kind === "run") return "execution";
  if (node.kind === "diff" || node.kind === "artifact" || node.kind === "snapshot") return "file";
  if (node.kind === "tool") return "agent";
  return "context";
}

function signalKindFromEvent(type: string): CodexForgeBrainFocusSignalKind {
  if (type.startsWith("task.")) return "task";
  if (type.startsWith("execution.") || type === "diff.generated") return "execution";
  if (type.startsWith("memory.")) return "memory";
  if (type.startsWith("concept.")) return "concept";
  if (type.startsWith("failure.") || type.startsWith("recovery.")) return "risk";
  return "context";
}

function getNodeLabel(node: CodexForgeBrainNode): string {
  return typeof node.data.label === "string" && node.data.label.trim()
    ? node.data.label.trim()
    : `${node.kind} ${node.id}`;
}

function getNodeSummary(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  for (const key of ["summary", "whyItMatters", "goal", "content", "text", "description", "resultSummary", "patchPreview"]) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return getNodeLabel(node);
}

function getNodeFilePath(node: CodexForgeBrainNode): string | undefined {
  const data = node.data as Record<string, unknown>;
  const value = data.filePath ?? data.path ?? data.repoPath;
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function summarizeEvent(event: { type: string; payload: Record<string, unknown> }): string {
  for (const key of ["goal", "resultSummary", "message", "content", "patchPreview", "summary"]) {
    const value = event.payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return event.type;
}
