export type ContinuityHandoffPosture = "ready" | "review" | "warning" | "risk" | "blocked" | "unknown";
export type ContinuityHandoffSeverity = "info" | "warning" | "risk" | "blocker" | "unknown";

export type ContinuityHandoffRoute =
  | "/handoff"
  | "/brain-continuity"
  | "/stabilization"
  | "/activity"
  | "/brain"
  | "/memory-inbox"
  | "/memory"
  | "/runtime-journal"
  | "/runtime-replay"
  | "/brain-snapshots"
  | "/snapshot-restore"
  | "/brain-governance"
  | "/mission"
  | "smoke suite"
  | "domain"
  | "unknown";

export type ContinuityHandoffStateItem = {
  id: string;
  label: string;
  posture: ContinuityHandoffPosture;
  detail: string;
  sourceSurface: string;
  relatedRoute: ContinuityHandoffRoute;
  reviewRequired: boolean;
};

export type ContinuityHandoffState = {
  id: string;
  productName: string;
  branchLabel: string;
  phaseLabel: string;
  currentPosture: ContinuityHandoffPosture;
  sourceSurfaces: string[];
  activeRoutes: ContinuityHandoffRoute[];
  continuityStatus: ContinuityHandoffPosture;
  stabilizationStatus: ContinuityHandoffPosture;
  brainPosture: ContinuityHandoffPosture;
  memoryPosture: ContinuityHandoffPosture;
  runtimeEventPosture: ContinuityHandoffPosture;
  snapshotPosture: ContinuityHandoffPosture;
  restorePosture: ContinuityHandoffPosture;
  validationPosture: ContinuityHandoffPosture;
  noMutationGuarantee: string;
  items: ContinuityHandoffStateItem[];
  summary: string[];
};

export type ContinuityHandoffRiskCategory =
  | "build-risk"
  | "smoke-risk"
  | "regression-risk"
  | "memory-risk"
  | "graph-mutation-risk"
  | "runtime-event-risk"
  | "snapshot-risk"
  | "restore-risk"
  | "replay-risk"
  | "governance-risk"
  | "validation-risk"
  | "latest-message-authority-risk"
  | "unknown-risk";

export type ContinuityHandoffRiskItem = {
  id: string;
  category: ContinuityHandoffRiskCategory;
  title: string;
  severity: ContinuityHandoffSeverity;
  source: string;
  detail: string;
  mitigation: string;
  relatedRoute: ContinuityHandoffRoute;
  reviewRequired: boolean;
  blocker: boolean;
};

export type ContinuityHandoffRiskSummary = {
  id: "continuity-handoff-risk-summary";
  items: ContinuityHandoffRiskItem[];
  riskCount: number;
  blockerCount: number;
  reviewRequiredCount: number;
  topRisk: ContinuityHandoffRiskItem | null;
  summary: string[];
};

export type ContinuityHandoffValidationCommand = {
  id: string;
  label: string;
  command: string;
  purpose: string;
  required: boolean;
  manualOnly: boolean;
  expectedOutcome: string;
  failureNextAction: string;
};

export type ContinuityHandoffValidationPlan = {
  id: "continuity-handoff-validation-plan";
  commands: ContinuityHandoffValidationCommand[];
  requiredCount: number;
  manualOnly: true;
  summary: string[];
};

export type ContinuityHandoffRollbackOption = {
  id: string;
  label: string;
  readiness: ContinuityHandoffPosture;
  detail: string;
  commandHint: string;
  approvalRequired: boolean;
  preservesSmokeOutput: boolean;
};

export type ContinuityHandoffRollbackPosture = {
  id: "continuity-handoff-rollback-posture";
  rollbackReadiness: ContinuityHandoffPosture;
  workingTreeMustBeClean: boolean;
  lastCommitCanBeReverted: boolean;
  gitRestoreSaferBeforeCommit: boolean;
  snapshotRestoreBlocked: boolean;
  brainGraphRestoreBlocked: boolean;
  applyDiffRollbackApprovalGated: boolean;
  preserveSmokeOutput: boolean;
  stopAndStabilizeAvailable: boolean;
  options: ContinuityHandoffRollbackOption[];
  summary: string[];
};

export type ContinuityHandoffMemoryItem = {
  id: string;
  label: string;
  posture: ContinuityHandoffPosture;
  detail: string;
  reviewBoundary: string;
};

export type ContinuityHandoffMemoryPosture = {
  id: "continuity-handoff-memory-posture";
  memoryInboxStatus: ContinuityHandoffPosture;
  promotionGateStatus: ContinuityHandoffPosture;
  runtimeEventExecutorStatus: ContinuityHandoffPosture;
  runtimeEventJournalStatus: ContinuityHandoffPosture;
  duplicateRisk: ContinuityHandoffSeverity;
  contradictionRisk: ContinuityHandoffSeverity;
  pendingMemoryCandidates: number;
  approvedMemoryEvents: number;
  memoryPromotedReviewBoundary: string;
  noAutoPromotionGuarantee: string;
  items: ContinuityHandoffMemoryItem[];
  summary: string[];
};

export type ContinuityHandoffBrainItem = {
  id: string;
  label: string;
  posture: ContinuityHandoffPosture;
  detail: string;
};

export type ContinuityHandoffBrainPosture = {
  id: "continuity-handoff-brain-posture";
  canonicalGraphSchema: string;
  brainContinuityStatus: ContinuityHandoffPosture;
  snapshotStatus: ContinuityHandoffPosture;
  replayStatus: ContinuityHandoffPosture;
  restoreGateStatus: ContinuityHandoffPosture;
  governanceStatus: ContinuityHandoffPosture;
  mutationBoundaryStatus: ContinuityHandoffPosture;
  directUiMutationBlocked: boolean;
  saveBrainGraphFromUiBlocked: boolean;
  appendEventFromUiBlocked: boolean;
  latestMessageAuthorityPreserved: boolean;
  items: ContinuityHandoffBrainItem[];
  summary: string[];
};

export type ContinuityHandoffNextActionKind =
  | "run validation manually"
  | "fix failed smoke"
  | "review stabilization"
  | "review Brain continuity"
  | "review memory inbox"
  | "review runtime event journal"
  | "review snapshot restore gate"
  | "create next phase prompt"
  | "commit clean checkpoint"
  | "tag smoke-suite clean"
  | "stop and stabilize";

export type ContinuityHandoffNextAction = {
  id: string;
  action: ContinuityHandoffNextActionKind;
  title: string;
  detail: string;
  targetRoute: ContinuityHandoffRoute;
  priority: "primary" | "secondary";
  reviewRequired: boolean;
};

export type ContinuityHandoffNextActionPlan = {
  id: "continuity-handoff-next-action-plan";
  selected: ContinuityHandoffNextAction;
  orderedActions: ContinuityHandoffNextAction[];
  blockers: string[];
  summary: string[];
};

export type ContinuityHandoffPacketSection = {
  id: string;
  title: string;
  lines: string[];
};

export type ContinuityHandoffPacket = {
  id: string;
  title: string;
  sections: ContinuityHandoffPacketSection[];
  text: string;
  summary: string[];
};

export type ContinuityHandoffExport = {
  id: "continuity-handoff-export";
  markdownPacket: string;
  nextSessionPrompt: string;
  validationChecklist: string;
  rollbackChecklist: string;
  memoryReviewChecklist: string;
  clipboardPayload: string;
  summary: string[];
};

export type ContinuityHandoffSummary = {
  id: "continuity-handoff-summary";
  packetReady: boolean;
  riskCount: number;
  blockerCount: number;
  validationCommandCount: number;
  rollbackOptionCount: number;
  memoryPosture: ContinuityHandoffPosture;
  brainPosture: ContinuityHandoffPosture;
  nextSafeAction: ContinuityHandoffNextActionKind;
  summary: string[];
};

export type ContinuityHandoffInput = {
  productName?: string | null;
  branchLabel?: string | null;
  phaseLabel?: string | null;
  currentPosture?: ContinuityHandoffPosture | null;
  sourceSurfaces?: readonly string[] | null;
  activeRoutes?: readonly ContinuityHandoffRoute[] | null;
  continuityStatus?: ContinuityHandoffPosture | null;
  stabilizationStatus?: ContinuityHandoffPosture | null;
  brainPosture?: ContinuityHandoffPosture | null;
  memoryPosture?: ContinuityHandoffPosture | null;
  runtimeEventPosture?: ContinuityHandoffPosture | null;
  snapshotPosture?: ContinuityHandoffPosture | null;
  restorePosture?: ContinuityHandoffPosture | null;
  validationPosture?: ContinuityHandoffPosture | null;
  buildPassed?: boolean | null;
  smokePassed?: boolean | null;
  regressionRiskVisible?: boolean | null;
  mutationRiskVisible?: boolean | null;
  runtimeEventRiskVisible?: boolean | null;
  snapshotRiskVisible?: boolean | null;
  restoreRiskVisible?: boolean | null;
  validationRiskVisible?: boolean | null;
  latestMessageAuthorityPreserved?: boolean | null;
  pendingMemoryCandidates?: number | null;
  approvedMemoryEvents?: number | null;
  duplicateRisk?: ContinuityHandoffSeverity | null;
  contradictionRisk?: ContinuityHandoffSeverity | null;
};

export type ContinuityHandoffSession = {
  state: ContinuityHandoffState;
  risks: ContinuityHandoffRiskSummary;
  validationPlan: ContinuityHandoffValidationPlan;
  rollbackPosture: ContinuityHandoffRollbackPosture;
  memoryPosture: ContinuityHandoffMemoryPosture;
  brainPosture: ContinuityHandoffBrainPosture;
  nextActions: ContinuityHandoffNextActionPlan;
  packet: ContinuityHandoffPacket;
  exportPayload: ContinuityHandoffExport;
  sessionSummary: ContinuityHandoffSummary;
};

export const CONTINUITY_HANDOFF_VALIDATION_COMMANDS: readonly string[] = [
  "npm run build",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-continuity-handoff.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-continuity.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-global-activity-feed.ps1",
  "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-command-palette.ps1",
  "npm run smoke:codexforge:server",
  "git diff --check",
  "git status --short",
  "git diff --stat",
];

export function buildContinuityHandoffStableKey(
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

export function uniqueContinuityHandoffStrings(values?: readonly (string | null | undefined)[] | null): string[] {
  return Array.from(new Set((values ?? []).map((value) => String(value ?? "").trim()).filter(Boolean))).sort();
}

export function readContinuityHandoffCount(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return fallback;
  return Math.round(numeric);
}
