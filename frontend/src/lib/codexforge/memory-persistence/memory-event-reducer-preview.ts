import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainGraph,
} from "@/lib/codexforge/brain/graph/types";
import { reduceGraph, type CodexForgeBrainRuntimeEvent } from "@/lib/codexforge/brain/runtime";
import { validateMemoryEventContent } from "./memory-event-validation";
import {
  buildMemoryEventStableKey,
  type MemoryEventPersistenceRequest,
  type MemoryGraphReductionPreview,
  type MemoryGraphReductionPreviewInput,
} from "./memory-persistence-types";

const DETERMINISTIC_PREVIEW_TS = 1;

export function buildMemoryGraphReductionPreview(
  input: MemoryGraphReductionPreviewInput
): MemoryGraphReductionPreview {
  const validation = input.validation ?? validateMemoryEventContent(input.request);
  const warnings = validation.issues.map((issue) => `Validation issue: ${issue}`);
  const event = validation.state === "valid" ? buildRuntimeEvent(input.request) : null;
  const reduced = event
    ? reduceGraph({ graph: input.graph, events: [event], now: DETERMINISTIC_PREVIEW_TS })
    : cloneGraphCounts(input.graph);
  const addedNodeCount = Math.max(0, reduced.nodes.length - input.graph.nodes.length);
  const memoryId = buildMemoryEventStableKey("memory", input.request.candidateId);
  const updatedNodeCount = event ? countUpdatedMemoryNodes(input.graph, reduced, memoryId) : 0;

  const preview: MemoryGraphReductionPreview = {
    id: buildMemoryEventStableKey("memory-graph-reduction-preview", input.request.eventId),
    eventId: input.request.eventId,
    ready: validation.state === "valid",
    inputNodeCount: input.graph.nodes.length,
    inputEdgeCount: input.graph.edges.length,
    outputNodeCount: reduced.nodes.length,
    outputEdgeCount: reduced.edges.length,
    addedNodeCount,
    updatedNodeCount,
    linkedSourceRefs: input.request.sourceRefs,
    warnings,
    nextAction: selectMemoryGraphReductionNextAction(validation.state === "valid", input.request),
    event,
    summary: [],
  };

  return { ...preview, summary: summarizeMemoryGraphReductionPreview(preview) };
}

export function summarizeMemoryGraphReductionPreview(
  preview: MemoryGraphReductionPreview
): string[] {
  return [
    preview.ready
      ? "Graph reduction preview is ready from approved memory.promoted event."
      : "Graph reduction preview is blocked until validation passes.",
    `Preview would add ${preview.addedNodeCount} node(s) and update ${preview.updatedNodeCount} node(s).`,
    `${preview.linkedSourceRefs.length} source ref(s) remain linked for traceability.`,
    "No graph is persisted automatically.",
    `Next action: ${preview.nextAction}.`,
  ];
}

export function selectMemoryGraphReductionNextAction(
  readyOrPreview: boolean | MemoryGraphReductionPreview,
  request?: MemoryEventPersistenceRequest
): MemoryGraphReductionPreview["nextAction"] {
  const ready = typeof readyOrPreview === "boolean" ? readyOrPreview : readyOrPreview.ready;
  if (!ready) return "review-validation";
  if (request && !request.approved) return "approve-event";
  return "persist-event";
}

function buildRuntimeEvent(request: MemoryEventPersistenceRequest): CodexForgeBrainRuntimeEvent {
  return {
    id: request.eventId,
    type: "memory.promoted",
    ts: DETERMINISTIC_PREVIEW_TS,
    actor: "runtime",
    source: {
      type: "memory-review",
      id: request.reviewId,
      label: request.candidateId,
    },
    payload: {
      memoryId: buildMemoryEventStableKey("memory", request.candidateId),
      content: request.content,
      memoryType: "note",
      importance: request.importance,
      sourceNodeIds: request.sourceRefs.map((ref) => buildMemoryEventStableKey(ref.type, ref.id)),
    },
    metadata: {
      confidence: request.confidence,
      contradictionRisk: request.contradictionRisk,
      safetyNote: request.safetyNote,
    },
  };
}

function cloneGraphCounts(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: graph.nodes,
    edges: graph.edges,
    meta: graph.meta,
  };
}

function countUpdatedMemoryNodes(
  before: CodexForgeBrainGraph,
  after: CodexForgeBrainGraph,
  memoryId: string
): number {
  const nodeId = `memory:${memoryId}`;
  const existed = before.nodes.some((node) => node.id === nodeId);
  const existsAfter = after.nodes.some((node) => node.id === nodeId);
  return existed && existsAfter ? 1 : 0;
}
