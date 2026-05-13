import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRuntimeContext,
  CodexForgeBrainRuntimeEvent,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import type { CodexForgePredictiveContextResult } from "@/lib/codexforge/brain/runtime/context";
import type {
  CodexForgeCognitiveMemoryScore,
  CodexForgeMemoryClusterSummary,
} from "@/lib/codexforge/brain/runtime/memory";
import type {
  CodexForgeAgentRuntimeContext,
  CodexForgeAgentRuntimeContextSignal,
  CodexForgeAgentRuntimeTask,
} from "./agent-types";

function clampScore(value: number): number {
  return Math.max(0, Math.min(1, Number(value.toFixed(4))));
}

function rankSignals(
  signals: readonly CodexForgeAgentRuntimeContextSignal[],
  limit = 24
): CodexForgeAgentRuntimeContextSignal[] {
  return [...signals]
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.confidence - a.confidence ||
        a.kind.localeCompare(b.kind) ||
        a.id.localeCompare(b.id)
    )
    .slice(0, limit);
}

function graphSignal(graph: CodexForgeBrainGraph | undefined): CodexForgeAgentRuntimeContextSignal[] {
  if (!graph) return [];
  return [
    {
      id: "graph:summary",
      kind: "graph",
      label: `${graph.nodes.length} nodes, ${graph.edges.length} edges`,
      score: graph.nodes.length > 0 ? 0.62 : 0.2,
      confidence: 0.76,
      reasons: ["canonical-graph-summary"],
    },
  ];
}

function eventRiskSignals(
  events: readonly CodexForgeBrainRuntimeEvent[] | undefined
): CodexForgeAgentRuntimeContextSignal[] {
  return (events ?? [])
    .filter((event) => event.type === "failure.detected" || event.type === "recovery.detected")
    .map((event) => ({
      id: `event:${event.id}`,
      kind: event.type === "failure.detected" ? "risk" : "runtime-context",
      label:
        event.type === "failure.detected"
          ? event.payload.message
          : event.payload.message,
      score: event.type === "failure.detected" ? 0.86 : 0.58,
      confidence: 0.78,
      reasons: [`brain-event:${event.type}`],
    }));
}

export function selectAgentContextSignals(input: {
  readonly task: CodexForgeAgentRuntimeTask;
  readonly runtimeContext?: CodexForgeBrainRuntimeContext;
  readonly cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  readonly memoryClusters?: readonly CodexForgeMemoryClusterSummary[];
  readonly predictiveContext?: CodexForgePredictiveContextResult;
  readonly graph?: CodexForgeBrainGraph;
  readonly events?: readonly CodexForgeBrainRuntimeEvent[];
}): readonly CodexForgeAgentRuntimeContextSignal[] {
  const runtimeSignals: CodexForgeAgentRuntimeContextSignal[] = input.runtimeContext
    ? [
        {
          id: "runtime-context:summary",
          kind: "runtime-context",
          label: `${input.runtimeContext.summary.selectedNodeCount} selected nodes, ${input.runtimeContext.summary.selectedEventCount} selected events`,
          score: 0.72,
          confidence: 0.82,
          reasons: ["brain-runtime-context"],
        },
        ...input.runtimeContext.failures.map((failure, index) => ({
          id: `runtime-context:failure:${index}`,
          kind: "risk" as const,
          label: failure,
          score: 0.8,
          confidence: 0.76,
          reasons: ["runtime-context-failure"],
        })),
      ]
    : [];

  const memorySignals: CodexForgeAgentRuntimeContextSignal[] = [
    ...(input.cognitiveMemory ?? []).slice(0, 8).map((memory, index) => ({
      id: `memory:${index}`,
      kind: "memory" as const,
      label: String(memory.node.data.label ?? memory.node.id),
      score: clampScore(memory.score),
      confidence: clampScore(memory.confidence),
      reasons: ["cognitive-memory-score"],
    })),
    ...(input.memoryClusters ?? []).slice(0, 6).map((cluster) => ({
      id: `memory-cluster:${cluster.clusterId}`,
      kind: "memory" as const,
      label: cluster.label,
      score: clampScore(0.35 + Math.min(6, cluster.itemCount) * 0.08),
      confidence: 0.7,
      reasons: ["memory-cluster-summary"],
    })),
  ];

  const predictiveSignals: CodexForgeAgentRuntimeContextSignal[] = input.predictiveContext
    ? [
        {
          id: "predictive-context:intent",
          kind: "predictive-context",
          label: input.predictiveContext.predictedIntent.label,
          score: input.predictiveContext.contextConfidence,
          confidence: input.predictiveContext.predictedIntent.confidence,
          reasons: input.predictiveContext.predictedIntent.reasons,
        },
        ...input.predictiveContext.risks.slice(0, 6).map((risk) => ({
          id: `predictive-risk:${risk.id}`,
          kind: "risk" as const,
          label: risk.label,
          score: risk.score,
          confidence: risk.confidence,
          reasons: risk.reasons,
        })),
        {
          id: "task-focus:next-safe-action",
          kind: "task-focus",
          label: input.predictiveContext.taskFocus.nextSafeAction,
          score: input.predictiveContext.taskFocus.confidence,
          confidence: input.predictiveContext.taskFocus.confidence,
          reasons: input.predictiveContext.taskFocus.reasons,
        },
      ]
    : [];

  return rankSignals([
    {
      id: `task:${input.task.id}`,
      kind: "task-focus",
      label: input.task.goal,
      score: input.task.risk === "high" || input.task.risk === "critical" ? 0.9 : 0.65,
      confidence: input.task.confidence,
      reasons: input.task.reasons,
    },
    ...runtimeSignals,
    ...memorySignals,
    ...predictiveSignals,
    ...graphSignal(input.graph),
    ...eventRiskSignals(input.events),
  ]);
}

export function summarizeAgentRuntimeContext(
  context: CodexForgeAgentRuntimeContext
): string {
  return `${context.signals.length} agent context signals, ${context.topRisks.length} risks, ${context.memoryHints.length} memory hints.`;
}

export function buildAgentRuntimeContext(input: {
  readonly task: CodexForgeAgentRuntimeTask;
  readonly runtimeContext?: CodexForgeBrainRuntimeContext;
  readonly cognitiveMemory?: readonly CodexForgeCognitiveMemoryScore[];
  readonly memoryClusters?: readonly CodexForgeMemoryClusterSummary[];
  readonly predictiveContext?: CodexForgePredictiveContextResult;
  readonly graph?: CodexForgeBrainGraph;
  readonly events?: readonly CodexForgeBrainRuntimeEvent[];
  readonly now?: number;
}): CodexForgeAgentRuntimeContext {
  const signals = selectAgentContextSignals(input);
  const topRisks = signals
    .filter((signal) => signal.kind === "risk")
    .map((signal) => signal.label)
    .slice(0, 8);
  const memoryHints = signals
    .filter((signal) => signal.kind === "memory")
    .map((signal) => signal.label)
    .slice(0, 8);
  const taskFocus = signals
    .filter((signal) => signal.kind === "task-focus")
    .map((signal) => signal.label)
    .slice(0, 6);
  const context: CodexForgeAgentRuntimeContext = {
    generatedAt: input.now ?? input.runtimeContext?.generatedAt ?? 0,
    summary: `Agent context for ${input.task.domain} ${input.task.requestedAction}.`,
    signals,
    topRisks,
    memoryHints,
    taskFocus,
    graphSummary: input.graph
      ? {
          nodeCount: input.graph.nodes.length,
          edgeCount: input.graph.edges.length,
          eventCount: input.events?.length ?? 0,
        }
      : input.runtimeContext
        ? {
            nodeCount: input.runtimeContext.summary.nodeCount,
            edgeCount: input.runtimeContext.summary.edgeCount,
            eventCount: input.runtimeContext.summary.eventCount,
          }
        : undefined,
    reasons: [
      "deterministic-signal-ranking",
      input.predictiveContext ? "predictive-context-aware" : "",
      input.cognitiveMemory?.length ? "cognitive-memory-aware" : "",
      input.graph ? "canonical-graph-summary" : "",
    ].filter(Boolean).sort(),
  };
  return { ...context, summary: summarizeAgentRuntimeContext(context) };
}
