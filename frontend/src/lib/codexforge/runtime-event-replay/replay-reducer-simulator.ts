import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { reduceGraph } from "@/lib/codexforge/brain/runtime/graph-reducer";
import type { CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime/runtime-types";
import { cloneRuntimeReplayGraph } from "./replay-snapshot-model";
import type {
  RuntimeEventReplayInput,
  RuntimeEventReplayInputValidation,
  RuntimeEventReplayStatus,
  RuntimeReplayEventSequence,
  RuntimeReplayEventSequenceItem,
  RuntimeReplayGraphSummary,
  RuntimeReplaySimulation,
  RuntimeReplaySimulationStep,
} from "./runtime-event-replay-types";
import {
  buildRuntimeEventReplayStableKey,
  isRuntimeEventReplayKnownEventType,
  summarizeRuntimeReplayGraph,
} from "./runtime-event-replay-types";
import type { RuntimeReplaySnapshot } from "./runtime-event-replay-types";

export type RuntimeReplaySimulationStepResult = {
  step: RuntimeReplaySimulationStep;
  graph: CodexForgeBrainGraph;
};

function deterministicReducerTimestamp(item: RuntimeReplayEventSequenceItem, graph: CodexForgeBrainGraph): number {
  const eventTimestamp = item.event?.ts;
  if (typeof eventTimestamp === "number" && Number.isFinite(eventTimestamp) && eventTimestamp > 0) {
    return eventTimestamp;
  }
  if (typeof graph.meta.updatedAt === "number" && Number.isFinite(graph.meta.updatedAt) && graph.meta.updatedAt > 0) {
    return graph.meta.updatedAt;
  }
  return 1;
}

function asKnownRuntimeEvent(item: RuntimeReplayEventSequenceItem): CodexForgeBrainRuntimeEvent | null {
  if (!item.event) return null;
  if (!isRuntimeEventReplayKnownEventType(item.eventType)) return null;
  if (item.validationState === "blocked" || item.validationState === "invalid") return null;
  return {
    ...item.event,
    ts: item.event.ts ?? 1,
    type: item.eventType,
    payload: item.event.payload ?? {},
  } as CodexForgeBrainRuntimeEvent;
}

function buildBlockedStep(args: {
  graph: CodexForgeBrainGraph;
  item: RuntimeReplayEventSequenceItem;
  errors?: string[];
}): RuntimeReplaySimulationStepResult {
  const summary = summarizeRuntimeReplayGraph(args.graph);
  const step: RuntimeReplaySimulationStep = {
    id: buildRuntimeEventReplayStableKey("runtime-replay-step", args.item.sequenceId, "blocked"),
    sequenceId: args.item.sequenceId,
    eventId: args.item.eventId,
    eventType: args.item.eventType,
    status: "blocked",
    replayOrder: args.item.replayOrder,
    expectedReducerArea: args.item.expectedReducerArea,
    before: summary,
    after: summary,
    nodeDelta: 0,
    edgeDelta: 0,
    warnings: args.item.warnings,
    errors: args.errors ?? ["Event did not pass replay validation or policy."],
  };
  return { step, graph: cloneRuntimeReplayGraph(args.graph) };
}

export function simulateRuntimeEventReplayStep(args: {
  graph: CodexForgeBrainGraph;
  item: RuntimeReplayEventSequenceItem;
}): RuntimeReplaySimulationStepResult {
  const originalGraph = cloneRuntimeReplayGraph(args.graph);
  const before = summarizeRuntimeReplayGraph(originalGraph);
  const event = asKnownRuntimeEvent(args.item);

  if (!args.item.allowedByPolicy || !event) {
    return buildBlockedStep({
      graph: originalGraph,
      item: args.item,
      errors: !isRuntimeEventReplayKnownEventType(args.item.eventType)
        ? ["Unknown event type has no reducer preview."]
        : undefined,
    });
  }

  try {
    const reduced = reduceGraph({
      graph: cloneRuntimeReplayGraph(originalGraph),
      events: [event],
      now: deterministicReducerTimestamp(args.item, originalGraph),
    });
    const afterGraph = cloneRuntimeReplayGraph(reduced);
    const after = summarizeRuntimeReplayGraph(afterGraph);
    const step: RuntimeReplaySimulationStep = {
      id: buildRuntimeEventReplayStableKey("runtime-replay-step", args.item.sequenceId, "simulated"),
      sequenceId: args.item.sequenceId,
      eventId: args.item.eventId,
      eventType: args.item.eventType,
      status: "simulated",
      replayOrder: args.item.replayOrder,
      expectedReducerArea: args.item.expectedReducerArea,
      before,
      after,
      nodeDelta: after.nodeCount - before.nodeCount,
      edgeDelta: after.edgeCount - before.edgeCount,
      warnings: args.item.warnings,
      errors: [],
    };
    return { step, graph: afterGraph };
  } catch (error) {
    const after = summarizeRuntimeReplayGraph(originalGraph);
    const step: RuntimeReplaySimulationStep = {
      id: buildRuntimeEventReplayStableKey("runtime-replay-step", args.item.sequenceId, "error"),
      sequenceId: args.item.sequenceId,
      eventId: args.item.eventId,
      eventType: args.item.eventType,
      status: "error",
      replayOrder: args.item.replayOrder,
      expectedReducerArea: args.item.expectedReducerArea,
      before,
      after,
      nodeDelta: 0,
      edgeDelta: 0,
      warnings: args.item.warnings,
      errors: [error instanceof Error ? error.message : "Reducer preview failed."],
    };
    return { step, graph: originalGraph };
  }
}

function selectSimulationStatus(args: {
  hasSnapshot: boolean;
  inputValidation?: RuntimeEventReplayInputValidation | null;
  sequence: RuntimeReplayEventSequence;
  steps: readonly RuntimeReplaySimulationStep[];
  warnings: readonly string[];
  errors: readonly string[];
}): RuntimeEventReplayStatus {
  if (!args.hasSnapshot) return "no-snapshot";
  if (args.inputValidation && !args.inputValidation.valid) return "invalid-input";
  if (args.sequence.eventCount === 0) return "no-events";
  if (args.steps.every((step) => step.status === "blocked")) return "blocked";
  if (args.errors.length > 0 || args.steps.some((step) => step.status === "error")) return "partial";
  if (args.warnings.length > 0 || args.steps.some((step) => step.warnings.length > 0)) return "reducer-warning";
  return "simulation-complete";
}

export function simulateRuntimeEventReplay(args: {
  replayInput: RuntimeEventReplayInput;
  inputValidation?: RuntimeEventReplayInputValidation | null;
  snapshot?: RuntimeReplaySnapshot | null;
  sequence: RuntimeReplayEventSequence;
}): RuntimeReplaySimulation {
  if (!args.snapshot) {
    const empty: RuntimeReplayGraphSummary = { nodeCount: 0, edgeCount: 0, nodeKindCounts: {}, edgeKindCounts: {} };
    const simulation: RuntimeReplaySimulation = {
      id: buildRuntimeEventReplayStableKey("runtime-replay-simulation", args.replayInput.id, "no-snapshot"),
      status: "no-snapshot",
      replayInputId: args.replayInput.id,
      snapshotId: "missing",
      before: empty,
      after: empty,
      steps: [],
      blockedEventIds: [],
      skippedEventIds: args.sequence.items.map((item) => item.eventId),
      warnings: ["No graph snapshot was supplied to the reducer simulator."],
      errors: [],
      simulatedGraph: null,
      summary: [],
    };
    return { ...simulation, summary: summarizeRuntimeEventReplaySimulation(simulation) };
  }

  let currentGraph = cloneRuntimeReplayGraph(args.snapshot.graph);
  const before = summarizeRuntimeReplayGraph(currentGraph);
  const warnings = [...args.snapshot.integrityNotes.filter((note) => note.toLowerCase().includes("warning"))];
  const errors: string[] = [];
  const steps: RuntimeReplaySimulationStep[] = [];

  for (const item of args.sequence.items) {
    const result = simulateRuntimeEventReplayStep({ graph: currentGraph, item });
    steps.push(result.step);
    currentGraph = result.graph;
    warnings.push(...result.step.warnings);
    errors.push(...result.step.errors);
  }

  const blockedEventIds = steps.filter((step) => step.status === "blocked").map((step) => step.eventId);
  const skippedEventIds = steps.filter((step) => step.status === "skipped").map((step) => step.eventId);
  const simulation: RuntimeReplaySimulation = {
    id: buildRuntimeEventReplayStableKey("runtime-replay-simulation", args.replayInput.id, args.snapshot.id),
    status: selectSimulationStatus({
      hasSnapshot: true,
      inputValidation: args.inputValidation,
      sequence: args.sequence,
      steps,
      warnings,
      errors,
    }),
    replayInputId: args.replayInput.id,
    snapshotId: args.snapshot.id,
    before,
    after: summarizeRuntimeReplayGraph(currentGraph),
    steps,
    blockedEventIds,
    skippedEventIds,
    warnings: Array.from(new Set(warnings)).sort(),
    errors: Array.from(new Set(errors)).sort(),
    simulatedGraph: cloneRuntimeReplayGraph(currentGraph),
    summary: [],
  };

  return { ...simulation, summary: summarizeRuntimeEventReplaySimulation(simulation) };
}

export function summarizeRuntimeEventReplaySimulation(simulation: RuntimeReplaySimulation): string[] {
  return [
    `Replay simulation status: ${simulation.status}.`,
    `${simulation.steps.filter((step) => step.status === "simulated").length} event(s) simulated; ${simulation.blockedEventIds.length} blocked.`,
    `Node delta ${simulation.after.nodeCount - simulation.before.nodeCount}; edge delta ${simulation.after.edgeCount - simulation.before.edgeCount}.`,
    `${simulation.warnings.length} warning(s) and ${simulation.errors.length} error(s) recorded.`,
    "Simulator uses reduceGraph on cloned graph data only and never calls appendEvent.",
  ];
}
