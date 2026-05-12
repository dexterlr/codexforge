import type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRankedMemory,
  CodexForgeBrainRuntimeEvent,
} from "../runtime-types";
import {
  calculateRelevanceScore,
  clampScore,
  rankContextSignals,
} from "./relevance-engine";
import {
  retrieveArchitecturalContext,
  type CodexForgeArchitecturalContext,
} from "./architectural-retrieval";
import {
  prioritizeContextRisks,
  type CodexForgePrioritizedRisk,
} from "./risk-prioritizer";
import { deriveTaskFocus, type CodexForgeTaskFocus } from "./task-focus";
import { inferSemanticRoute, type CodexForgeSemanticRoute } from "./semantic-routing";

export type CodexForgePredictiveContextSignal = {
  id: string;
  kind:
    | "intent"
    | "file"
    | "memory"
    | "task"
    | "execution"
    | "architecture"
    | "risk"
    | "blocker"
    | "next-action";
  label: string;
  score: number;
  confidence: number;
  timestamp: number;
  reasons: string[];
  source: "graph" | "event" | "memory" | "file" | "architecture" | "risk" | "task-focus";
  ref?: {
    id?: string;
    path?: string;
    eventId?: string;
    nodeId?: string;
  };
};

export type CodexForgePredictiveContextInput = {
  graph: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  memoryRankings?: readonly CodexForgeBrainRankedMemory[];
  fileIntelligence?: readonly {
    path: string;
    summary?: string;
    concepts?: readonly string[];
    riskLevel?: "low" | "medium" | "high" | "critical";
    updatedAt?: number;
  }[];
  activeFocus?: {
    text?: string;
    filePath?: string;
    taskId?: string;
    nodeIds?: readonly string[];
    eventId?: string;
  };
  now?: number;
  limit?: number;
};

export type CodexForgePredictiveContextResult = {
  generatedAt: number;
  predictedIntent: {
    route: CodexForgeSemanticRoute;
    label: string;
    confidence: number;
    reasons: string[];
  };
  signals: CodexForgePredictiveContextSignal[];
  relevantFiles: CodexForgePredictiveContextSignal[];
  relevantMemories: CodexForgePredictiveContextSignal[];
  relevantTasks: CodexForgePredictiveContextSignal[];
  relatedPriorExecutions: CodexForgePredictiveContextSignal[];
  architecturalConcepts: CodexForgeArchitecturalContext;
  risks: CodexForgePrioritizedRisk[];
  unresolvedBlockers: CodexForgePredictiveContextSignal[];
  likelyNextSafeActions: CodexForgePredictiveContextSignal[];
  taskFocus: CodexForgeTaskFocus;
  contextConfidence: number;
  explanation: string[];
};

function asRecord(node: CodexForgeBrainNode): Record<string, unknown> {
  return node.data as Record<string, unknown>;
}

function labelForNode(node: CodexForgeBrainNode): string {
  return String(asRecord(node).label ?? asRecord(node).summary ?? asRecord(node).goal ?? node.id);
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

function importanceValue(value: string | undefined): number {
  switch (value) {
    case "critical":
      return 1;
    case "high":
      return 0.78;
    case "medium":
      return 0.5;
    case "low":
      return 0.25;
    default:
      return 0.2;
  }
}

function latestTimestamp(input: CodexForgePredictiveContextInput): number {
  return Math.max(
    input.graph.meta.updatedAt ?? 0,
    ...Array.from(input.events ?? []).map((event) => event.ts),
    ...input.graph.nodes.map((node) => node.meta.updatedAt ?? node.meta.createdAt ?? 0)
  );
}

function makeSignal(args: CodexForgePredictiveContextSignal): CodexForgePredictiveContextSignal {
  return {
    ...args,
    score: clampScore(args.score),
    confidence: clampScore(args.confidence),
    reasons: [...new Set(args.reasons)].sort(),
  };
}

function signalFromNode(
  node: CodexForgeBrainNode,
  input: CodexForgePredictiveContextInput,
  kind: CodexForgePredictiveContextSignal["kind"]
): CodexForgePredictiveContextSignal {
  const path = pathForNode(node);
  const relevance = calculateRelevanceScore({
    id: node.id,
    label: labelForNode(node),
    text: [labelForNode(node), asRecord(node).summary, asRecord(node).description]
      .filter(Boolean)
      .join(" "),
    path,
    focusText: input.activeFocus?.text,
    focusPath: input.activeFocus?.filePath,
    nodeId: node.id,
    focusNodeIds: input.activeFocus?.nodeIds,
    graphEdges: input.graph.edges,
    timestamp: node.meta.updatedAt ?? node.meta.createdAt,
    now: input.now ?? latestTimestamp(input),
    importance: importanceValue(node.meta.importance),
    activeTaskId: input.activeFocus?.taskId,
    taskId: typeof asRecord(node).taskId === "string" ? String(asRecord(node).taskId) : node.kind === "task" ? node.id : undefined,
    events: input.events,
  });
  return makeSignal({
    id: `${kind}:${node.id}`,
    kind,
    label: labelForNode(node),
    score: relevance.score,
    confidence: relevance.confidence,
    timestamp: relevance.timestamp,
    reasons: relevance.reasons,
    source: "graph",
    ref: { nodeId: node.id, path },
  });
}

function signalsFromEvents(
  input: CodexForgePredictiveContextInput
): CodexForgePredictiveContextSignal[] {
  return (input.events ?? [])
    .map((event) => {
      if (event.type === "execution.started" || event.type === "execution.completed") {
        const label =
          event.type === "execution.started"
            ? event.payload.label ?? event.payload.executionId
            : event.payload.resultSummary ?? event.payload.status ?? event.payload.executionId;
        return makeSignal({
          id: `execution:${event.id}`,
          kind: "execution",
          label,
          score: event.type === "execution.completed" && event.payload.status === "failed" ? 0.82 : 0.62,
          confidence: 0.72,
          timestamp: event.ts,
          reasons: [`event:${event.type}`],
          source: "event",
          ref: { eventId: event.id, id: event.payload.executionId },
        });
      }
      if (event.type === "failure.detected") {
        return makeSignal({
          id: `blocker:${event.id}`,
          kind: "blocker",
          label: event.payload.message,
          score: event.payload.severity === "critical" ? 1 : 0.82,
          confidence: 0.82,
          timestamp: event.ts,
          reasons: [`failure:${event.payload.severity ?? "medium"}`],
          source: "event",
          ref: { eventId: event.id, id: event.payload.failureId },
        });
      }
      if (event.type === "diff.generated") {
        return makeSignal({
          id: `file-event:${event.id}`,
          kind: "file",
          label: event.payload.filePath,
          score: 0.7,
          confidence: 0.7,
          timestamp: event.ts,
          reasons: ["event:diff.generated"],
          source: "event",
          ref: { eventId: event.id, path: event.payload.filePath },
        });
      }
      return null;
    })
    .filter((signal): signal is CodexForgePredictiveContextSignal => Boolean(signal));
}

export function buildPredictiveContext(
  input: CodexForgePredictiveContextInput
): CodexForgePredictiveContextResult {
  const now = input.now ?? latestTimestamp(input);
  const route = inferSemanticRoute({
    text: input.activeFocus?.text,
    path: input.activeFocus?.filePath,
  });
  const taskFocus = deriveTaskFocus({
    graph: input.graph,
    events: input.events,
    memorySignals: input.memoryRankings,
    filePath: input.activeFocus?.filePath,
  });
  const architecture = retrieveArchitecturalContext({
    graph: input.graph,
    events: input.events,
    focusPath: input.activeFocus?.filePath,
    filePaths: input.fileIntelligence?.map((file) => file.path),
    concepts: input.fileIntelligence?.flatMap((file) => [...(file.concepts ?? [])]),
  });
  const risks = prioritizeContextRisks({
    graph: input.graph,
    events: input.events,
    contradictionCandidates: [],
    filePaths: [
      input.activeFocus?.filePath,
      ...(input.fileIntelligence ?? []).map((file) => file.path),
    ].filter((value): value is string => Boolean(value)),
    now,
  });
  const nodeSignals = input.graph.nodes.flatMap((node) => {
    if (node.kind === "task" || node.kind === "plan") return [signalFromNode(node, input, "task")];
    if (node.kind === "memory" || node.kind === "decision" || node.kind === "note") return [signalFromNode(node, input, "memory")];
    if (node.kind === "diff" || pathForNode(node)) return [signalFromNode(node, input, "file")];
    if (node.kind === "run") return [signalFromNode(node, input, "execution")];
    return [];
  });
  const memorySignals = (input.memoryRankings ?? []).map((memory) =>
    makeSignal({
      id: `memory-ranking:${memory.node.id}`,
      kind: "memory",
      label: labelForNode(memory.node),
      score: clampScore(memory.score / 180),
      confidence: clampScore(0.45 + memory.reasons.length * 0.08),
      timestamp: memory.updatedAt,
      reasons: memory.reasons,
      source: "memory",
      ref: { nodeId: memory.node.id, path: pathForNode(memory.node) },
    })
  );
  const fileSignals = (input.fileIntelligence ?? []).map((file) => {
    const relevance = calculateRelevanceScore({
      id: file.path,
      label: file.path,
      text: [file.path, file.summary, ...(file.concepts ?? [])].filter(Boolean).join(" "),
      path: file.path,
      focusText: input.activeFocus?.text,
      focusPath: input.activeFocus?.filePath,
      timestamp: file.updatedAt,
      now,
      riskSeverity: file.riskLevel,
    });
    return makeSignal({
      id: `file:${file.path}`,
      kind: "file",
      label: file.path,
      score: relevance.score,
      confidence: relevance.confidence,
      timestamp: relevance.timestamp,
      reasons: relevance.reasons,
      source: "file",
      ref: { path: file.path },
    });
  });
  const nextActionSignals = [
    makeSignal({
      id: "next-action:task-focus",
      kind: "next-action",
      label: taskFocus.nextSafeAction,
      score: taskFocus.confidence,
      confidence: taskFocus.confidence,
      timestamp: now,
      reasons: taskFocus.reasons,
      source: "task-focus",
    }),
  ];
  const architectureSignal = makeSignal({
    id: `architecture:${architecture.subsystem}`,
    kind: "architecture",
    label: `${architecture.subsystem} subsystem`,
    score: architecture.confidence,
    confidence: architecture.confidence,
    timestamp: now,
    reasons: architecture.reasons,
    source: "architecture",
  });
  const riskSignals = risks.map((item) =>
    makeSignal({
      id: `risk:${item.id}`,
      kind: "risk",
      label: item.label,
      score: item.score,
      confidence: item.confidence,
      timestamp: item.timestamp,
      reasons: item.reasons,
      source: "risk",
      ref: { id: item.id },
    })
  );
  const signals = rankContextSignals(
    [
      ...nodeSignals,
      ...signalsFromEvents(input),
      ...memorySignals,
      ...fileSignals,
      ...nextActionSignals,
      architectureSignal,
      ...riskSignals,
    ],
    input.limit ?? 40
  );
  const contextConfidence = clampScore(
    (route.confidence + taskFocus.confidence + architecture.confidence) / 3
  );

  return {
    generatedAt: now,
    predictedIntent: {
      route: route.route,
      label: `Prepare ${route.route} context`,
      confidence: route.confidence,
      reasons: route.reasons,
    },
    signals,
    relevantFiles: signals.filter((signal) => signal.kind === "file").slice(0, 8),
    relevantMemories: signals.filter((signal) => signal.kind === "memory").slice(0, 8),
    relevantTasks: signals.filter((signal) => signal.kind === "task").slice(0, 8),
    relatedPriorExecutions: signals.filter((signal) => signal.kind === "execution").slice(0, 6),
    architecturalConcepts: architecture,
    risks,
    unresolvedBlockers: signals.filter((signal) => signal.kind === "blocker").slice(0, 6),
    likelyNextSafeActions: signals.filter((signal) => signal.kind === "next-action").slice(0, 4),
    taskFocus,
    contextConfidence,
    explanation: [
      `route:${route.route}`,
      `signals:${signals.length}`,
      `risks:${risks.length}`,
      `architecture:${architecture.subsystem}`,
    ],
  };
}

export function summarizePredictiveContext(
  result: CodexForgePredictiveContextResult
): string {
  return `Predictive context ${result.predictedIntent.route} confidence ${result.contextConfidence.toFixed(2)} with ${result.signals.length} signals, ${result.relevantFiles.length} files, ${result.relevantMemories.length} memories, ${result.risks.length} risks.`;
}
