import type {
  BrainMutationBoundaryRegistry,
  BrainMutationGovernanceSession,
  BrainMutationGovernanceSummary,
  BrainMutationIntegrityReport,
  BrainMutationPolicy,
  BrainMutationRiskBoard,
  DirectMutationDetectorReport,
  ReducerImpactGovernance,
} from "./brain-mutation-governance-types";
import { buildBrainMutationBoundaryRegistry } from "./mutation-boundary-registry";
import { buildBrainMutationPolicy } from "./mutation-policy-model";
import { buildDirectMutationDetectorReport } from "./direct-mutation-detector";
import { buildReducerImpactGovernance } from "./reducer-impact-governance";
import { buildBrainMutationIntegrityReport } from "./mutation-integrity-report";
import { buildBrainMutationRiskBoard } from "./mutation-risk-board";
import { buildBrainMutationGovernanceNextActionPlan } from "./governance-next-action";

export function buildBrainMutationGovernanceSummary(input: {
  registry?: BrainMutationBoundaryRegistry | null;
  policy?: BrainMutationPolicy | null;
  detectorReport?: DirectMutationDetectorReport | null;
  reducerGovernance?: ReducerImpactGovernance | null;
  integrityReport?: BrainMutationIntegrityReport | null;
  riskBoard?: BrainMutationRiskBoard | null;
  nextSafeAction?: string | null;
} = {}): BrainMutationGovernanceSummary {
  const registry = input.registry ?? buildBrainMutationBoundaryRegistry();
  const detectorReport = input.detectorReport ?? buildDirectMutationDetectorReport();
  const reducerGovernance = input.reducerGovernance ?? buildReducerImpactGovernance();
  const integrityReport = input.integrityReport ?? buildBrainMutationIntegrityReport();
  const riskBoard = input.riskBoard ?? buildBrainMutationRiskBoard();
  const policy = input.policy ?? buildBrainMutationPolicy();
  const blockedDirectMutationCount = detectorReport.blockedSignalCount;
  const integrityRiskCount = integrityReport.riskCount + integrityReport.blockerCount + integrityReport.warningCount;
  const overallPosture: BrainMutationGovernanceSummary["overallPosture"] =
    integrityReport.blockerCount > 0 || blockedDirectMutationCount > 0
      ? "blocked"
      : integrityRiskCount > 0 || !policy.satisfied
        ? "review-required"
        : "read-only";

  const summary: BrainMutationGovernanceSummary = {
    id: "brain-mutation-governance-summary",
    boundaryCount: registry.boundaryCount,
    guardedBoundaryCount: registry.guardedBoundaryCount,
    blockedDirectMutationCount,
    integrityPassCount: integrityReport.passCount,
    integrityRiskCount,
    reducerGovernedEventCount: reducerGovernance.governedEventCount,
    topRisk: riskBoard.topRisk?.title ?? "No top risk",
    nextSafeAction: input.nextSafeAction ?? "Review brain mutation governance.",
    overallPosture,
    summary: [],
  };

  return { ...summary, summary: summarizeBrainMutationGovernanceSession(summary) };
}

export function buildBrainMutationGovernanceSession(): BrainMutationGovernanceSession {
  const registry = buildBrainMutationBoundaryRegistry();
  const policy = buildBrainMutationPolicy({
    eventType: "memory.promoted",
    approvalConfirmed: false,
    evidenceRefs: [],
    policyConfirmed: false,
    reducerPreviewVisible: true,
    auditJournalVisible: true,
  });
  const detectorReport = buildDirectMutationDetectorReport({
    moduleLabels: [
      "Runtime Event Executor boundary",
      "Memory Promotion Gate policy",
      "Runtime Event Journal read-only audit",
    ],
    importLabels: ["canonical graph schema import"],
    uiActionLabels: ["governance UI read-only summary copy"],
    mutationHints: [
      "appendEvent in UI component label",
      "brain-graph import",
      "saveBrainGraph from UI without gate",
    ],
    routeLabels: ["/brain-governance"],
  });
  const reducerGovernance = buildReducerImpactGovernance();
  const integrityReport = buildBrainMutationIntegrityReport({
    canonicalGraphSchemaPathVisible: true,
    runtimeEventExecutorExists: true,
    runtimeEventJournalExists: true,
    memoryPromotionGateExists: true,
    directUiMutationBlocked: true,
    appendEventUiCallsAbsent: true,
    reducerPreviewAvailable: true,
    policyConfirmationVisible: true,
    auditLedgerVisible: true,
    smokeCoveragePresent: true,
    legacyBrainGraphImportAbsent: true,
    latestMessageAuthorityPreserved: true,
  });
  const riskBoard = buildBrainMutationRiskBoard();
  const nextActionPlan = buildBrainMutationGovernanceNextActionPlan({
    detectorReport,
    integrityReport,
    reducerGovernance,
    riskBoard,
  });
  const summary = buildBrainMutationGovernanceSummary({
    registry,
    policy,
    detectorReport,
    reducerGovernance,
    integrityReport,
    riskBoard,
    nextSafeAction: nextActionPlan.selected.action,
  });

  return {
    registry,
    policy,
    detectorReport,
    reducerGovernance,
    integrityReport,
    riskBoard,
    nextActionPlan,
    summary,
  };
}

export function summarizeBrainMutationGovernanceSession(
  summaryOrSession: BrainMutationGovernanceSummary | BrainMutationGovernanceSession
): string[] {
  const summary = "summary" in summaryOrSession && !Array.isArray(summaryOrSession.summary)
    ? summaryOrSession.summary
    : summaryOrSession as BrainMutationGovernanceSummary;
  return [
    `${summary.boundaryCount} boundaries, ${summary.guardedBoundaryCount} guarded/request-ready boundaries, and ${summary.blockedDirectMutationCount} blocked direct mutation signals.`,
    `${summary.integrityPassCount} integrity checks pass; ${summary.integrityRiskCount} integrity warnings, risks, or blockers are visible.`,
    `${summary.reducerGovernedEventCount} reducer-governed event types; top risk is ${summary.topRisk}.`,
    `Overall posture: ${summary.overallPosture}. Next safe action: ${summary.nextSafeAction}.`,
  ];
}
