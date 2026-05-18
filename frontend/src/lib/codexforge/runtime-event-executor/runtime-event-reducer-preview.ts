import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import { reduceGraph } from "@/lib/codexforge/brain/runtime/graph-reducer";
import type { CodexForgeBrainRuntimeEventInput } from "@/lib/codexforge/brain/runtime/runtime-types";
import {
  buildRuntimeEventExecutorStableKey,
  deriveRuntimeEventTimestamp,
  type RuntimeEventPayloadValidation,
  type RuntimeEventReducerPreview,
  type RuntimeEventReducerPreviewInput,
  type RuntimeEventRequest,
} from "./runtime-event-executor-types";
import { validateRuntimeEventPayload } from "./runtime-event-validation";

function toEventInput(request: RuntimeEventRequest, validation?: RuntimeEventPayloadValidation): CodexForgeBrainRuntimeEventInput | null {
  const payloadValidation = validation ?? validateRuntimeEventPayload(request.requestedEventType, request.requestedPayload);
  if (request.requestedEventType !== "memory.promoted" || !payloadValidation.normalizedPayload) return null;
  return {
    id: buildRuntimeEventExecutorStableKey("event", request.requestedEventType, request.id),
    type: "memory.promoted",
    ts: deriveRuntimeEventTimestamp(request.id),
    actor: "runtime",
    source: { type: "manual", id: request.sourceGateId, label: request.sourceSurface },
    payload: payloadValidation.normalizedPayload,
    metadata: {
      requestId: request.id,
      executorBoundary: "guarded runtime event executor boundary",
    },
  };
}

export function buildRuntimeEventReducerPreview(input: RuntimeEventReducerPreviewInput): RuntimeEventReducerPreview {
  return previewRuntimeEventGraphReduction(input.graph, input.request, input.validation);
}

export function previewRuntimeEventGraphReduction(
  graph: CodexForgeBrainGraph,
  request: RuntimeEventRequest,
  validation?: RuntimeEventPayloadValidation
): RuntimeEventReducerPreview {
  const warnings: string[] = [];
  const eventInput = toEventInput(request, validation);
  if (!eventInput) warnings.push("Reducer preview requires a valid memory.promoted payload.");

  const before = { nodeCount: graph.nodes.length, edgeCount: graph.edges.length };
  const afterGraph = eventInput
    ? reduceGraph({ graph, events: [eventInput as never], now: eventInput.ts })
    : graph;
  const after = { nodeCount: afterGraph.nodes.length, edgeCount: afterGraph.edges.length };
  const payload = validation?.normalizedPayload;
  const preview: RuntimeEventReducerPreview = {
    id: buildRuntimeEventExecutorStableKey("runtime-event-reducer-preview", request.id),
    requestId: request.id,
    ready: Boolean(eventInput),
    graphBefore: before,
    graphAfter: after,
    expectedNodeChanges: after.nodeCount - before.nodeCount,
    expectedEdgeChanges: after.edgeCount - before.edgeCount,
    impactedMemoryAreas: payload ? [payload.memoryId, payload.memoryType] : [],
    impactedTaskAreas: payload?.taskId ? [payload.taskId] : [],
    impactedConceptAreas: [],
    warnings,
    summary: [],
  };
  return { ...preview, summary: summarizeRuntimeEventReducerPreview(preview) };
}

export function summarizeRuntimeEventReducerPreview(preview: RuntimeEventReducerPreview): string[] {
  return [
    preview.ready ? "Reducer preview is ready and leaves the original graph untouched." : `Reducer preview blocked: ${preview.warnings.join(", ")}.`,
    `Expected node changes: ${preview.expectedNodeChanges}; expected edge changes: ${preview.expectedEdgeChanges}.`,
    "Preview imports canonical graph types and does not import brain-graph.",
  ];
}
