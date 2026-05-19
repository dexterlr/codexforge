import type { ContinuityHandoffInput, ContinuityHandoffMemoryItem, ContinuityHandoffMemoryPosture } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey, readContinuityHandoffCount } from "./continuity-handoff-types";

export function buildContinuityHandoffMemoryItem(input: {
  label: string;
  posture: ContinuityHandoffMemoryItem["posture"];
  detail: string;
  reviewBoundary: string;
}): ContinuityHandoffMemoryItem {
  return {
    id: buildContinuityHandoffStableKey("handoff-memory-item", input.label),
    label: input.label,
    posture: input.posture,
    detail: input.detail,
    reviewBoundary: input.reviewBoundary,
  };
}

export function buildContinuityHandoffMemoryPosture(input: ContinuityHandoffInput = {}): ContinuityHandoffMemoryPosture {
  const pendingMemoryCandidates = readContinuityHandoffCount(input.pendingMemoryCandidates, 0);
  const approvedMemoryEvents = readContinuityHandoffCount(input.approvedMemoryEvents, 0);
  const items = [
    buildContinuityHandoffMemoryItem({ label: "Memory inbox status", posture: "review", detail: "Pending candidates require operator review before promotion.", reviewBoundary: "Operator Memory Inbox" }),
    buildContinuityHandoffMemoryItem({ label: "Promotion gate status", posture: "review", detail: "Memory Promotion Gate remains approval-gated and no auto-promotion guarantee is visible.", reviewBoundary: "Memory Promotion Gate" }),
    buildContinuityHandoffMemoryItem({ label: "Runtime event executor status", posture: "review", detail: "Guarded executor is the only runtime event boundary; handoff UI does not execute tools.", reviewBoundary: "Guarded Runtime Event Executor" }),
    buildContinuityHandoffMemoryItem({ label: "Runtime event journal status", posture: "review", detail: "Runtime Event Journal is read-only audit context for memory.promoted lifecycle.", reviewBoundary: "Runtime Event Journal" }),
    buildContinuityHandoffMemoryItem({ label: "memory.promoted review boundary", posture: "review", detail: "Approved memory events are context until reviewed; no auto-merge graph events.", reviewBoundary: "memory.promoted review boundary" }),
  ];
  return {
    id: "continuity-handoff-memory-posture",
    memoryInboxStatus: "review",
    promotionGateStatus: "review",
    runtimeEventExecutorStatus: "review",
    runtimeEventJournalStatus: "review",
    duplicateRisk: input.duplicateRisk ?? "warning",
    contradictionRisk: input.contradictionRisk ?? "warning",
    pendingMemoryCandidates,
    approvedMemoryEvents,
    memoryPromotedReviewBoundary: "memory.promoted events require review before any Brain merge or promotion flow.",
    noAutoPromotionGuarantee: "no auto-promotion guarantee: handoff packet never promotes memory.",
    items,
    summary: summarizeContinuityHandoffMemoryPosture({ pendingMemoryCandidates, approvedMemoryEvents, items } as ContinuityHandoffMemoryPosture),
  };
}

export function summarizeContinuityHandoffMemoryPosture(posture: ContinuityHandoffMemoryPosture): string[] {
  return [
    `Memory posture is review-bound with ${posture.pendingMemoryCandidates} pending memory candidates and ${posture.approvedMemoryEvents} approved memory events.`,
    "Duplicate risk and contradiction risk remain visible before promotion.",
    "No auto-promotion, no auto-merge graph events, and memory.promoted review boundary are explicit.",
  ];
}
