import { extractExecutionLineage } from "../execution-lineage";
import { scoreSemanticLinks } from "../semantic-links";
import type {
  CodexForgeBrainLineageEdge,
  CodexForgeBrainLineageGraph,
  CodexForgeBrainLineageNode,
  CodexForgeBrainLineageNodeKind,
  CodexForgeBrainReplayBuildInput,
} from "./replay-types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function nodeLabel(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return asText(data.label) || asText(data.summary) || asText(data.goal) || asText(data.content) || node.id;
}

function lineageStatus(
  status: CodexForgeBrainLineageNode["status"] | "archived" | undefined
): CodexForgeBrainLineageNode["status"] {
  if (status === "archived" || !status) return "idle";
  return status;
}

function lineageKindForNode(node: CodexForgeBrainNode): CodexForgeBrainLineageNodeKind | null {
  if (node.kind === "message") return "message";
  if (node.kind === "task" || node.kind === "plan" || node.kind === "step") return "task";
  if (node.kind === "run") return "execution";
  if (node.kind === "diff") return "diff";
  if (node.kind === "memory" || node.kind === "decision" || node.kind === "note") return "memory";
  if (node.kind === "tag") return "concept";
  return null;
}

function addNode(nodes: Map<string, CodexForgeBrainLineageNode>, node: CodexForgeBrainLineageNode): void {
  if (nodes.has(node.id)) return;
  nodes.set(node.id, node);
}

function addEdge(edges: Map<string, CodexForgeBrainLineageEdge>, edge: CodexForgeBrainLineageEdge): void {
  if (edges.has(edge.id)) return;
  edges.set(edge.id, edge);
}

function eventNodeId(event: CodexForgeBrainRuntimeEvent): string {
  const payload = event.payload as Record<string, unknown>;
  const explicit = asText(payload.nodeId);
  if (explicit) return explicit;
  if (event.type === "message.created") return `message:${event.payload.messageId}`;
  if (event.type === "task.created") return `task:${event.payload.taskId}`;
  if (event.type === "task.updated") return `task:${event.payload.taskId}`;
  if (event.type === "execution.started") return `run:${event.payload.executionId}`;
  if (event.type === "execution.completed") return `run:${event.payload.executionId}`;
  if (event.type === "diff.generated") return `diff:${event.payload.diffId}`;
  if (event.type === "memory.promoted") return `memory:${event.payload.memoryId}`;
  if (event.type === "concept.synthesized") return `concept:${event.payload.conceptId}`;
  if (event.type === "failure.detected") return `failure:${event.payload.failureId}`;
  return `recovery:${event.payload.recoveryId}`;
}

function addRuntimeEventLineage(
  input: CodexForgeBrainReplayBuildInput,
  nodes: Map<string, CodexForgeBrainLineageNode>,
  edges: Map<string, CodexForgeBrainLineageEdge>
): void {
  const messageById = new Map<string, string>();
  const taskById = new Map<string, string>();
  const executionById = new Map<string, string>();
  const failureById = new Map<string, string>();

  for (const event of [...(input.events ?? [])].sort((a, b) => a.ts - b.ts || a.id.localeCompare(b.id))) {
    const id = eventNodeId(event);
    if (event.type === "message.created") {
      messageById.set(event.payload.messageId, id);
      addNode(nodes, {
        id,
        kind: "message",
        label: `${event.payload.role} message`,
        summary: event.payload.text,
        status: "done",
        severity: "low",
        timestamp: event.ts,
        source: event.source?.type === "agent-runtime" ? "agent-runtime" : "event",
        graphNodeId: event.payload.nodeId,
      });
    }
    if (event.type === "task.created" || event.type === "task.updated") {
      taskById.set(event.payload.taskId, id);
      addNode(nodes, {
        id,
        kind: "task",
        label: event.type === "task.created" ? "Task created" : "Task updated",
        summary: event.type === "task.created" ? event.payload.goal : event.payload.summary ?? event.payload.nextAction ?? event.payload.taskId,
        status: event.type === "task.updated" ? lineageStatus(event.payload.status ?? "active") : "active",
        severity: event.type === "task.updated" && event.payload.status === "blocked" ? "high" : "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      if (event.type === "task.created" && event.payload.sourceMessageId) {
        const from = messageById.get(event.payload.sourceMessageId) ?? `message:${event.payload.sourceMessageId}`;
        addEdge(edges, {
          id: `lineage:message-task:${from}:${id}`,
          from,
          to: id,
          label: "created task",
          relation: "message-to-task",
          severity: "medium",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
    if (event.type === "execution.started" || event.type === "execution.completed") {
      executionById.set(event.payload.executionId, id);
      addNode(nodes, {
        id,
        kind: "execution",
        label: event.type === "execution.started" ? "Execution started" : "Execution completed",
        summary: event.type === "execution.started" ? event.payload.label ?? event.payload.command ?? event.payload.executionId : event.payload.resultSummary ?? event.payload.executionId,
        status: event.type === "execution.started" ? "active" : event.payload.status === "failed" ? "error" : "done",
        severity: event.type === "execution.completed" && event.payload.status === "failed" ? "high" : "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      if (event.payload.taskId) {
        const from = taskById.get(event.payload.taskId) ?? `task:${event.payload.taskId}`;
        addEdge(edges, {
          id: `lineage:task-execution:${from}:${id}`,
          from,
          to: id,
          label: "executed in",
          relation: "task-to-execution",
          severity: "medium",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
    if (event.type === "diff.generated") {
      addNode(nodes, {
        id,
        kind: "diff",
        label: event.payload.filePath,
        summary: event.payload.patchPreview ?? event.payload.filePath,
        status: lineageStatus(event.payload.status ?? "done"),
        severity: "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      const executionId = event.payload.executionId ?? event.payload.runId;
      if (executionId) {
        const from = executionById.get(executionId) ?? `run:${executionId}`;
        addEdge(edges, {
          id: `lineage:execution-diff:${from}:${id}`,
          from,
          to: id,
          label: "produced diff",
          relation: "execution-to-diff",
          severity: "medium",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
    if (event.type === "failure.detected") {
      failureById.set(event.payload.failureId, id);
      addNode(nodes, {
        id,
        kind: "failure",
        label: event.payload.failureId,
        summary: event.payload.message,
        status: "error",
        severity: event.payload.severity ?? "high",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      if (event.payload.executionId) {
        const from = executionById.get(event.payload.executionId) ?? `run:${event.payload.executionId}`;
        addEdge(edges, {
          id: `lineage:execution-failure:${from}:${id}`,
          from,
          to: id,
          label: "failed with",
          relation: "execution-to-failure",
          severity: event.payload.severity ?? "high",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
    if (event.type === "recovery.detected") {
      addNode(nodes, {
        id,
        kind: "recovery",
        label: event.payload.strategy ?? event.payload.recoveryId,
        summary: event.payload.message,
        status: "active",
        severity: "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      if (event.payload.failureId) {
        const from = failureById.get(event.payload.failureId) ?? `failure:${event.payload.failureId}`;
        addEdge(edges, {
          id: `lineage:failure-recovery:${from}:${id}`,
          from,
          to: id,
          label: "recovered by",
          relation: "failure-to-recovery",
          severity: "medium",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
    if (event.type === "memory.promoted") {
      addNode(nodes, {
        id,
        kind: "memory",
        label: `${event.payload.memoryType} memory`,
        summary: event.payload.content,
        status: "done",
        severity: event.payload.importance === "critical" ? "critical" : "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
    }
    if (event.type === "concept.synthesized") {
      addNode(nodes, {
        id,
        kind: "concept",
        label: event.payload.label,
        summary: event.payload.summary ?? event.payload.label,
        status: "done",
        severity: "medium",
        timestamp: event.ts,
        source: "event",
        graphNodeId: event.payload.nodeId,
      });
      for (const sourceNodeId of event.payload.sourceNodeIds ?? []) {
        addEdge(edges, {
          id: `lineage:concept-source:${id}:${sourceNodeId}`,
          from: id,
          to: sourceNodeId,
          label: "source memory",
          relation: "concept-to-source-memory",
          severity: "medium",
          timestamp: event.ts,
          source: "event",
        });
      }
    }
  }
}

function addGraphLineage(input: CodexForgeBrainReplayBuildInput, nodes: Map<string, CodexForgeBrainLineageNode>, edges: Map<string, CodexForgeBrainLineageEdge>): void {
  const nodeById = new Map(input.graph.nodes.map((node) => [node.id, node]));
  for (const graphNode of input.graph.nodes) {
    const kind = lineageKindForNode(graphNode);
    if (!kind) continue;
    addNode(nodes, {
      id: graphNode.id,
      kind,
      label: nodeLabel(graphNode),
      summary: nodeLabel(graphNode),
        status: lineageStatus(graphNode.meta.status),
      severity: graphNode.meta.importance ?? "low",
      timestamp: graphNode.meta.updatedAt ?? graphNode.meta.createdAt,
      source: "graph",
      graphNodeId: graphNode.id,
    });
  }
  for (const edge of input.graph.edges) {
    const from = nodeById.get(edge.from);
    const to = nodeById.get(edge.to);
    if (!from || !to) continue;
    if (from.kind === "message" && to.kind === "task") {
      addEdge(edges, { id: `lineage:graph:message-task:${edge.id}`, from: from.id, to: to.id, label: "created task", relation: "message-to-task", severity: "medium", timestamp: edge.meta.updatedAt, source: "graph" });
    }
    if (from.kind === "task" && to.kind === "run") {
      addEdge(edges, { id: `lineage:graph:task-execution:${edge.id}`, from: from.id, to: to.id, label: "executed in", relation: "task-to-execution", severity: "medium", timestamp: edge.meta.updatedAt, source: "graph" });
    }
    if (from.kind === "run" && to.kind === "diff") {
      addEdge(edges, { id: `lineage:graph:execution-diff:${edge.id}`, from: from.id, to: to.id, label: "produced diff", relation: "execution-to-diff", severity: "medium", timestamp: edge.meta.updatedAt, source: "graph" });
    }
    if ((from.kind === "memory" || from.kind === "decision" || from.kind === "note") && (to.kind === "tag" || to.kind === "memory")) {
      addEdge(edges, { id: `lineage:graph:memory-concept:${edge.id}`, from: from.id, to: to.id, label: "evolved concept", relation: "memory-to-concept", severity: "medium", timestamp: edge.meta.updatedAt, source: "graph" });
    }
  }
}

function addAgentLineage(input: CodexForgeBrainReplayBuildInput, nodes: Map<string, CodexForgeBrainLineageNode>, edges: Map<string, CodexForgeBrainLineageEdge>): void {
  const plan = input.agentPlan;
  if (!plan) return;
  for (const handoff of plan.handoffs) {
    const fromId = `agent:${handoff.from}`;
    const toId = `agent:${handoff.to}`;
    const handoffId = `handoff:${handoff.id}`;
    addNode(nodes, { id: fromId, kind: "agent", label: handoff.from, summary: "Agent handoff source", status: "active", severity: handoff.risk, source: "agent-runtime" });
    addNode(nodes, { id: toId, kind: "agent", label: handoff.to, summary: "Agent handoff target", status: "active", severity: handoff.risk, source: "agent-runtime" });
    addNode(nodes, { id: handoffId, kind: "handoff", label: `${handoff.from} to ${handoff.to}`, summary: handoff.reason, status: handoff.permission === "blocked" ? "blocked" : "active", severity: handoff.risk, source: "agent-runtime", payload: { permission: handoff.permission } });
    addEdge(edges, { id: `lineage:agent-handoff:${handoff.id}:from`, from: fromId, to: handoffId, label: "hands off", relation: "agent-to-handoff", severity: handoff.risk, source: "agent-runtime" });
    addEdge(edges, { id: `lineage:agent-handoff:${handoff.id}:to`, from: handoffId, to: toId, label: "receives", relation: "agent-to-handoff", severity: handoff.risk, source: "agent-runtime" });
  }
  for (const review of plan.reviews) {
    const reviewerId = `agent:${review.reviewer}`;
    const reviewId = `review:${review.id}`;
    const riskId = `risk:${review.id}`;
    addNode(nodes, { id: reviewerId, kind: "agent", label: review.reviewer, summary: "Reviewer agent", status: "active", severity: review.risk, source: "agent-runtime" });
    addNode(nodes, { id: reviewId, kind: "review", label: review.status, summary: review.summary, status: review.status === "blocked" ? "blocked" : "done", severity: review.risk, source: "agent-runtime" });
    addNode(nodes, { id: riskId, kind: "risk", label: review.risk, summary: review.recommendations.join("; "), status: review.risk === "critical" ? "blocked" : "active", severity: review.risk, source: "agent-runtime" });
    addEdge(edges, { id: `lineage:agent-review:${review.id}`, from: reviewerId, to: reviewId, label: "reviewed", relation: "agent-to-review", severity: review.risk, source: "agent-runtime" });
    addEdge(edges, { id: `lineage:review-risk:${review.id}`, from: reviewerId, to: riskId, label: "raised risk", relation: "reviewer-to-risk", severity: review.risk, source: "agent-runtime" });
  }
}

function sortedGraph(id: string, label: string, nodes: Iterable<CodexForgeBrainLineageNode>, edges: Iterable<CodexForgeBrainLineageEdge>): CodexForgeBrainLineageGraph {
  const sortedNodes = [...nodes].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0) || a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));
  const sortedEdges = [...edges].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0) || a.relation.localeCompare(b.relation) || a.id.localeCompare(b.id));
  return {
    id,
    label,
    summary: `${sortedNodes.length} nodes and ${sortedEdges.length} edges.`,
    nodes: sortedNodes,
    edges: sortedEdges,
  };
}

export function buildBrainRuntimeLineage(input: CodexForgeBrainReplayBuildInput): CodexForgeBrainLineageGraph {
  const executionLineage = input.executionLineage ?? extractExecutionLineage({ graph: input.graph, events: [...(input.events ?? [])] });
  const semanticLinks = input.semanticLinks ?? scoreSemanticLinks({ graph: input.graph, maxCandidates: 18 });
  const nodes = new Map<string, CodexForgeBrainLineageNode>();
  const edges = new Map<string, CodexForgeBrainLineageEdge>();

  addGraphLineage(input, nodes, edges);
  addRuntimeEventLineage(input, nodes, edges);
  addAgentLineage(input, nodes, edges);

  for (const link of executionLineage.links) {
    addEdge(edges, {
      id: `lineage:execution:${link.from}:${link.to}:${link.kind}`,
      from: link.from,
      to: link.to,
      label: link.kind,
      relation: link.kind === "failure" ? "execution-to-failure" : link.kind === "diff" ? "execution-to-diff" : "task-to-execution",
      severity: link.kind === "failure" ? "high" : "medium",
      source: "execution-lineage",
    });
  }

  for (const link of semanticLinks) {
    addEdge(edges, {
      id: `lineage:semantic:${link.from}:${link.to}:${link.kind}`,
      from: link.from,
      to: link.to,
      label: link.reasons.join(", "),
      relation: "memory-to-concept",
      severity: link.score >= 80 ? "high" : "medium",
      source: "semantic-link",
    });
  }

  return sortedGraph("brain-lineage:runtime", "Runtime lineage", nodes.values(), edges.values());
}

function filterLineage(graph: CodexForgeBrainLineageGraph, id: string, label: string, kinds: readonly CodexForgeBrainLineageNodeKind[]): CodexForgeBrainLineageGraph {
  const kindSet = new Set(kinds);
  const nodeIds = new Set(graph.nodes.filter((node) => kindSet.has(node.kind)).map((node) => node.id));
  const edges = graph.edges.filter((edge) => nodeIds.has(edge.from) || nodeIds.has(edge.to));
  for (const edge of edges) {
    nodeIds.add(edge.from);
    nodeIds.add(edge.to);
  }
  return sortedGraph(id, label, graph.nodes.filter((node) => nodeIds.has(node.id)), edges);
}

export function buildExecutionLineageView(input: CodexForgeBrainReplayBuildInput): CodexForgeBrainLineageGraph {
  return filterLineage(buildBrainRuntimeLineage(input), "brain-lineage:execution", "Execution lineage", ["message", "task", "execution", "diff", "failure", "recovery"]);
}

export function buildMemoryLineageView(input: CodexForgeBrainReplayBuildInput): CodexForgeBrainLineageGraph {
  return filterLineage(buildBrainRuntimeLineage(input), "brain-lineage:memory", "Memory lineage", ["memory", "concept"]);
}

export function buildAgentLineageView(input: CodexForgeBrainReplayBuildInput): CodexForgeBrainLineageGraph {
  return filterLineage(buildBrainRuntimeLineage(input), "brain-lineage:agent", "Agent lineage", ["agent", "handoff", "review", "risk", "task"]);
}
