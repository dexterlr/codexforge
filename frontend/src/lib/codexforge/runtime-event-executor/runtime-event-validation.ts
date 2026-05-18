import type { CodexForgeBrainMemoryPromotedPayload } from "@/lib/codexforge/brain/runtime/runtime-types";
import {
  buildRuntimeEventExecutorStableKey,
  type RuntimeEventPayloadValidation,
} from "./runtime-event-executor-types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function bounded(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1;
}

function toMemoryType(value: unknown): CodexForgeBrainMemoryPromotedPayload["memoryType"] {
  if (value === "fact" || value === "decision" || value === "task" || value === "note") return value;
  return "note";
}

function toImportance(value: unknown): CodexForgeBrainMemoryPromotedPayload["importance"] {
  if (value === "low" || value === "medium" || value === "high" || value === "critical") return value;
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.min(1, value));
  return "medium";
}

function cleanStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean))).sort();
}

export function validateMemoryPromotedPayload(payload: unknown): RuntimeEventPayloadValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!isRecord(payload)) {
    return {
      id: "runtime-event-validation:memory-promoted:invalid",
      eventType: "memory.promoted",
      valid: false,
      blockedReasons: ["payload object required"],
      warnings,
      summary: ["memory.promoted payload validation failed: payload object required."],
    };
  }

  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  const memoryId = typeof payload.memoryId === "string" ? payload.memoryId.trim() : "";
  const evidenceRefs = cleanStringList(payload.evidenceRefs ?? payload.sourceRefs ?? payload.sourceIds);
  const sourceNodeIds = cleanStringList(payload.sourceNodeIds);
  const tags = cleanStringList(payload.tags);
  const confidence = payload.confidence;

  if (!content) blockedReasons.push("memory.promoted payload has memory text");
  if (!memoryId) warnings.push("memory id will be derived by request digest if absent");
  if (evidenceRefs.length === 0 && sourceNodeIds.length === 0) blockedReasons.push("memory.promoted payload has source refs/evidence refs");
  if (confidence !== undefined && !bounded(confidence)) blockedReasons.push("confidence is bounded");
  if (payload.importance !== undefined && typeof payload.importance === "number" && !bounded(payload.importance)) {
    blockedReasons.push("importance is bounded or mapped");
  }
  if (Array.isArray(payload.tags) && tags.length !== payload.tags.length) warnings.push("tags are deterministic strings after normalization");

  const normalizedPayload: CodexForgeBrainMemoryPromotedPayload = {
    memoryId: memoryId || buildRuntimeEventExecutorStableKey("memory", content.slice(0, 80)),
    content,
    memoryType: toMemoryType(payload.memoryType),
    importance: toImportance(payload.importance),
    pinned: payload.pinned === true,
    taskId: typeof payload.taskId === "string" && payload.taskId.trim() ? payload.taskId.trim() : undefined,
    sourceNodeIds,
    nodeId: typeof payload.nodeId === "string" && payload.nodeId.trim() ? payload.nodeId.trim() : undefined,
  };

  return {
    id: buildRuntimeEventExecutorStableKey("runtime-event-validation", "memory.promoted", normalizedPayload.memoryId),
    eventType: "memory.promoted",
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    normalizedPayload,
    summary: summarizeRuntimeEventValidation({
      id: "",
      eventType: "memory.promoted",
      valid: blockedReasons.length === 0,
      blockedReasons,
      warnings,
      normalizedPayload,
      summary: [],
    }),
  };
}

export function validateRuntimeEventPayload(eventType: string, payload: unknown): RuntimeEventPayloadValidation {
  if (!eventType) {
    return {
      id: "runtime-event-validation:missing-event-type",
      eventType: "missing",
      valid: false,
      blockedReasons: ["event type present"],
      warnings: [],
      summary: ["Runtime event payload validation failed: event type present."],
    };
  }
  if (eventType === "memory.promoted") return validateMemoryPromotedPayload(payload);
  return {
    id: buildRuntimeEventExecutorStableKey("runtime-event-validation", eventType),
    eventType,
    valid: false,
    blockedReasons: ["unknown event type blocked"],
    warnings: ["Future event type requires explicit policy support before execution."],
    summary: [`${eventType} is blocked until runtime event validation supports it.`],
  };
}

export function summarizeRuntimeEventValidation(validation: RuntimeEventPayloadValidation): string[] {
  return [
    validation.valid ? `${validation.eventType} payload validation passed.` : `${validation.eventType} payload validation failed: ${validation.blockedReasons.join(", ")}.`,
    "Validation uses canonical runtime payloads, no unknown graph schema import, and no legacy brain-graph usage.",
  ];
}
