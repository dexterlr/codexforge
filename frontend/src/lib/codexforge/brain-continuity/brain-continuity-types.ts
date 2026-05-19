import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph/types";

export type BrainContinuitySeverity = "healthy" | "info" | "warning" | "risk" | "blocker" | "unknown";

export type BrainContinuitySignalType =
  | "memory-growth"
  | "memory-review"
  | "memory-promotion"
  | "runtime-event-journal"
  | "runtime-event-executor"
  | "runtime-replay"
  | "brain-snapshot"
  | "snapshot-restore"
  | "mutation-governance"
  | "graph-integrity"
  | "latest-message-authority"
  | "operator-warning"
  | "unknown";

export type BrainContinuitySource =
  | "brain-continuity"
  | "operator-memory-inbox"
  | "memory-promotion-gate"
  | "runtime-event-journal"
  | "runtime-event-executor"
  | "runtime-event-replay"
  | "brain-snapshot-manager"
  | "snapshot-restore-gate"
  | "brain-mutation-governance"
  | "canonical-brain-runtime"
  | "brain-graph"
  | "operator-note"
  | "unknown";

export type BrainContinuityRoute =
  | "/brain-continuity"
  | "/memory-inbox"
  | "/memory"
  | "/runtime-journal"
  | "/runtime-replay"
  | "/brain-snapshots"
  | "/snapshot-restore"
  | "/brain-governance"
  | "/brain"
  | "/stabilization"
  | "/activity"
  | "/mission"
  | "domain"
  | "smoke suite"
  | "unknown";

export type BrainContinuitySignal = {
  id: string;
  type: BrainContinuitySignalType;
  title: string;
  detail: string;
  severity: BrainContinuitySeverity;
  source: BrainContinuitySource;
  relatedRoute: BrainContinuityRoute;
  relatedFiles: string[];
  relatedIds: string[];
  reviewRequired: boolean;
  nextAction: string;
};

export type BrainContinuitySignalSummary = {
  id: "brain-continuity-signal-summary";
  signalCount: number;
  healthyCount: number;
  infoCount: number;
  warningCount: number;
  riskCount: number;
  blockerCount: number;
  unknownCount: number;
  reviewRequiredCount: number;
  topSignal: BrainContinuitySignal | null;
  summary: string[];
};

export type BrainContinuityPosture = "healthy" | "needs-review" | "warning" | "risk" | "blocked" | "unknown";
export type BrainContinuityCheckStatus = "pass" | "visible" | "review" | "warning" | "risk" | "blocked" | "unknown";

export type BrainContinuityMetric = {
  id: string;
  label: string;
  value: number | string;
  detail: string;
  posture: BrainContinuityPosture;
  reviewRequired: boolean;
};

export type MemoryGrowthModel = {
  id: "memory-growth-model";
  metrics: BrainContinuityMetric[];
  posture: BrainContinuityPosture;
  memoryNodeCount: number;
  promotedMemoryCount: number;
  pendingMemoryInboxCount: number;
  blockedPromotionCount: number;
  duplicateRiskCount: number;
  contradictionRiskCount: number;
  highImportanceMemoryCount: number;
  staleMemoryCount: number | null;
  memoryDensity: number | null;
  memoryGovernanceReadiness: BrainContinuityPosture;
  summary: string[];
};

export type BrainContinuityCheck = {
  id: string;
  label: string;
  status: BrainContinuityCheckStatus;
  detail: string;
  reviewRequired: boolean;
  nextAction: string;
};

export type RuntimeEventJournalHealth = {
  id: "runtime-event-journal-health";
  checks: BrainContinuityCheck[];
  posture: BrainContinuityPosture;
  passCount: number;
  warningCount: number;
  riskCount: number;
  blockerCount: number;
  summary: string[];
};

export type BrainSnapshotContinuity = {
  id: "brain-snapshot-continuity";
  items: BrainContinuityCheck[];
  posture: BrainContinuityPosture;
  readyCount: number;
  reviewCount: number;
  blockedCount: number;
  summary: string[];
};

export type RuntimeReplayContinuity = {
  id: "runtime-replay-continuity";
  checks: BrainContinuityCheck[];
  posture: BrainContinuityPosture;
  readyCount: number;
  warningCount: number;
  blockedCount: number;
  summary: string[];
};

export type SnapshotRestoreRiskId =
  | "restore-executor-missing"
  | "restore-blocked-by-policy"
  | "missing-comparison-evidence"
  | "missing-replay-evidence"
  | "missing-governance-review"
  | "missing-journal-review"
  | "schema-risk"
  | "duplicate-memory-risk"
  | "contradiction-risk"
  | "data-loss-risk"
  | "direct-saveBrainGraph-risk"
  | "latest-message-authority-risk";

export type SnapshotRestoreContinuityRiskItem = {
  id: SnapshotRestoreRiskId;
  title: string;
  severity: BrainContinuitySeverity;
  detail: string;
  reviewRequired: boolean;
  blocked: boolean;
  mitigation: string;
};

export type SnapshotRestoreContinuityRisk = {
  id: "snapshot-restore-continuity-risk";
  items: SnapshotRestoreContinuityRiskItem[];
  posture: BrainContinuityPosture;
  blockerCount: number;
  riskCount: number;
  warningCount: number;
  topRisk: SnapshotRestoreContinuityRiskItem | null;
  summary: string[];
};

export type BrainGovernanceContinuity = {
  id: "brain-governance-continuity";
  checks: BrainContinuityCheck[];
  posture: BrainContinuityPosture;
  passCount: number;
  warningCount: number;
  riskCount: number;
  blockedCount: number;
  summary: string[];
};

export type BrainContinuityNextActionKind =
  | "review memory inbox"
  | "review memory promotion gate"
  | "review runtime event journal"
  | "review runtime event executor"
  | "review Brain mutation governance"
  | "review runtime replay"
  | "review Brain snapshots"
  | "review snapshot restore gate"
  | "run Brain runtime smoke manually"
  | "run snapshot restore smoke manually"
  | "stop and stabilize"
  | "commit clean checkpoint"
  | "continue next phase";

export type BrainContinuityNextAction = {
  id: string;
  action: BrainContinuityNextActionKind;
  title: string;
  detail: string;
  priority: "primary" | "secondary";
  targetRoute: BrainContinuityRoute;
  reviewRequired: boolean;
};

export type BrainContinuityNextActionPlan = {
  id: "brain-continuity-next-action-plan";
  selected: BrainContinuityNextAction;
  orderedActions: BrainContinuityNextAction[];
  blockers: string[];
  warnings: string[];
  validationCommands: string[];
  summary: string[];
};

export type BrainContinuitySummary = {
  id: "brain-continuity-summary";
  overallPosture: BrainContinuityPosture;
  signalCount: number;
  blockerCount: number;
  warningCount: number;
  memoryGrowthPosture: BrainContinuityPosture;
  journalHealthPosture: BrainContinuityPosture;
  snapshotPosture: BrainContinuityPosture;
  replayPosture: BrainContinuityPosture;
  restoreRiskPosture: BrainContinuityPosture;
  governancePosture: BrainContinuityPosture;
  nextSafeAction: BrainContinuityNextActionKind;
  summary: string[];
};

export type BrainContinuityInput = {
  graph?: CodexForgeBrainGraph | null;
  memoryNodeCount?: number | null;
  promotedMemoryCount?: number | null;
  pendingMemoryInboxCount?: number | null;
  blockedPromotionCount?: number | null;
  duplicateRiskCount?: number | null;
  contradictionRiskCount?: number | null;
  highImportanceMemoryCount?: number | null;
  staleMemoryCount?: number | null;
  journalPresent?: boolean | null;
  eventLifecycleVisible?: boolean | null;
  requestIdsVisible?: boolean | null;
  approvalStateVisible?: boolean | null;
  policyStateVisible?: boolean | null;
  validationStateVisible?: boolean | null;
  reducerPreviewVisible?: boolean | null;
  appendOnlySemanticsVisible?: boolean | null;
  memoryPromotedEventsAuditable?: boolean | null;
  blockedEventsVisible?: boolean | null;
  integrityRisksVisible?: boolean | null;
  latestSnapshotAvailable?: boolean | null;
  snapshotIntegrityChecked?: boolean | null;
  snapshotComparisonAvailable?: boolean | null;
  snapshotReplaySelectorAvailable?: boolean | null;
  snapshotRollbackPlanVisible?: boolean | null;
  replaySimulatorAvailable?: boolean | null;
  reducerSimulationAvailable?: boolean | null;
  replayUsesClonedData?: boolean | null;
  replayRiskDetectorAvailable?: boolean | null;
  rollbackAdvisorAvailable?: boolean | null;
  snapshotSelectionSupported?: boolean | null;
  comparisonEvidenceAvailable?: boolean | null;
  replayEvidenceAvailable?: boolean | null;
  governanceReviewed?: boolean | null;
  runtimeJournalReviewed?: boolean | null;
  schemaKnown?: boolean | null;
  canonicalSchemaEnforced?: boolean | null;
  legacyBrainGraphImportBlocked?: boolean | null;
  directUiGraphMutationBlocked?: boolean | null;
  appendEventUiCallsBlocked?: boolean | null;
  runtimeEventExecutorExists?: boolean | null;
  runtimeEventJournalExists?: boolean | null;
  memoryPromotionGateExists?: boolean | null;
  brainSnapshotManagerExists?: boolean | null;
  restoreGateExists?: boolean | null;
  reducerPreviewRequired?: boolean | null;
  latestMessageAuthorityPreserved?: boolean | null;
  operatorWarning?: string | null;
  relatedFiles?: readonly string[] | null;
  relatedIds?: readonly string[] | null;
};

export type BrainContinuitySession = {
  signals: BrainContinuitySignal[];
  signalSummary: BrainContinuitySignalSummary;
  memoryGrowth: MemoryGrowthModel;
  journalHealth: RuntimeEventJournalHealth;
  snapshotContinuity: BrainSnapshotContinuity;
  replayContinuity: RuntimeReplayContinuity;
  restoreRisk: SnapshotRestoreContinuityRisk;
  governanceContinuity: BrainGovernanceContinuity;
  nextActionPlan: BrainContinuityNextActionPlan;
  continuitySummary: BrainContinuitySummary;
  handoff: string;
};

export const BRAIN_CONTINUITY_VALIDATION_COMMANDS: readonly string[] = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-continuity.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-snapshot-restore-gate.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-snapshot-manager.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-runtime-event-replay.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-mutation-governance.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
];

export function buildBrainContinuityStableKey(
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

export function uniqueBrainContinuityStrings(values?: readonly (string | null | undefined)[] | null): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function readBrainContinuityCount(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return fallback;
  return Math.round(numeric);
}

export function booleanStatus(value: boolean | null | undefined): BrainContinuityCheckStatus {
  if (value === true) return "pass";
  if (value === false) return "blocked";
  return "unknown";
}
