import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeKnowledgeClusterEdge,
  CodexForgeKnowledgeClusterNode,
  CodexForgeKnowledgeTopology,
  CodexForgeTopologyBuildInput,
  CodexForgeTopologySignal,
  CodexForgeTopologySignalKind,
} from "./topology-types";
import { buildDeterministicTopologyLayout } from "./topology-layout";
import { summarizeKnowledgeTopology } from "./topology-summarizer";

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function dataOf(node: CodexForgeBrainNode): Record<string, unknown> {
  return node.data as Record<string, unknown>;
}

function words(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9/_-]+/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4)
    .slice(0, 12);
}

function nodeLabel(node: CodexForgeBrainNode): string {
  const data = dataOf(node);
  return String(data.label ?? data.summary ?? data.goal ?? data.content ?? data.text ?? node.id);
}

function nodePath(node: CodexForgeBrainNode): string | undefined {
  const data = dataOf(node);
  return typeof data.filePath === "string"
    ? data.filePath
    : typeof data.path === "string"
      ? data.path
      : typeof data.repoPath === "string"
        ? data.repoPath
        : undefined;
}

function kindForNode(node: CodexForgeBrainNode): CodexForgeTopologySignalKind {
  const text = `${node.kind} ${nodeLabel(node)}`.toLowerCase();
  if (text.includes("contradict")) return "contradiction";
  if (node.kind === "memory" || node.kind === "decision" || node.kind === "note") return "memory";
  if (node.kind === "task" || node.kind === "plan" || node.kind === "step") return "task";
  if (node.kind === "run") return "execution";
  if (node.kind === "diff" || node.kind === "snapshot" || nodePath(node)) return "file";
  if (node.kind === "repo" || node.kind === "workflow" || node.kind === "tool") return "architecture";
  if (node.meta.status === "blocked" || node.meta.status === "error") return "risk";
  return "concept";
}

function importanceScore(value: string | undefined): number {
  if (value === "critical") return 1;
  if (value === "high") return 0.78;
  if (value === "medium") return 0.54;
  return 0.3;
}

function signalFromNode(node: CodexForgeBrainNode): CodexForgeTopologySignal {
  const label = nodeLabel(node);
  const path = nodePath(node);
  const tags = Array.isArray(dataOf(node).tags)
    ? (dataOf(node).tags as string[]).filter((item) => typeof item === "string").sort()
    : [];
  const kind = kindForNode(node);
  const risk =
    node.meta.status === "error" ? 0.88 : node.meta.status === "blocked" ? 0.74 : node.meta.archived ? 0.45 : 0.18;

  return {
    id: `node:${node.id}`,
    label,
    kind,
    score: clamp01(importanceScore(node.meta.importance) + (node.meta.pinned ? 0.12 : 0)),
    risk: kind === "risk" ? Math.max(risk, 0.74) : risk,
    confidence: node.meta.pinned ? 0.86 : 0.64,
    timestamp: node.meta.updatedAt ?? node.meta.createdAt ?? 0,
    tags,
    keywords: [...new Set([...words(label), node.kind, ...(path ? words(path) : [])])].sort(),
    sourceRefs: (node.meta.sourceRefs ?? []).map((ref) => `${ref.type}:${ref.id}`).sort(),
    reasons: [`node-kind:${node.kind}`, `status:${node.meta.status ?? "idle"}`],
    nodeIds: [node.id],
    eventIds: [],
    filePaths: path ? [path] : [],
    graphNodes: [node],
  };
}

function addSignal(map: Map<string, CodexForgeTopologySignal>, signal: CodexForgeTopologySignal): void {
  map.set(signal.id, signal);
}

export function groupTopologySignals(
  input: CodexForgeTopologyBuildInput
): CodexForgeTopologySignal[] {
  const signals = new Map<string, CodexForgeTopologySignal>();

  for (const node of input.graph.nodes) addSignal(signals, signalFromNode(node));

  for (const event of input.events ?? []) {
    const kind: CodexForgeTopologySignalKind =
      event.type === "failure.detected"
        ? "risk"
        : event.type === "recovery.detected"
          ? "recovery"
          : event.type === "concept.synthesized"
            ? "concept"
            : event.type === "memory.promoted"
              ? "memory"
              : event.type.startsWith("execution") || event.type === "diff.generated"
                ? "execution"
                : event.type.startsWith("task")
                  ? "task"
                  : "prediction";
    const payload = event.payload as Record<string, unknown>;
    const label = String(payload.label ?? payload.message ?? payload.goal ?? payload.content ?? payload.filePath ?? event.type);
    addSignal(signals, {
      id: `event:${event.id}`,
      label,
      kind,
      score: kind === "risk" ? 0.86 : 0.62,
      risk: kind === "risk" ? 0.9 : 0.24,
      confidence: 0.72,
      timestamp: event.ts,
      tags: [event.type],
      keywords: words(label),
      sourceRefs: event.source ? [`${event.source.type}:${event.source.id}`] : [],
      reasons: [`runtime-event:${event.type}`],
      nodeIds: typeof payload.nodeId === "string" ? [payload.nodeId] : [],
      eventIds: [event.id],
      filePaths: typeof payload.filePath === "string" ? [payload.filePath] : [],
    });
  }

  for (const item of input.rankedMemory ?? []) {
    addSignal(signals, {
      id: `ranked-memory:${item.node.id}`,
      label: nodeLabel(item.node),
      kind: "memory",
      score: clamp01(item.score / 180),
      risk: item.status === "archived" ? 0.44 : 0.16,
      confidence: clamp01(0.48 + item.reasons.length * 0.06),
      timestamp: item.updatedAt,
      tags: [],
      keywords: words(nodeLabel(item.node)),
      sourceRefs: [],
      reasons: item.reasons.slice().sort(),
      nodeIds: [item.node.id],
      eventIds: [],
      filePaths: nodePath(item.node) ? [String(nodePath(item.node))] : [],
    });
  }

  for (const item of input.cognitiveMemory ?? []) {
    addSignal(signals, {
      id: `cognitive-memory:${item.node.id}`,
      label: nodeLabel(item.node),
      kind: "memory",
      score: item.score,
      risk: item.breakdown.contradictionRisk,
      confidence: item.confidence,
      timestamp: item.updatedAt,
      tags: [],
      keywords: words(nodeLabel(item.node)),
      sourceRefs: [],
      reasons: item.reasons.slice().sort(),
      nodeIds: [item.node.id],
      eventIds: [],
      filePaths: nodePath(item.node) ? [String(nodePath(item.node))] : [],
    });
  }

  for (const risk of input.prioritizedRisks ?? input.predictiveContext?.risks ?? []) {
    addSignal(signals, {
      id: `risk:${risk.id}`,
      label: risk.label,
      kind: "risk",
      score: risk.score,
      risk: risk.score,
      confidence: risk.confidence,
      timestamp: risk.timestamp,
      tags: [risk.severity],
      keywords: words(risk.label),
      sourceRefs: [],
      reasons: risk.reasons.slice().sort(),
      nodeIds: [],
      eventIds: [],
      filePaths: [],
    });
  }

  for (const signal of input.contextSignals ?? input.predictiveContext?.signals ?? []) {
    const kind: CodexForgeTopologySignalKind =
      signal.kind === "file"
        ? "file"
        : signal.kind === "architecture"
          ? "architecture"
          : signal.kind === "memory"
            ? "memory"
            : signal.kind === "task"
              ? "task"
              : signal.kind === "execution"
                ? "execution"
                : signal.kind === "risk" || signal.kind === "blocker"
                  ? "risk"
                  : "prediction";
    addSignal(signals, {
      id: `prediction:${signal.id}`,
      label: signal.label,
      kind: kind === "prediction" ? "prediction" : kind,
      score: signal.score,
      risk: kind === "risk" ? signal.score : 0.18,
      confidence: signal.confidence,
      timestamp: signal.timestamp,
      tags: [signal.kind, signal.source],
      keywords: words(signal.label),
      sourceRefs: [],
      reasons: signal.reasons.slice().sort(),
      nodeIds: signal.ref?.nodeId ? [signal.ref.nodeId] : [],
      eventIds: signal.ref?.eventId ? [signal.ref.eventId] : [],
      filePaths: signal.ref?.path ? [signal.ref.path] : [],
    });
  }

  for (const item of input.contradictions ?? []) {
    addSignal(signals, {
      id: `contradiction:${item.id}`,
      label: item.reason,
      kind: "contradiction",
      score: item.riskScore,
      risk: item.riskScore,
      confidence: clamp01(0.45 + item.riskScore * 0.45),
      timestamp: 0,
      tags: ["contradiction"],
      keywords: words(item.reason),
      sourceRefs: [],
      reasons: [item.reason, ...item.opposingTerms.map((term) => `opposes:${term}`)].sort(),
      nodeIds: item.nodeIds.slice().sort(),
      eventIds: [],
      filePaths: [],
    });
  }

  if (input.agentPlan) {
    addSignal(signals, {
      id: `agent:${input.agentPlan.id}`,
      label: input.agentPlan.contextSummary,
      kind: "agent",
      score: input.agentPlan.confidence,
      risk: input.agentPlan.task.risk === "critical" ? 1 : input.agentPlan.task.risk === "high" ? 0.78 : 0.38,
      confidence: input.agentPlan.confidence,
      timestamp: input.agentPlan.task.createdAt,
      tags: [input.agentPlan.decision.primaryAgent, input.agentPlan.task.domain],
      keywords: words(input.agentPlan.contextSummary),
      sourceRefs: [],
      reasons: input.agentPlan.reasons.slice().sort(),
      nodeIds: [],
      eventIds: [
        ...input.agentPlan.handoffs.map((handoff) => handoff.id),
        ...input.agentPlan.reviews.map((review) => review.id),
        ...input.agentPlan.readOnlySteps.map((step) => step.id),
        ...input.agentPlan.approvalRequiredSteps.map((step) => step.id),
        ...input.agentPlan.blockedSteps.map((step) => step.id),
      ].sort(),
      filePaths: input.agentPlan.task.filePaths.slice().sort(),
    });
  }

  return Array.from(signals.values()).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.id.localeCompare(b.id);
  });
}

export function buildKnowledgeClusterNode(
  id: string,
  signals: readonly CodexForgeTopologySignal[]
): CodexForgeKnowledgeClusterNode {
  const sorted = signals.slice().sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  const lead = sorted[0];
  const score = sorted.reduce((total, signal) => total + signal.score, 0) / Math.max(1, sorted.length);
  const risk = sorted.reduce((total, signal) => total + signal.risk, 0) / Math.max(1, sorted.length);
  const nodeIds = [...new Set(sorted.flatMap((signal) => signal.nodeIds))].sort();
  const eventIds = [...new Set(sorted.flatMap((signal) => signal.eventIds))].sort();
  const filePaths = [...new Set(sorted.flatMap((signal) => signal.filePaths))].sort();
  const tags = [...new Set(sorted.flatMap((signal) => signal.tags))].sort();
  const keywords = [...new Set(sorted.flatMap((signal) => signal.keywords))].sort().slice(0, 10);

  return {
    id,
    label: lead?.label ?? id,
    kind: lead?.kind ?? "concept",
    weight: clamp01(score + sorted.length * 0.035),
    density: clamp01((nodeIds.length + eventIds.length + filePaths.length + sorted.length) / 14),
    risk: clamp01(risk),
    memoryDensity: clamp01(sorted.filter((signal) => signal.kind === "memory").length / Math.max(1, sorted.length)),
    conceptStrength: clamp01(sorted.filter((signal) => signal.kind === "concept").length / Math.max(1, sorted.length)),
    confidence: clamp01(sorted.reduce((total, signal) => total + signal.confidence, 0) / Math.max(1, sorted.length)),
    status: risk > 0.7 ? "risk-hotspot" : score > 0.72 ? "high-signal" : "mapped",
    tags,
    keywords,
    sourceRefs: [...new Set(sorted.flatMap((signal) => signal.sourceRefs))].sort(),
    supportingSignals: sorted.map((signal) => signal.label).slice(0, 8),
    reasons: [...new Set(sorted.flatMap((signal) => signal.reasons))].sort().slice(0, 12),
    nodeIds,
    eventIds,
    filePaths,
    nextSafeAction: risk > 0.7 ? "Review supporting signals before execution." : "Use as read-only context for the next routing decision.",
  };
}

function clusterKey(signal: CodexForgeTopologySignal): string {
  const path = signal.filePaths[0]?.split(/[\\/]/).slice(0, 3).join("/") ?? "";
  const tag = signal.tags[0] ?? signal.keywords[0] ?? "general";
  return `${signal.kind}:${path || tag}`.toLowerCase();
}

export function buildKnowledgeClusterEdges(
  clusters: readonly CodexForgeKnowledgeClusterNode[]
): CodexForgeKnowledgeClusterEdge[] {
  const edges: CodexForgeKnowledgeClusterEdge[] = [];
  for (let leftIndex = 0; leftIndex < clusters.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < clusters.length; rightIndex += 1) {
      const left = clusters[leftIndex];
      const right = clusters[rightIndex];
      const sharedTags = left.tags.filter((tag) => right.tags.includes(tag));
      const sharedSources = left.sourceRefs.filter((ref) => right.sourceRefs.includes(ref));
      const sharedPaths = left.filePaths.filter((path) => right.filePaths.some((other) => path === other || path.includes(other) || other.includes(path)));
      const sharedKind = left.kind === right.kind ? 1 : 0;
      const weight = clamp01(sharedTags.length * 0.2 + sharedSources.length * 0.25 + sharedPaths.length * 0.28 + sharedKind * 0.16 + Math.min(left.risk, right.risk) * 0.12);
      if (weight < 0.18) continue;
      const relation = sharedPaths.length > 0 ? "shared-path" : sharedSources.length > 0 ? "shared-source" : sharedTags.length > 0 ? "shared-tags" : left.risk > 0.65 && right.risk > 0.65 ? "risk" : "shared-kind";
      edges.push({
        id: `edge:${left.id}:${right.id}`,
        from: left.id,
        to: right.id,
        weight,
        relation,
        reasons: [`relation:${relation}`, `weight:${weight.toFixed(2)}`],
      });
    }
  }
  return edges.sort((a, b) => b.weight - a.weight || a.id.localeCompare(b.id)).slice(0, 36);
}

export function buildKnowledgeTopology(
  input: CodexForgeTopologyBuildInput
): CodexForgeKnowledgeTopology {
  const groups = new Map<string, CodexForgeTopologySignal[]>();
  for (const signal of groupTopologySignals(input)) {
    const key = clusterKey(signal);
    groups.set(key, [...(groups.get(key) ?? []), signal]);
  }
  const clusters = Array.from(groups.entries())
    .map(([key, signals]) => buildKnowledgeClusterNode(`cluster:${key}`, signals))
    .sort((a, b) => b.weight - a.weight || a.id.localeCompare(b.id))
    .slice(0, 24);
  const edges = buildKnowledgeClusterEdges(clusters);
  const layout = buildDeterministicTopologyLayout(clusters);
  const topology = {
    generatedAt: input.now ?? input.graph.meta.updatedAt ?? 0,
    clusters,
    edges,
    layout,
    summary: emptySummary(),
  };
  return { ...topology, summary: summarizeKnowledgeTopology(topology) };
}

function emptySummary() {
  return {
    status: "empty" as const,
    text: "",
    hotspotCount: 0,
    densestMemoryRegions: [],
    highestRiskHotspots: [],
    strongestConceptClusters: [],
    staleOrContradictoryAreas: [],
    executionHotspots: [],
    agentActivityHotspots: [],
    architectureHotspots: [],
    nextSafeAction: "Inspect the highest-weight read-only cluster before acting.",
  };
}
