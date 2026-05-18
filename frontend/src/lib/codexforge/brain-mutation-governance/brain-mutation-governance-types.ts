import {
  CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
  type CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";

export const BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH =
  "src/lib/codexforge/brain/graph/types.ts" as const;

export const BRAIN_MUTATION_GOVERNANCE_EVENT_TYPES = [
  ...CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES,
] as const;

export type BrainMutationGovernanceEventType =
  | CodexForgeBrainRuntimeEventType
  | "unknown";

export type BrainMutationBoundaryType =
  | "runtime-event-executor"
  | "memory-promotion-gate"
  | "approved-brain-merge"
  | "brain-merge-preview"
  | "graph-reducer-preview"
  | "memory-review"
  | "operator-memory-inbox"
  | "runtime-event-journal"
  | "direct-ui-mutation-block"
  | "unknown";

export type BrainMutationMode =
  | "blocked"
  | "preview-only"
  | "request-ready"
  | "guarded-executor"
  | "executed";

export type BrainMutationBoundary = {
  id: string;
  label: string;
  type: BrainMutationBoundaryType;
  sourceRoute: string;
  sourceModule: string;
  allowedEventTypes: BrainMutationGovernanceEventType[];
  mutationMode: BrainMutationMode;
  approvalRequired: boolean;
  policyRequired: boolean;
  reducerPreviewRequired: boolean;
  auditJournalRequired: boolean;
  directUiMutationAllowed: boolean;
  safetyNote: string;
  nextSafeAction: string;
};

export type BrainMutationBoundaryRegistry = {
  id: "brain-mutation-boundary-registry";
  boundaries: BrainMutationBoundary[];
  boundaryCount: number;
  guardedBoundaryCount: number;
  blockedBoundaryCount: number;
  previewBoundaryCount: number;
  directUiMutationAllowedCount: number;
  summary: string[];
};

export type BrainMutationPolicyRuleState = "pass" | "review" | "block";

export type BrainMutationPolicyRule = {
  id: string;
  label: string;
  state: BrainMutationPolicyRuleState;
  required: boolean;
  detail: string;
};

export type BrainMutationPolicyInput = {
  eventType?: string | null;
  approvalConfirmed?: boolean | null;
  evidenceRefs?: readonly string[] | null;
  policyConfirmed?: boolean | null;
  auditJournalVisible?: boolean | null;
  reducerPreviewVisible?: boolean | null;
  directUiGraphMutationAttempted?: boolean | null;
  appendEventFromUiAttempted?: boolean | null;
  legacyBrainGraphImportDetected?: boolean | null;
  autoPromotionAttempted?: boolean | null;
  autoMergeAttempted?: boolean | null;
};

export type BrainMutationPolicy = {
  id: "brain-mutation-policy";
  canonicalGraphSchemaRequired: true;
  canonicalGraphSchemaPath: typeof BRAIN_MUTATION_GOVERNANCE_CANONICAL_GRAPH_SCHEMA_PATH;
  legacyBrainGraphImportBlocked: true;
  directUiGraphMutationBlocked: true;
  appendEventFromUiBlocked: true;
  runtimeEventExecutorRequiredForAppendOnlyEvents: true;
  reducerPreviewRequiredBeforeMutation: true;
  explicitApprovalRequiredForMemoryPromoted: true;
  evidenceRefsRequiredForMemoryPromoted: true;
  policyConfirmationRequired: true;
  auditJournalEntryRequired: true;
  unknownEventTypeBlocked: true;
  autoPromotionBlocked: true;
  autoMergeBlocked: true;
  evidenceIsContextNotAuthority: true;
  latestMessageAuthorityPreserved: true;
  satisfied: boolean;
  blockedReasons: string[];
  warnings: string[];
  rules: BrainMutationPolicyRule[];
  summary: string[];
};

export type DirectMutationSignalSeverity =
  | "info"
  | "warning"
  | "risk"
  | "blocker";

export type DirectMutationDetectorInput = {
  moduleLabels?: readonly string[] | null;
  importLabels?: readonly string[] | null;
  uiActionLabels?: readonly string[] | null;
  mutationHints?: readonly string[] | null;
  routeLabels?: readonly string[] | null;
};

export type DirectMutationSignal = {
  id: string;
  title: string;
  severity: DirectMutationSignalSeverity;
  source: string;
  reason: string;
  blocked: boolean;
  recommendedSafeBoundary: BrainMutationBoundaryType;
};

export type DirectMutationDetectorReport = {
  id: "direct-mutation-detector-report";
  signals: DirectMutationSignal[];
  suppliedLabelCount: number;
  blockedSignalCount: number;
  blockerCount: number;
  riskCount: number;
  summary: string[];
};

export type ReducerImpactCategory =
  | "none"
  | "node-only"
  | "edge-only"
  | "node-and-edge"
  | "unknown";

export type ReducerImpactRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export type ReducerImpactPolicyState =
  | "allowed"
  | "review-required"
  | "blocked"
  | "future-governed";

export type ReducerImpactGovernanceItem = {
  id: string;
  eventType: BrainMutationGovernanceEventType;
  reducerAvailable: boolean;
  reducerPreviewRequired: boolean;
  expectedGraphAreasImpacted: string[];
  nodeEdgeImpactCategory: ReducerImpactCategory;
  auditRequirement: string;
  riskLevel: ReducerImpactRiskLevel;
  policyState: ReducerImpactPolicyState;
  nextSafeAction: string;
};

export type ReducerImpactGovernance = {
  id: "reducer-impact-governance";
  items: ReducerImpactGovernanceItem[];
  governedEventCount: number;
  highPriorityCount: number;
  previewRequiredCount: number;
  summary: string[];
};

export type BrainMutationIntegrityStatus =
  | "pass"
  | "warning"
  | "risk"
  | "blocker"
  | "unknown";

export type BrainMutationIntegrityInput = {
  canonicalGraphSchemaPathVisible?: boolean | null;
  runtimeEventExecutorExists?: boolean | null;
  runtimeEventJournalExists?: boolean | null;
  memoryPromotionGateExists?: boolean | null;
  directUiMutationBlocked?: boolean | null;
  appendEventUiCallsAbsent?: boolean | null;
  reducerPreviewAvailable?: boolean | null;
  policyConfirmationVisible?: boolean | null;
  auditLedgerVisible?: boolean | null;
  smokeCoveragePresent?: boolean | null;
  legacyBrainGraphImportAbsent?: boolean | null;
  latestMessageAuthorityPreserved?: boolean | null;
};

export type BrainMutationIntegrityCheck = {
  id: string;
  label: string;
  status: BrainMutationIntegrityStatus;
  detail: string;
  nextSafeAction: string;
};

export type BrainMutationIntegrityReport = {
  id: "brain-mutation-integrity-report";
  checks: BrainMutationIntegrityCheck[];
  passCount: number;
  warningCount: number;
  riskCount: number;
  blockerCount: number;
  unknownCount: number;
  summary: string[];
};

export type BrainMutationRiskSeverity =
  | "info"
  | "warning"
  | "risk"
  | "blocker";

export type BrainMutationRiskId =
  | "direct-ui-graph-mutation"
  | "silent-memory-promotion"
  | "missing-runtime-event-journal"
  | "missing-reducer-preview"
  | "missing-approval-packet"
  | "stale-evidence"
  | "contradiction-risk"
  | "duplicate-memory-risk"
  | "legacy-schema-import"
  | "unreviewed-event-type"
  | "latest-message-authority-risk"
  | "unknown-risk";

export type BrainMutationRiskItem = {
  id: BrainMutationRiskId;
  title: string;
  severity: BrainMutationRiskSeverity;
  source: string;
  mitigation: string;
  requiredBoundary: BrainMutationBoundaryType;
  reviewRequired: boolean;
  blocked: boolean;
};

export type BrainMutationRiskBoard = {
  id: "brain-mutation-risk-board";
  items: BrainMutationRiskItem[];
  topRisk: BrainMutationRiskItem | null;
  blockedCount: number;
  reviewRequiredCount: number;
  summary: string[];
};

export type BrainMutationGovernanceNextActionKind =
  | "review runtime event journal"
  | "review runtime event executor"
  | "review memory promotion gate"
  | "review operator memory inbox"
  | "inspect direct mutation signal"
  | "inspect reducer preview"
  | "run brain runtime smoke manually"
  | "run runtime event executor smoke manually"
  | "stop and stabilize"
  | "commit clean checkpoint"
  | "continue next phase";

export type BrainMutationGovernanceNextAction = {
  id: string;
  action: BrainMutationGovernanceNextActionKind;
  title: string;
  detail: string;
  targetRoute: string;
  priority: "primary" | "secondary";
  reviewRequired: boolean;
};

export type BrainMutationGovernanceNextActionPlan = {
  id: "brain-mutation-governance-next-action-plan";
  selected: BrainMutationGovernanceNextAction;
  orderedActions: BrainMutationGovernanceNextAction[];
  blockers: string[];
  warnings: string[];
  summary: string[];
};

export type BrainMutationGovernanceSummary = {
  id: "brain-mutation-governance-summary";
  boundaryCount: number;
  guardedBoundaryCount: number;
  blockedDirectMutationCount: number;
  integrityPassCount: number;
  integrityRiskCount: number;
  reducerGovernedEventCount: number;
  topRisk: string;
  nextSafeAction: string;
  overallPosture: "read-only" | "review-required" | "risk" | "blocked";
  summary: string[];
};

export type BrainMutationGovernanceSession = {
  registry: BrainMutationBoundaryRegistry;
  policy: BrainMutationPolicy;
  detectorReport: DirectMutationDetectorReport;
  reducerGovernance: ReducerImpactGovernance;
  integrityReport: BrainMutationIntegrityReport;
  riskBoard: BrainMutationRiskBoard;
  nextActionPlan: BrainMutationGovernanceNextActionPlan;
  summary: BrainMutationGovernanceSummary;
};

export function buildBrainMutationGovernanceStableKey(
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

export function uniqueBrainMutationGovernanceStrings(
  values?: readonly (string | null | undefined)[]
): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function isKnownBrainMutationGovernanceEventType(
  value?: string | null
): value is CodexForgeBrainRuntimeEventType {
  return CODEXFORGE_BRAIN_RUNTIME_EVENT_TYPES.includes(value as CodexForgeBrainRuntimeEventType);
}
