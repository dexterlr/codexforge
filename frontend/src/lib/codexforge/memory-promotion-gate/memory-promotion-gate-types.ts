import type {
  MemoryInboxRisk,
  MemoryInboxReviewState,
  MemoryInboxPromotionReadiness,
  OperatorMemoryInboxCard,
  OperatorMemoryKind,
} from "@/lib/codexforge/operator-memory-inbox";

export type MemoryPromotionGateReviewState =
  | MemoryInboxReviewState
  | "approved-for-promotion"
  | "needs-review"
  | "reviewed"
  | "rejected";

export type MemoryPromotionOperatorDecision =
  | "undecided"
  | "approve"
  | "reject"
  | "needs-dedupe-review"
  | "needs-contradiction-review";

export type MemoryPromotionAuditLedgerState =
  | "input-created"
  | "review-checked"
  | "approval-reviewed"
  | "policy-checked"
  | "event-preview-built"
  | "request-packet-built"
  | "bridge-blocked"
  | "request-ready"
  | "promoted-future-boundary"
  | "rejected"
  | "needs-dedupe-review"
  | "needs-contradiction-review";

export type MemoryPromotionGateInputSource = Partial<OperatorMemoryInboxCard> & {
  inboxCardId?: string;
  sourceMemoryReviewId?: string;
  proposedMemoryText?: string;
  memoryKind?: OperatorMemoryKind;
  reviewState?: MemoryPromotionGateReviewState;
  promotionReadiness?: MemoryInboxPromotionReadiness;
};

export type MemoryPromotionGateInput = {
  id: string;
  inboxCardId: string;
  sourceMemoryReviewId: string;
  proposedMemoryText: string;
  memoryKind: OperatorMemoryKind;
  confidence: number;
  importance: number;
  risk: MemoryInboxRisk;
  duplicateRisk: number;
  contradictionRisk: number;
  evidenceSnippets: string[];
  sourceIds: string[];
  relatedRoutes: string[];
  relatedFiles: string[];
  suggestedTags: string[];
  promotionReadiness: MemoryInboxPromotionReadiness;
  reviewState: MemoryPromotionGateReviewState;
  noAutoPromotionGuarantee: true;
  summary: string[];
};

export type MemoryPromotionGateInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
  summary: string[];
};

export type MemoryPromotionApprovalPacket = {
  id: string;
  promotionGateId: string;
  operatorDecision: MemoryPromotionOperatorDecision;
  approved: boolean;
  approvalNote: string;
  acknowledgedEvidenceContext: boolean;
  acknowledgedDuplicateRisk: boolean;
  acknowledgedContradictionRisk: boolean;
  acknowledgedConfidenceImportance: boolean;
  acknowledgedNoSilentGraphMutation: boolean;
  acknowledgedFutureRuntimeEvent: boolean;
  acknowledgedReviewBoundary: boolean;
  acknowledgedLowConfidence: boolean;
  dedupeReviewed: boolean;
  contradictionDecisionSupplied: boolean;
  readinessBlockedReasons: string[];
  summary: string[];
};

export type MemoryPromotionApprovalPacketInput = Partial<
  Omit<MemoryPromotionApprovalPacket, "id" | "promotionGateId" | "readinessBlockedReasons" | "summary">
> & {
  promotionGateId?: string;
};

export type MemoryPromotionPolicyRule = {
  id: string;
  label: string;
  state: "allow" | "review" | "block";
  detail: string;
};

export type MemoryPromotionPolicy = {
  id: string;
  promotionGateId: string;
  allowed: boolean;
  eventType: "memory.promoted";
  appendEventCalledFromUi: false;
  uiGraphMutationAllowed: false;
  graphMutationBlockedInPhase45: true;
  evidenceIsContextNotAuthority: true;
  latestMessageAuthorityPreserved: true;
  blockedReasons: string[];
  rules: MemoryPromotionPolicyRule[];
  summary: string[];
};

export type MemoryPromotionRuntimePayloadPreview = {
  memoryId: string;
  content: string;
  memoryType: "fact" | "decision" | "task" | "note";
  importance: number;
  tags: string[];
  confidence: number;
  risk: MemoryInboxRisk;
  sourceInboxCardId: string;
  sourceReviewId: string;
  evidenceRefs: string[];
  safetyNote: string;
};

export type MemoryPromotedEventPreview = {
  id: string;
  type: "memory.promoted";
  eventId: string;
  memoryId: string;
  proposedMemoryText: string;
  memoryKind: OperatorMemoryKind;
  tags: string[];
  evidenceRefs: string[];
  confidence: number;
  importance: number;
  risk: MemoryInboxRisk;
  sourceInboxCardId: string;
  sourceReviewId: string;
  reviewRequirements: string[];
  blockedReasons: string[];
  futureReducerBoundary: string;
  payloadPreview: MemoryPromotionRuntimePayloadPreview;
  summary: string[];
};

export type MemoryPromotionRequestPacket = {
  id: string;
  promotionGateId: string;
  approvalPacket: MemoryPromotionApprovalPacket;
  policyConfirmation: MemoryPromotionPolicy;
  eventPreview: MemoryPromotedEventPreview;
  targetRuntimeBoundary: string;
  expectedResultContract: string[];
  state: "blocked" | "request-ready";
  blockedReasons: string[];
  safetyNotes: string[];
  summary: string[];
};

export type MemoryPromotionExecutionBridge = {
  id: string;
  requestId: string;
  state: "blocked" | "request-ready" | "executed-by-guarded-runtime";
  canExecuteInPhase45: false;
  resultContract: string[];
  blockedReasons: string[];
  message: string;
  summary: string[];
};

export type MemoryPromotionAuditLedgerItem = {
  id: string;
  state: MemoryPromotionAuditLedgerState;
  label: string;
  detail: string;
};

export type MemoryPromotionAuditLedger = {
  id: string;
  promotionGateId: string;
  items: MemoryPromotionAuditLedgerItem[];
  summary: string[];
};

export type MemoryPromotionGateSummary = {
  id: string;
  promotionGateId: string;
  approvalReady: boolean;
  policyReady: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  duplicateRiskCount: number;
  contradictionRiskCount: number;
  evidenceCount: number;
  nextSafeAction: string;
  summary: string[];
};

export function buildMemoryPromotionGateStableKey(
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

export function buildMemoryPromotionTextDigest(text: string): string {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function clampMemoryPromotionScore(value: number | undefined, fallback: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(1, value));
}
