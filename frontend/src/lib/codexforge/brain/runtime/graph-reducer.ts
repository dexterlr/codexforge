import type {
  CodexForgeBrainBaseMeta,
  CodexForgeBrainEdge,
  CodexForgeBrainEdgeKind,
  CodexForgeBrainGraph,
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
  CodexForgeBrainStatus,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainGraphReductionInput,
  CodexForgeBrainRuntimeEvent,
} from "./runtime-types";

function now(): number {
  return Date.now();
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function cloneNode(node: CodexForgeBrainNode): CodexForgeBrainNode {
  return {
    ...node,
    data: { ...node.data },
    meta: {
      ...node.meta,
      ...(node.meta.sourceRefs ? { sourceRefs: [...node.meta.sourceRefs] } : {}),
    },
    ...(node.graph
      ? {
          graph: {
            ...node.graph,
            ...(node.graph.coordinates
              ? { coordinates: { ...node.graph.coordinates } }
              : {}),
          },
        }
      : {}),
  };
}

function cloneEdge(edge: CodexForgeBrainEdge): CodexForgeBrainEdge {
  return {
    ...edge,
    meta: {
      ...edge.meta,
      ...(edge.meta.sourceRefs ? { sourceRefs: [...edge.meta.sourceRefs] } : {}),
    },
  };
}

function cloneGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    ...graph,
    meta: { ...graph.meta },
    nodes: graph.nodes.map(cloneNode),
    edges: graph.edges.map(cloneEdge),
  };
}

function nodeId(prefix: string, id: string): string {
  return `${prefix}:${id.trim()}`;
}

function mergeMeta(
  existing: CodexForgeBrainBaseMeta | undefined,
  patch: Partial<CodexForgeBrainBaseMeta>,
  timestamp: number
): CodexForgeBrainBaseMeta {
  const sourceRefs = [
    ...(existing?.sourceRefs ?? []),
    ...(patch.sourceRefs ?? []),
  ];
  const dedupedRefs = new Map(sourceRefs.map((ref) => [`${ref.type}:${ref.id}`, ref]));

  return {
    createdAt: existing?.createdAt ?? patch.createdAt ?? timestamp,
    updatedAt: timestamp,
    status: patch.status ?? existing?.status,
    importance: patch.importance ?? existing?.importance,
    pinned: patch.pinned ?? existing?.pinned,
    archived: patch.archived ?? existing?.archived,
    ...(dedupedRefs.size > 0 ? { sourceRefs: [...dedupedRefs.values()] } : {}),
    version: patch.version ?? existing?.version,
  };
}

function toImportance(
  value: number | CodexForgeBrainImportance | undefined,
  fallback: CodexForgeBrainImportance
): CodexForgeBrainImportance {
  if (
    value === "low" ||
    value === "medium" ||
    value === "high" ||
    value === "critical"
  ) {
    return value;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  if (value >= 0.95) return "critical";
  if (value >= 0.75) return "high";
  if (value >= 0.45) return "medium";
  return "low";
}

function statusFromExecution(
  status: "completed" | "failed" | "cancelled" | undefined
): CodexForgeBrainStatus {
  if (status === "failed") return "error";
  if (status === "cancelled") return "blocked";
  return "done";
}

function upsertNode(
  graph: CodexForgeBrainGraph,
  node: CodexForgeBrainNode,
  timestamp: number
): CodexForgeBrainNode {
  const index = graph.nodes.findIndex((candidate) => candidate.id === node.id);

  if (index === -1) {
    graph.nodes.push({
      ...node,
      meta: mergeMeta(undefined, node.meta, timestamp),
    });
    return graph.nodes[graph.nodes.length - 1];
  }

  const existing = graph.nodes[index];
  const next = {
    ...existing,
    kind: node.kind,
    data: {
      ...(existing.data as Record<string, unknown>),
      ...(node.data as Record<string, unknown>),
    } as CodexForgeBrainNode["data"],
    meta: mergeMeta(existing.meta, node.meta, timestamp),
    ...(node.graph ? { graph: { ...existing.graph, ...node.graph } } : {}),
  } as CodexForgeBrainNode;

  graph.nodes[index] = next;
  return next;
}

function upsertEdge(
  graph: CodexForgeBrainGraph,
  from: string,
  to: string,
  kind: CodexForgeBrainEdgeKind,
  timestamp: number,
  label?: string,
  weight?: number
): CodexForgeBrainEdge | null {
  if (
    !graph.nodes.some((node) => node.id === from) ||
    !graph.nodes.some((node) => node.id === to)
  ) {
    return null;
  }

  const existing = graph.edges.find(
    (edge) =>
      edge.from === from &&
      edge.to === to &&
      edge.kind === kind &&
      (edge.label ?? "") === (label ?? "")
  );

  if (existing) {
    existing.meta = mergeMeta(existing.meta, {}, timestamp);
    if (typeof weight === "number") existing.weight = weight;
    return existing;
  }

  const edge: CodexForgeBrainEdge = {
    id: `edge:${from}:${kind}:${to}:${graph.edges.length}`,
    from,
    to,
    kind,
    ...(label ? { label } : {}),
    ...(typeof weight === "number" ? { weight } : {}),
    meta: mergeMeta(undefined, {}, timestamp),
  };

  graph.edges.push(edge);
  return edge;
}

function createConversationNode(
  conversationId: string,
  timestamp: number
): CodexForgeBrainNode {
  return {
    id: nodeId("conversation", conversationId),
    kind: "conversation",
    data: {
      label: `Conversation ${conversationId}`,
      lastMessageAt: timestamp,
    },
    meta: {
      createdAt: timestamp,
      updatedAt: timestamp,
      status: "active",
      importance: "medium",
      sourceRefs: [{ type: "derived", id: conversationId }],
    },
  } as CodexForgeBrainNode;
}

function reduceEvent(
  graph: CodexForgeBrainGraph,
  event: CodexForgeBrainRuntimeEvent,
  fallbackNow: number
): void {
  const timestamp = event.ts || fallbackNow;

  switch (event.type) {
    case "message.created": {
      const messageNodeId = event.payload.nodeId ?? nodeId("message", event.payload.messageId);
      const messageNode = upsertNode(
        graph,
        {
          id: messageNodeId,
          kind: "message",
          data: {
            label: clampText(`${event.payload.role}: ${event.payload.text}`, 96),
            role: event.payload.role,
            text: event.payload.text,
            source: event.payload.source,
            ts: timestamp,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "done",
            importance: event.payload.role === "assistant" ? "medium" : "low",
            sourceRefs: [{ type: "chat-message", id: event.payload.messageId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.conversationId) {
        const conversationNode = upsertNode(
          graph,
          createConversationNode(event.payload.conversationId, timestamp),
          timestamp
        );
        upsertEdge(graph, conversationNode.id, messageNode.id, "contains", timestamp);
      }
      break;
    }

    case "task.created": {
      upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("task", event.payload.taskId),
          kind: "task",
          data: {
            label: clampText(event.payload.goal, 96),
            goal: event.payload.goal,
            domain: event.payload.domain,
            tags: event.payload.tags,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "active",
            importance: "high",
            sourceRefs: event.payload.sourceMessageId
              ? [{ type: "chat-message", id: event.payload.sourceMessageId }]
              : [{ type: "derived", id: event.payload.taskId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );
      break;
    }

    case "task.updated": {
      upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("task", event.payload.taskId),
          kind: "task",
          data: {
            label: event.payload.summary
              ? clampText(event.payload.summary, 96)
              : `Task ${event.payload.taskId}`,
            goal: event.payload.summary ?? `Task ${event.payload.taskId}`,
            currentStep: event.payload.currentStep,
            totalSteps: event.payload.totalSteps,
            completedSteps: event.payload.completedSteps,
            runningSteps: event.payload.runningSteps,
            errorSteps: event.payload.errorSteps,
            nextAction: event.payload.nextAction,
            summary: event.payload.summary,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: event.payload.status ?? "active",
            importance:
              event.payload.status === "error" || event.payload.status === "blocked"
                ? "critical"
                : "high",
            sourceRefs: [{ type: "active-task", id: event.payload.taskId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );
      break;
    }

    case "execution.started": {
      const runNodeId =
        event.payload.nodeId ?? nodeId("run", event.payload.runId ?? event.payload.executionId);
      const runNode = upsertNode(
        graph,
        {
          id: runNodeId,
          kind: "run",
          data: {
            label: clampText(event.payload.label ?? "Execution run", 96),
            phase: event.payload.phase ?? "running",
            lastRunAt: event.payload.startedAt ?? timestamp,
            sourceLabel: event.payload.toolName,
            summary: event.payload.command,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "active",
            importance: "high",
            sourceRefs: [{ type: "execution-state", id: event.payload.executionId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.taskId) {
        upsertEdge(
          graph,
          nodeId("task", event.payload.taskId),
          runNode.id,
          "executed_in",
          timestamp
        );
      }
      break;
    }

    case "execution.completed": {
      const runNodeId =
        event.payload.nodeId ?? nodeId("run", event.payload.runId ?? event.payload.executionId);
      const runNode = upsertNode(
        graph,
        {
          id: runNodeId,
          kind: "run",
          data: {
            label: `Execution ${event.payload.executionId}`,
            phase: event.payload.status ?? "completed",
            resultSummary: event.payload.resultSummary,
            diffCount: event.payload.diffIds?.length,
            snapshotFileCount: event.payload.snapshotIds?.length,
            lastRunAt: event.payload.completedAt ?? timestamp,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: statusFromExecution(event.payload.status),
            importance: event.payload.status === "failed" ? "critical" : "high",
            sourceRefs: [{ type: "execution-state", id: event.payload.executionId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.taskId) {
        upsertEdge(
          graph,
          nodeId("task", event.payload.taskId),
          runNode.id,
          "executed_in",
          timestamp
        );
      }
      break;
    }

    case "diff.generated": {
      const diffNode = upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("diff", event.payload.diffId),
          kind: "diff",
          data: {
            label: event.payload.filePath,
            filePath: event.payload.filePath,
            patchPreview: event.payload.patchPreview,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: event.payload.status ?? "done",
            importance: "medium",
            sourceRefs: [{ type: "operator-diff", id: event.payload.diffId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.executionId || event.payload.runId) {
        upsertEdge(
          graph,
          nodeId("run", event.payload.runId ?? event.payload.executionId ?? ""),
          diffNode.id,
          "produced",
          timestamp
        );
      }
      break;
    }

    case "memory.promoted": {
      const memoryNode = upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("memory", event.payload.memoryId),
          kind: "memory",
          data: {
            label: clampText(event.payload.content, 88),
            memoryType: event.payload.memoryType,
            content: event.payload.content,
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "active",
            importance: toImportance(event.payload.importance, "medium"),
            pinned: event.payload.pinned,
            sourceRefs: [{ type: "memory-item", id: event.payload.memoryId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.taskId) {
        upsertEdge(
          graph,
          nodeId("task", event.payload.taskId),
          memoryNode.id,
          "references",
          timestamp
        );
      }

      for (const sourceNodeId of event.payload.sourceNodeIds ?? []) {
        upsertEdge(graph, memoryNode.id, sourceNodeId, "derived_from", timestamp);
      }
      break;
    }

    case "concept.synthesized": {
      const conceptNode = upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("concept", event.payload.conceptId),
          kind: "memory",
          data: {
            label: clampText(event.payload.label, 88),
            memoryType: "fact",
            content: event.payload.summary ?? event.payload.label,
            summary: event.payload.summary,
            tags: ["concept"],
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "active",
            importance:
              typeof event.payload.confidence === "number" &&
              event.payload.confidence >= 0.75
                ? "high"
                : "medium",
            sourceRefs: [{ type: "derived", id: event.payload.conceptId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      for (const sourceNodeId of event.payload.sourceNodeIds ?? []) {
        upsertEdge(graph, conceptNode.id, sourceNodeId, "summarizes", timestamp);
      }
      break;
    }

    case "failure.detected": {
      const failureNode = upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("failure", event.payload.failureId),
          kind: "note",
          data: {
            label: clampText(event.payload.message, 88),
            text: event.payload.message,
            summary: event.payload.recoverable === false ? "Unrecoverable failure" : "Failure detected",
            tags: ["failure", event.payload.severity ?? "medium"],
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "error",
            importance:
              event.payload.severity === "critical" ? "critical" : "high",
            sourceRefs: [{ type: "derived", id: event.payload.failureId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.taskId) {
        upsertEdge(graph, nodeId("task", event.payload.taskId), failureNode.id, "references", timestamp);
      }
      if (event.payload.executionId) {
        upsertEdge(graph, nodeId("run", event.payload.executionId), failureNode.id, "references", timestamp);
      }
      break;
    }

    case "recovery.detected": {
      const recoveryNode = upsertNode(
        graph,
        {
          id: event.payload.nodeId ?? nodeId("recovery", event.payload.recoveryId),
          kind: "note",
          data: {
            label: clampText(event.payload.message, 88),
            text: event.payload.message,
            summary: event.payload.strategy,
            tags: ["recovery"],
          },
          meta: {
            createdAt: timestamp,
            updatedAt: timestamp,
            status: "done",
            importance: "high",
            sourceRefs: [{ type: "derived", id: event.payload.recoveryId }],
          },
        } as CodexForgeBrainNode,
        timestamp
      );

      if (event.payload.failureId) {
        upsertEdge(graph, recoveryNode.id, nodeId("failure", event.payload.failureId), "derived_from", timestamp);
      }
      if (event.payload.taskId) {
        upsertEdge(graph, nodeId("task", event.payload.taskId), recoveryNode.id, "references", timestamp);
      }
      if (event.payload.executionId) {
        upsertEdge(graph, nodeId("run", event.payload.executionId), recoveryNode.id, "references", timestamp);
      }
      break;
    }
  }
}

export function reduceGraph(
  graphOrInput: CodexForgeBrainGraph | CodexForgeBrainGraphReductionInput,
  maybeEvents?: CodexForgeBrainRuntimeEvent[]
): CodexForgeBrainGraph {
  const input =
    "graph" in graphOrInput
      ? graphOrInput
      : {
          graph: graphOrInput,
          events: maybeEvents ?? [],
        };

  const next = cloneGraph(input.graph);
  const timestamp = input.now ?? now();

  for (const event of input.events) {
    reduceEvent(next, event, timestamp);
  }

  next.meta = {
    ...next.meta,
    updatedAt: Math.max(
      next.meta.updatedAt,
      ...input.events.map((event) => event.ts),
      timestamp
    ),
  };

  return next;
}
