import type { CodexForgeBrainGraph, CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainExecutionLineage,
  CodexForgeBrainExecutionLineageInput,
  CodexForgeBrainExecutionLineageRun,
} from "./runtime-types";

function getRunIdFromNode(node: CodexForgeBrainNode): string {
  return node.id.startsWith("run:") ? node.id.slice(4) : node.id;
}

function ensureRun(
  runs: Map<string, CodexForgeBrainExecutionLineageRun>,
  executionId: string
): CodexForgeBrainExecutionLineageRun {
  const existing = runs.get(executionId);
  if (existing) return existing;

  const run: CodexForgeBrainExecutionLineageRun = {
    executionId,
    taskIds: [],
    diffIds: [],
    snapshotIds: [],
    failureIds: [],
    recoveryIds: [],
    eventIds: [],
  };

  runs.set(executionId, run);
  return run;
}

function pushUnique(values: string[], value: string | undefined): void {
  if (!value || values.includes(value)) return;
  values.push(value);
}

function addGraphLineage(
  graph: CodexForgeBrainGraph,
  runs: Map<string, CodexForgeBrainExecutionLineageRun>,
  lineage: CodexForgeBrainExecutionLineage
): void {
  const nodeById = new Map(graph.nodes.map((node) => [node.id, node]));
  const runNodes = graph.nodes.filter((node) => node.kind === "run");

  for (const runNode of runNodes) {
    const run = ensureRun(runs, getRunIdFromNode(runNode));
    run.runNodeId = runNode.id;
    run.status = runNode.meta.status;
    run.startedAt = run.startedAt ?? runNode.meta.createdAt;
    run.completedAt = run.completedAt ?? runNode.meta.updatedAt;
  }

  for (const edge of graph.edges) {
    const from = nodeById.get(edge.from);
    const to = nodeById.get(edge.to);
    if (!from || !to) continue;

    if (from.kind === "task" && to.kind === "run") {
      const run = ensureRun(runs, getRunIdFromNode(to));
      pushUnique(run.taskIds, from.id);
      lineage.links.push({
        from: from.id,
        to: to.id,
        kind: "execution",
        relation: edge.kind,
        source: "graph",
      });
    }

    if (from.kind === "run" && to.kind === "diff") {
      const run = ensureRun(runs, getRunIdFromNode(from));
      pushUnique(run.diffIds, to.id);
      lineage.links.push({
        from: from.id,
        to: to.id,
        kind: "diff",
        relation: edge.kind,
        source: "graph",
      });
    }

    if (from.kind === "run" && to.kind === "snapshot") {
      const run = ensureRun(runs, getRunIdFromNode(from));
      pushUnique(run.snapshotIds, to.id);
      lineage.links.push({
        from: from.id,
        to: to.id,
        kind: "snapshot",
        relation: edge.kind,
        source: "graph",
      });
    }

    if (from.kind === "run" && to.kind === "note" && to.meta.status === "error") {
      const run = ensureRun(runs, getRunIdFromNode(from));
      pushUnique(run.failureIds, to.id);
      lineage.links.push({
        from: from.id,
        to: to.id,
        kind: "failure",
        relation: edge.kind,
        source: "graph",
      });
    }
  }
}

export function extractExecutionLineage(
  input: CodexForgeBrainExecutionLineageInput
): CodexForgeBrainExecutionLineage {
  const runs = new Map<string, CodexForgeBrainExecutionLineageRun>();
  const lineage: CodexForgeBrainExecutionLineage = {
    runs: [],
    links: [],
  };

  addGraphLineage(input.graph, runs, lineage);

  for (const event of input.events ?? []) {
    switch (event.type) {
      case "execution.started": {
        const run = ensureRun(runs, event.payload.executionId);
        run.runNodeId = event.payload.nodeId ?? `run:${event.payload.runId ?? event.payload.executionId}`;
        run.startedAt = event.payload.startedAt ?? event.ts;
        run.status = "active";
        pushUnique(run.taskIds, event.payload.taskId ? `task:${event.payload.taskId}` : undefined);
        pushUnique(run.eventIds, event.id);
        break;
      }
      case "execution.completed": {
        const run = ensureRun(runs, event.payload.executionId);
        run.runNodeId = event.payload.nodeId ?? `run:${event.payload.runId ?? event.payload.executionId}`;
        run.completedAt = event.payload.completedAt ?? event.ts;
        run.status = event.payload.status ?? "completed";
        pushUnique(run.taskIds, event.payload.taskId ? `task:${event.payload.taskId}` : undefined);
        for (const diffId of event.payload.diffIds ?? []) pushUnique(run.diffIds, `diff:${diffId}`);
        for (const snapshotId of event.payload.snapshotIds ?? []) pushUnique(run.snapshotIds, `snapshot:${snapshotId}`);
        pushUnique(run.eventIds, event.id);
        break;
      }
      case "diff.generated": {
        const executionId = event.payload.executionId ?? event.payload.runId;
        if (!executionId) break;
        const run = ensureRun(runs, executionId);
        pushUnique(run.diffIds, event.payload.nodeId ?? `diff:${event.payload.diffId}`);
        pushUnique(run.eventIds, event.id);
        lineage.links.push({
          from: `run:${executionId}`,
          to: event.payload.nodeId ?? `diff:${event.payload.diffId}`,
          kind: "diff",
          relation: event.type,
          source: "event",
        });
        break;
      }
      case "failure.detected": {
        if (!event.payload.executionId) break;
        const run = ensureRun(runs, event.payload.executionId);
        pushUnique(run.failureIds, event.payload.nodeId ?? `failure:${event.payload.failureId}`);
        pushUnique(run.eventIds, event.id);
        break;
      }
      case "recovery.detected": {
        if (!event.payload.executionId) break;
        const run = ensureRun(runs, event.payload.executionId);
        pushUnique(run.recoveryIds, event.payload.nodeId ?? `recovery:${event.payload.recoveryId}`);
        pushUnique(run.eventIds, event.id);
        break;
      }
      default:
        break;
    }
  }

  lineage.runs = [...runs.values()].sort((a, b) => {
    return (b.completedAt ?? b.startedAt ?? 0) - (a.completedAt ?? a.startedAt ?? 0);
  });

  return lineage;
}
