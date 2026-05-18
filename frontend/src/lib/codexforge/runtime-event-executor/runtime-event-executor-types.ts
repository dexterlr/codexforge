import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainAppendEventResult,
  CodexForgeBrainEventStore,
  CodexForgeBrainMemoryPromotedPayload,
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventInput,
  CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";

export const RUNTIME_EVENT_EXECUTOR_ALLOWED_EVENT_TYPES = ["memory.promoted"] as const;

export const RUNTIME_EVENT_EXECUTOR_FUTURE_EVENT_TYPES = [
  "message.created",
  "task.created",
  "task.updated",
  "execution.started",
  "execution.completed",
  "diff.generated",
  "concept.synthesized",
  "failure.detected",
  "recovery.detected",
] as const;

export type RuntimeEventExecutorStatus =
  | "not-requested"
  | "dry-run-complete"
  | "approval-required"
  | "policy-blocked"
  | "validation-failed"
  | "request-ready"
  | "executed"
  | "blocked"
  | "failed";

export type RuntimeEventAuditLedgerState =
  | "request-created"
  | "policy-checked"
  | "validation-checked"
  | "approval-reviewed"
  | "dry-run-complete"
  | "reducer-preview-built"
  | "execution-blocked"
  | "request-ready"
  | "event-appended"
  | "result-captured"
  | "review-required";

export type RuntimeEventApprovalPosture = "missing" | "pending" | "approved" | "rejected";
export type RuntimeEventPolicyPosture = "unchecked" | "allowed" | "blocked" | "review";

export type RuntimeEventRequest = {
  id: string;
  sourceGateId: string;
  sourceSurface: string;
  requestedEventType: CodexForgeBrainRuntimeEventType | string;
  requestedPayload: Record<string, unknown>;
  targetRuntimeBoundary: string;
  operatorIntent: string;
  evidenceRefs: string[];
  relatedRoutes: string[];
  relatedFiles: string[];
  approvalPosture: RuntimeEventApprovalPosture;
  policyPosture: RuntimeEventPolicyPosture;
  noDirectUiMutationGuarantee: true;
  duplicateRiskAcknowledgementRequired: boolean;
  contradictionRiskAcknowledgementRequired: boolean;
  reviewedInboxOrMemoryGate: boolean;
  summary: string[];
};

export type RuntimeEventRequestInput = {
  sourceGateId: string;
  sourceSurface: string;
  requestedEventType: CodexForgeBrainRuntimeEventType | string;
  requestedPayload: Record<string, unknown>;
  operatorIntent?: string;
  evidenceRefs?: readonly string[];
  relatedRoutes?: readonly string[];
  relatedFiles?: readonly string[];
  approvalPosture?: RuntimeEventApprovalPosture;
  policyPosture?: RuntimeEventPolicyPosture;
  duplicateRiskAcknowledgementRequired?: boolean;
  contradictionRiskAcknowledgementRequired?: boolean;
  reviewedInboxOrMemoryGate?: boolean;
};

export type RuntimeEventRequestValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type RuntimeEventPolicy = {
  id: string;
  requestId: string;
  allowed: boolean;
  eventTypeAllowed: boolean;
  explicitApprovalRequired: true;
  payloadValidationRequired: true;
  reducerPreviewRecommended: true;
  directUiGraphMutationBlocked: true;
  directAppendEventFromUiBlocked: true;
  evidenceIsContextNotAuthority: true;
  latestMessageAuthorityPreserved: true;
  allowedEventTypes: string[];
  futureSupportedEventTypes: string[];
  blockedReasons: string[];
  warnings: string[];
  rules: Array<{ id: string; label: string; state: "allow" | "review" | "block"; detail: string }>;
  summary: string[];
};

export type RuntimeEventPayloadValidation = {
  id: string;
  eventType: string;
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  normalizedPayload?: CodexForgeBrainMemoryPromotedPayload;
  summary: string[];
};

export type RuntimeEventApproval = {
  id: string;
  requestId: string;
  approved: boolean;
  approvalNote: string;
  acknowledgedEventType: string;
  acknowledgedReducerEffect: boolean;
  acknowledgedEvidenceContext: boolean;
  acknowledgedDuplicateRisk: boolean;
  acknowledgedContradictionRisks: boolean;
  acknowledgedNoSilentGraphMutation: boolean;
  acknowledgedAppendOnlyEventSemantics: boolean;
  summary: string[];
};

export type RuntimeEventApprovalInput = Partial<Omit<RuntimeEventApproval, "id" | "requestId" | "summary">>;

export type RuntimeEventReducerPreview = {
  id: string;
  requestId: string;
  ready: boolean;
  graphBefore: { nodeCount: number; edgeCount: number };
  graphAfter: { nodeCount: number; edgeCount: number };
  expectedNodeChanges: number;
  expectedEdgeChanges: number;
  impactedMemoryAreas: string[];
  impactedTaskAreas: string[];
  impactedConceptAreas: string[];
  warnings: string[];
  summary: string[];
};

export type RuntimeEventExecutionResult = {
  id: string;
  requestId: string;
  ok: boolean;
  status: RuntimeEventExecutorStatus;
  eventType: string;
  eventId?: string;
  appendedEventPreview?: CodexForgeBrainRuntimeEventInput;
  appendedEventResult?: CodexForgeBrainAppendEventResult;
  reducerPreviewSummary: string[];
  warnings: string[];
  errors: string[];
  nextSafeAction: string;
  reviewRefs: string[];
  summary: string[];
};

export type RuntimeEventAuditLedgerItem = {
  id: string;
  state: RuntimeEventAuditLedgerState;
  label: string;
  detail: string;
};

export type RuntimeEventAuditLedger = {
  id: string;
  requestId: string;
  items: RuntimeEventAuditLedgerItem[];
  summary: string[];
};

export type RuntimeEventExecutorSummary = {
  id: string;
  requestReady: boolean;
  policyReady: boolean;
  validationReady: boolean;
  approvalReady: boolean;
  reducerPreviewReady: boolean;
  executionStatus: RuntimeEventExecutorStatus;
  blockedReasons: string[];
  warningCount: number;
  nextSafeAction: string;
  summary: string[];
};

export type RuntimeEventExecutorInput = {
  request: RuntimeEventRequest;
  approval?: RuntimeEventApproval;
  policy?: RuntimeEventPolicy;
  validation?: RuntimeEventPayloadValidation;
  reducerPreview?: RuntimeEventReducerPreview;
  store?: CodexForgeBrainEventStore;
};

export type RuntimeEventReducerPreviewInput = {
  graph: CodexForgeBrainGraph;
  request: RuntimeEventRequest;
  validation?: RuntimeEventPayloadValidation;
};

export type RuntimeEventAppendable = Extract<CodexForgeBrainRuntimeEvent, { type: "memory.promoted" }>;

export function buildRuntimeEventExecutorStableKey(
  ...parts: Array<string | number | boolean | null | undefined | readonly string[]>
): string {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._/-]+/g, "-")
        .replace(/[/-]+/g, "-")
        .replace(/^-+|-+$/g, "")
    )
    .filter(Boolean)
    .join(":");
}

export function buildRuntimeEventExecutorDigest(value: unknown): string {
  let text: string;
  try {
    text = JSON.stringify(value, Object.keys((value as Record<string, unknown>) ?? {}).sort());
  } catch {
    text = String(value);
  }

  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function deriveRuntimeEventTimestamp(seed: string): number {
  const digest = buildRuntimeEventExecutorDigest(seed);
  return Number.parseInt(digest.slice(0, 8), 16) || 1;
}
