import type { MemoryEventPersistencePolicy, MemoryEventPersistenceRequest } from "./memory-persistence-types";

export function buildMemoryEventPersistencePolicy(): MemoryEventPersistencePolicy {
  const policy: MemoryEventPersistencePolicy = {
    id: "memory-event-persistence-policy",
    explicitApprovalRequired: true,
    reviewedCandidatesOnly: true,
    sourceTraceabilityRequired: true,
    highContradictionRequiresAcknowledgement: true,
    automaticGraphMutationAllowed: false,
    workspaceRoot: ".codexforge/memory-events",
    rules: [
      {
        id: "explicit-approval-required",
        label: "Explicit approval required",
        state: "block",
        detail: "Persistence is blocked unless approved is true and an approval note is present.",
      },
      {
        id: "reviewed-candidates-only",
        label: "Only reviewed candidates allowed",
        state: "block",
        detail: "Only approved-for-promotion review items can become runtime event ledger entries.",
      },
      {
        id: "traceability-required",
        label: "Source traceability required",
        state: "block",
        detail: "Every persisted event must carry source refs back to the reviewed candidate.",
      },
      {
        id: "high-contradiction-acknowledgement",
        label: "High contradiction risk must be acknowledged",
        state: "review",
        detail: "High contradiction risk is blocked unless explicitly acknowledged in the request.",
      },
      {
        id: "no-automatic-graph-mutation",
        label: "No automatic graph mutation",
        state: "allow",
        detail: "Approved events are persisted locally; graph reduction is preview-only for a future merge.",
      },
    ],
    summary: [],
  };

  return { ...policy, summary: summarizeMemoryEventPersistencePolicy(policy) };
}

export function isMemoryEventPersistenceAllowed(
  request: MemoryEventPersistenceRequest,
  policy: MemoryEventPersistencePolicy = buildMemoryEventPersistencePolicy()
): boolean {
  if (!policy.explicitApprovalRequired || !policy.reviewedCandidatesOnly) return false;
  if (request.approved !== true) return false;
  if (request.reviewState !== "approved-for-promotion") return false;
  if (!request.approvalNote.trim() || !request.safetyNote.trim()) return false;
  if (request.sourceRefs.length === 0) return false;
  if (request.contradictionRisk >= 0.75 && !request.contradictionAcknowledged) return false;
  return request.type === "memory.promoted";
}

export function summarizeMemoryEventPersistencePolicy(
  policy?: MemoryEventPersistencePolicy
): string[] {
  return [
    "Explicit approval required before any memory event is persisted.",
    "Only reviewed candidates with source traceability can be written.",
    "High contradiction risk requires acknowledgement before persistence.",
    `Persistence writes only to ${policy?.workspaceRoot ?? ".codexforge/memory-events"}.`,
    "Graph mutation is not automatic; reduction remains preview-only.",
  ];
}
