import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime/runtime-types";
import type { CodexForgeAgentRuntimeRisk } from "@/lib/codexforge/agents/runtime/agent-types";
import { buildPredictiveContext } from "../context";
import {
  detectMemoryContradictions,
  findPromotableConcepts,
  rankCognitiveMemory,
} from "../memory";
import { selectTopologyHotspots } from "../topology";
import { buildReadOnlyRecommendationAction, buildApprovalRequiredRecommendationAction } from "./action-safety";
import { prioritizeRuntimeRecommendations } from "./recommendation-prioritizer";
import type {
  CodexForgeRecommendationBuildInput,
  CodexForgeRecommendationEvidence,
  CodexForgeRecommendationSeverity,
  CodexForgeRecommendationStatus,
  CodexForgeRuntimeRecommendation,
} from "./recommendation-types";

const STALE_CONTEXT_MS = 1000 * 60 * 60 * 24 * 14;

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function latestTimestamp(input: CodexForgeRecommendationBuildInput): CodexForgeBrainTimestamp {
  return Math.max(
    input.now ?? 0,
    input.graph?.meta.updatedAt ?? 0,
    ...Array.from(input.events ?? []).map((event) => event.ts),
    ...Array.from(input.graph?.nodes ?? []).map((node) => node.meta.updatedAt ?? node.meta.createdAt ?? 0)
  );
}

function asRecord(node: CodexForgeBrainNode): Record<string, unknown> {
  return node.data as Record<string, unknown>;
}

function labelForNode(node: CodexForgeBrainNode): string {
  const data = asRecord(node);
  return String(data.label ?? data.summary ?? data.goal ?? data.content ?? data.text ?? node.id);
}

function pathForNode(node: CodexForgeBrainNode): string | undefined {
  const data = asRecord(node);
  return typeof data.filePath === "string"
    ? data.filePath
    : typeof data.path === "string"
      ? data.path
      : typeof data.repoPath === "string"
        ? data.repoPath
        : undefined;
}

function severityFromRisk(value?: string): CodexForgeRecommendationSeverity {
  switch (value) {
    case "critical":
      return "critical";
    case "high":
      return "high";
    case "medium":
      return "medium";
    case "low":
      return "low";
    default:
      return "info";
  }
}

function statusForSeverity(
  severity: CodexForgeRecommendationSeverity
): CodexForgeRecommendationStatus {
  if (severity === "critical" || severity === "high") return "needs-review";
  if (severity === "medium") return "recommended";
  return "queued";
}

function evidenceFromNode(node: CodexForgeBrainNode, source: CodexForgeRecommendationEvidence["source"]): CodexForgeRecommendationEvidence {
  const path = pathForNode(node);
  return {
    id: `${source}:${node.id}`,
    label: labelForNode(node),
    source,
    detail: `${node.kind} node with status ${node.meta.status ?? "idle"} and importance ${node.meta.importance ?? "low"}.`,
    nodeIds: [node.id],
    filePaths: path ? [path] : [],
    timestamp: node.meta.updatedAt ?? node.meta.createdAt,
  };
}

function makeRecommendation(
  args: Omit<CodexForgeRuntimeRecommendation, "relatedNodeIds" | "relatedFilePaths" | "sourceRefs"> & {
    relatedNodeIds?: string[];
    relatedFilePaths?: string[];
    sourceRefs?: string[];
  }
): CodexForgeRuntimeRecommendation {
  const relatedNodeIds = [...new Set(args.relatedNodeIds ?? args.evidence.flatMap((item) => item.nodeIds ?? []))].sort();
  const relatedFilePaths = [...new Set(args.relatedFilePaths ?? args.evidence.flatMap((item) => item.filePaths ?? []))].sort();
  const sourceRefs = [...new Set(args.sourceRefs ?? args.evidence.map((item) => item.id))].sort();

  return {
    ...args,
    confidence: clamp01(args.confidence),
    score: clamp01(args.score),
    reasons: [...new Set(args.reasons)].sort(),
    relatedNodeIds,
    relatedFilePaths,
    sourceRefs,
  };
}

export function buildRiskRecommendations(
  input: CodexForgeRecommendationBuildInput
): CodexForgeRuntimeRecommendation[] {
  const graph = input.graph;
  if (!graph) return [];
  const now = latestTimestamp(input);
  const riskyNodes = graph.nodes.filter((node) =>
    node.meta.status === "blocked" ||
    node.meta.status === "error" ||
    node.meta.importance === "critical" ||
    node.meta.importance === "high"
  );

  return riskyNodes.slice(0, 8).map((node) => {
    const severity = node.meta.importance === "critical" || node.meta.status === "error" ? "critical" : node.meta.importance === "high" || node.meta.status === "blocked" ? "high" : "medium";
    const path = pathForNode(node);
    return makeRecommendation({
      id: `recommendation:inspect-risk:${node.id}`,
      kind: "inspect-risk",
      title: `Inspect ${labelForNode(node)}`,
      summary: path ? `Risk hotspot touches ${path}.` : "Risk hotspot is visible in the brain graph.",
      whyItMatters: "High-risk graph nodes should be inspected before planning mutations or routing context.",
      severity,
      status: statusForSeverity(severity),
      confidence: severity === "critical" ? 0.92 : 0.78,
      score: severity === "critical" ? 0.94 : 0.78,
      createdAt: node.meta.createdAt ?? now,
      updatedAt: node.meta.updatedAt ?? now,
      reasons: [severity === "critical" ? "critical-risk" : "high-risk", `status:${node.meta.status ?? "idle"}`],
      evidence: [evidenceFromNode(node, "graph")],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect risk evidence",
        description: "Open the related graph node, file path, or event lineage before planning any change.",
      }),
    });
  });
}

export function buildMemoryRecommendations(
  input: CodexForgeRecommendationBuildInput
): CodexForgeRuntimeRecommendation[] {
  const graph = input.graph;
  if (!graph) return [];
  const now = latestTimestamp(input);
  const cognitiveMemory = input.cognitiveMemory ?? rankCognitiveMemory({
    graph,
    events: input.events,
    now,
    limit: 12,
  });
  const contradictions = input.contradictionCandidates ?? detectMemoryContradictions({
    nodes: graph.nodes.filter((node) => ["memory", "decision", "note"].includes(node.kind)),
    maxPairs: 6,
  });
  const promotable = input.promotableConcepts ?? findPromotableConcepts({
    nodes: graph.nodes,
    events: input.events,
    limit: 6,
  });
  const recommendations: CodexForgeRuntimeRecommendation[] = [];

  for (const contradiction of contradictions.slice(0, 4)) {
    recommendations.push(makeRecommendation({
      id: `recommendation:resolve-contradiction:${contradiction.id}`,
      kind: "resolve-contradiction",
      title: "Review contradiction candidate",
      summary: contradiction.reason,
      whyItMatters: "Conflicting memories can pull predictive context and planning toward opposite conclusions.",
      severity: contradiction.riskScore >= 0.78 ? "high" : "medium",
      status: "needs-review",
      confidence: contradiction.riskScore,
      score: contradiction.riskScore,
      createdAt: now,
      updatedAt: now,
      reasons: ["contradiction-review", "memory-curation"],
      evidence: [{
        id: `memory:${contradiction.id}`,
        label: contradiction.opposingTerms.join(" vs "),
        source: "memory",
        detail: contradiction.evidenceSnippets.join(" | "),
        nodeIds: [...contradiction.nodeIds],
        score: contradiction.riskScore,
        timestamp: now,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect conflicting memories",
        description: "Compare the two source nodes and keep this phase read-only.",
      }),
    }));
  }

  for (const memory of cognitiveMemory.filter((item) => item.confidence >= 0.7).slice(0, 4)) {
    recommendations.push(makeRecommendation({
      id: `recommendation:curate-memory:${memory.node.id}`,
      kind: "curate-memory",
      title: `Curate ${labelForNode(memory.node)}`,
      summary: `Memory confidence ${memory.confidence.toFixed(2)} with score ${memory.score.toFixed(2)}.`,
      whyItMatters: "High-confidence memory should remain easy to inspect and should not be crowded by stale context.",
      severity: memory.node.meta.pinned || memory.node.meta.importance === "critical" ? "high" : "medium",
      status: "recommended",
      confidence: memory.confidence,
      score: memory.score,
      createdAt: memory.node.meta.createdAt ?? now,
      updatedAt: memory.updatedAt,
      reasons: [
        "memory-curation",
        ...(memory.node.meta.pinned ? ["pinned-memory"] : []),
        ...(memory.node.meta.importance === "critical" || memory.node.meta.importance === "high" ? ["high-importance-memory"] : []),
      ],
      evidence: [evidenceFromNode(memory.node, "memory")],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect memory score",
        description: "Review score reasons and source refs before deciding whether curation is needed.",
      }),
    }));
  }

  for (const concept of promotable.slice(0, 4)) {
    recommendations.push(makeRecommendation({
      id: `recommendation:promote-concept:${concept.id}`,
      kind: "promote-concept",
      title: `Promote concept candidate: ${concept.label}`,
      summary: concept.summary,
      whyItMatters: "Repeated high-confidence concepts should be reviewed for future promotion through an explicit action boundary.",
      severity: concept.confidence >= 0.82 ? "high" : "medium",
      status: "needs-review",
      confidence: concept.confidence,
      score: concept.confidence,
      createdAt: now,
      updatedAt: now,
      reasons: ["concept-promotion", "memory-curation"],
      evidence: [{
        id: `concept:${concept.id}`,
        label: concept.label,
        source: "memory",
        detail: concept.supportingSignals.slice(0, 4).join(", "),
        nodeIds: concept.sourceNodeIds,
        eventIds: concept.sourceEventIds,
        score: concept.confidence,
        timestamp: now,
      }],
      nextSafeAction: buildApprovalRequiredRecommendationAction({
        label: "Approve concept promotion later",
        description: "Promotion would create runtime events and must remain behind explicit approval.",
      }),
    }));
  }

  return recommendations;
}

export function buildContextRecommendations(
  input: CodexForgeRecommendationBuildInput
): CodexForgeRuntimeRecommendation[] {
  const graph = input.graph;
  if (!graph) return [];
  const now = latestTimestamp(input);
  const predictiveContext = input.predictiveContext ?? buildPredictiveContext({ graph, events: input.events, now });
  const staleNodes = graph.nodes
    .filter((node) => node.meta.archived || node.meta.status === "archived" || now - (node.meta.updatedAt ?? node.meta.createdAt ?? now) >= STALE_CONTEXT_MS)
    .sort((a, b) => (b.meta.updatedAt ?? 0) - (a.meta.updatedAt ?? 0) || a.id.localeCompare(b.id))
    .slice(0, 5);
  const recommendations = staleNodes.map((node) => makeRecommendation({
    id: `recommendation:refresh-context:${node.id}`,
    kind: "refresh-context" as const,
    title: `Refresh stale context: ${labelForNode(node)}`,
    summary: "Archived or old context may be overrepresented in current reasoning surfaces.",
    whyItMatters: "Stale context should be inspected before it becomes the next planning anchor.",
    severity: node.meta.archived ? "medium" : "low",
    status: "recommended" as const,
    confidence: 0.72,
    score: 0.68,
    createdAt: node.meta.createdAt ?? now,
    updatedAt: node.meta.updatedAt ?? now,
    reasons: ["stale-context", `context-confidence:${predictiveContext.contextConfidence.toFixed(2)}`],
    evidence: [evidenceFromNode(node, "context")],
    nextSafeAction: buildReadOnlyRecommendationAction({
      label: "Inspect stale context",
      description: "Review stale nodes and related predictions without mutating graph state.",
    }),
  }));

  for (const risk of predictiveContext.risks.slice(0, 4)) {
    const severity = severityFromRisk(risk.severity);
    recommendations.push(makeRecommendation({
      id: `recommendation:context-risk:${risk.id}`,
      kind: "protect-approval-boundary",
      title: `Protect boundary: ${risk.label}`,
      summary: risk.mitigation,
      whyItMatters: "Mutation, external execution, rendering, and command actions must stay behind explicit approval.",
      severity,
      status: severity === "critical" || severity === "high" ? "needs-review" : "recommended",
      confidence: risk.confidence,
      score: risk.score,
      createdAt: risk.timestamp,
      updatedAt: risk.timestamp,
      reasons: ["approval-boundary", `${severity}-risk`],
      evidence: [{
        id: `context-risk:${risk.id}`,
        label: risk.label,
        source: "context",
        detail: risk.nextSafeAction,
        score: risk.score,
        timestamp: risk.timestamp,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect approval boundary",
        description: risk.nextSafeAction,
      }),
    }));
  }

  return recommendations;
}

export function buildTopologyRecommendations(
  input: CodexForgeRecommendationBuildInput
): CodexForgeRuntimeRecommendation[] {
  const now = latestTimestamp(input);
  const topology = input.semanticTopology;
  if (!topology) return [];

  return selectTopologyHotspots(topology, 6).map((hotspot) => {
    const kind = hotspot.kind === "file" ? "inspect-file-hotspot" : hotspot.kind === "architecture" ? "review-architecture" : "review-architecture";
    const severity = hotspot.risk >= 0.82 ? "high" : hotspot.risk >= 0.62 ? "medium" : "low";
    const weight = "weight" in hotspot ? hotspot.weight : hotspot.intensity;
    const nodeIds = "nodeIds" in hotspot ? hotspot.nodeIds : hotspot.refs.nodeIds ?? [];
    const eventIds = "eventIds" in hotspot ? hotspot.eventIds : hotspot.refs.eventIds ?? [];
    const filePaths = "filePaths" in hotspot ? hotspot.filePaths : hotspot.refs.filePaths ?? [];
    return makeRecommendation({
      id: `recommendation:${kind}:${hotspot.id}`,
      kind,
      title: `Inspect topology hotspot: ${hotspot.label}`,
      summary: `Topology weight ${weight.toFixed(2)}, density ${hotspot.density.toFixed(2)}, risk ${hotspot.risk.toFixed(2)}.`,
      whyItMatters: "Topology hotspots reveal where architecture, memory, risk, and execution signals are converging.",
      severity,
      status: statusForSeverity(severity),
      confidence: hotspot.confidence,
      score: Math.max(weight, hotspot.risk),
      createdAt: now,
      updatedAt: now,
      reasons: ["architecture-hotspot", `topology-kind:${hotspot.kind}`],
      evidence: [{
        id: `topology:${hotspot.id}`,
        label: hotspot.label,
        source: "topology",
        detail: hotspot.reasons.join(", "),
        nodeIds,
        eventIds,
        filePaths,
        score: weight,
        timestamp: now,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect topology hotspot",
        description: "Open the hotspot in topology and compare related graph nodes and files.",
      }),
    });
  });
}

export function buildAgentRecommendations(
  input: CodexForgeRecommendationBuildInput
): CodexForgeRuntimeRecommendation[] {
  const now = latestTimestamp(input);
  const agents = input.agents;
  if (!agents) return [];
  const riskSeverity = (risk: CodexForgeAgentRuntimeRisk): CodexForgeRecommendationSeverity =>
    risk === "critical" ? "critical" : risk === "high" ? "high" : risk === "medium" ? "medium" : "low";
  const recommendations: CodexForgeRuntimeRecommendation[] = [];

  for (const handoff of agents.handoffs ?? []) {
    const severity = handoff.permission === "approval-required" ? "high" : riskSeverity(handoff.risk);
    recommendations.push(makeRecommendation({
      id: `recommendation:review-agent-handoff:${handoff.id}`,
      kind: "review-agent-handoff",
      title: `Review ${handoff.from} to ${handoff.to}`,
      summary: handoff.reason,
      whyItMatters: "Agent handoffs with approval boundaries should be inspected before any runtime action is taken.",
      severity,
      status: handoff.permission === "blocked" ? "blocked" : "needs-review",
      confidence: 0.78,
      score: severity === "high" ? 0.82 : 0.66,
      createdAt: now,
      updatedAt: now,
      reasons: ["agent-handoff", ...(handoff.permission === "approval-required" ? ["approval-boundary"] : [])],
      evidence: [{
        id: `agent-handoff:${handoff.id}`,
        label: `${handoff.from} -> ${handoff.to}`,
        source: "agent",
        detail: handoff.reason,
        score: 0.78,
        timestamp: now,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect agent handoff",
        description: "Review handoff reason, permission, and required reviewer before execution.",
      }),
    }));
  }

  for (const task of agents.tasks ?? []) {
    if (task.status !== "blocked" && task.status !== "review-required") continue;
    const severity = task.status === "blocked" ? "high" : riskSeverity(task.risk);
    recommendations.push(makeRecommendation({
      id: `recommendation:agent-task:${task.id}`,
      kind: "plan-next-step",
      title: `Plan next step for ${task.goal}`,
      summary: `Agent task is ${task.status} with ${task.requestedAction} requested.`,
      whyItMatters: "Blocked or review-required agent work should produce a plan before any action boundary is crossed.",
      severity,
      status: task.status === "blocked" ? "blocked" : "needs-review",
      confidence: task.confidence,
      score: task.confidence,
      createdAt: task.createdAt,
      updatedAt: task.createdAt,
      reasons: ["agent-review", `task-status:${task.status}`],
      evidence: [{
        id: `agent-task:${task.id}`,
        label: task.goal,
        source: "agent",
        detail: task.reasons.join(", "),
        filePaths: [...task.filePaths],
        score: task.confidence,
        timestamp: task.createdAt,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect agent task",
        description: "Review task reasons and file paths before approving downstream work.",
      }),
    }));
  }

  return recommendations;
}

export function buildRuntimeRecommendations(
  input: CodexForgeRecommendationBuildInput = {}
): CodexForgeRuntimeRecommendation[] {
  const recommendations = [
    ...buildRiskRecommendations(input),
    ...buildMemoryRecommendations(input),
    ...buildTopologyRecommendations(input),
    ...buildAgentRecommendations(input),
    ...buildContextRecommendations(input),
  ];
  const now = latestTimestamp(input);

  for (const event of input.events ?? []) {
    if (event.type === "execution.completed" && event.payload.status === "failed") {
      recommendations.push(makeRecommendation({
        id: `recommendation:verify-execution:${event.id}`,
        kind: "verify-execution",
        title: `Verify failed execution ${event.payload.executionId}`,
        summary: event.payload.resultSummary ?? "Execution failed and should be reviewed.",
        whyItMatters: "Failed executions can leave stale assumptions in memory, topology, and predicted next files.",
        severity: "high",
        status: "needs-review",
        confidence: 0.84,
        score: 0.86,
        createdAt: event.ts,
        updatedAt: event.ts,
        reasons: ["failed-execution", "runtime-stabilization"],
        evidence: [{
          id: `event:${event.id}`,
          label: event.payload.executionId,
          source: "event",
          detail: event.payload.resultSummary ?? "failed",
          eventIds: [event.id],
          timestamp: event.ts,
        }],
        nextSafeAction: buildReadOnlyRecommendationAction({
          label: "Inspect execution lineage",
          description: "Review failure and recovery signals before attempting another run.",
        }),
      }));
    }
    if (event.type === "recovery.detected") {
      recommendations.push(makeRecommendation({
        id: `recommendation:stabilize-runtime:${event.id}`,
        kind: "stabilize-runtime",
        title: `Review recovery ${event.payload.recoveryId}`,
        summary: event.payload.message,
        whyItMatters: "Recovered executions should be verified so future plans trust the correct runtime state.",
        severity: "medium",
        status: "recommended",
        confidence: 0.72,
        score: 0.68,
        createdAt: event.ts,
        updatedAt: event.ts,
        reasons: ["recovered-execution", "runtime-stabilization"],
        evidence: [{
          id: `event:${event.id}`,
          label: event.payload.recoveryId,
          source: "event",
          detail: event.payload.strategy ?? event.payload.message,
          eventIds: [event.id],
          timestamp: event.ts,
        }],
        nextSafeAction: buildReadOnlyRecommendationAction({
          label: "Inspect recovery evidence",
          description: "Confirm recovery signals in replay and lineage before planning next work.",
        }),
      }));
    }
  }

  if (recommendations.length === 0) {
    recommendations.push(makeRecommendation({
      id: "recommendation:plan-next-step:fallback",
      kind: "plan-next-step",
      title: "Plan the next read-only inspection",
      summary: "No live recommendation data is available yet.",
      whyItMatters: "The brain console should still provide a deterministic next inspection path.",
      severity: "info",
      status: "queued",
      confidence: 0.52,
      score: 0.4,
      createdAt: now,
      updatedAt: now,
      reasons: ["fixture-fallback", "read-only"],
      evidence: [{
        id: "fixture:empty-runtime",
        label: "Fallback recommendation",
        source: "fixture",
        detail: "No graph, event, memory, context, topology, or agent signals were provided.",
        timestamp: now,
      }],
      nextSafeAction: buildReadOnlyRecommendationAction({
        label: "Inspect graph overview",
        description: "Start with the preserved graph view and select the strongest current node.",
      }),
    }));
  }

  return prioritizeRuntimeRecommendations(recommendations).slice(0, input.limit ?? 24);
}
