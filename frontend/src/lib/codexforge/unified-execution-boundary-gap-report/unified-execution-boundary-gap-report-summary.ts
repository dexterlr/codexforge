import type { UnifiedExecutionBoundaryGapReport, UnifiedExecutionBoundaryGapReportBoundary, UnifiedExecutionBoundaryGapReportModel } from "./unified-execution-boundary-gap-report-types";
import { buildUnifiedExecutionBoundaryGapReportStableKey } from "./unified-execution-boundary-gap-report-types";

export const UNIFIED_EXECUTION_BOUNDARY_GAP_REPORT_LANGUAGE = [
  "Unified execution boundary gap report",
  "Unified execution boundary gap report does not run probes",
  "Execution gaps require implementation and explicit approval before use",
  "Review UI is not proof of live execution",
  "Execution boundary groups",
  "Highest-risk gaps",
] as const;

export function buildUnifiedExecutionBoundaryGapReport(input: Omit<UnifiedExecutionBoundaryGapReport, "id"> & { idHint: string }): UnifiedExecutionBoundaryGapReport {
  const { idHint, ...report } = input;
  return { id: buildUnifiedExecutionBoundaryGapReportStableKey("unified-execution-boundary-gap-report", idHint, input.status), ...report };
}

export function buildUnifiedExecutionBoundaryGapReports(): UnifiedExecutionBoundaryGapReport[] {
  return [
    buildUnifiedExecutionBoundaryGapReport({
      idHint: "unified-execution-gap-review-packet",
      status: "blocked",
      unifiedExecutionGapIdentity: "Unified execution gap identity: unified-execution-boundary-gap-report-unified-execution-gap-review-packet.",
      executionBoundaryGroups: [
        "Execution boundary groups: provider, local model, connector, automation, file mutation, test execution, evidence logging, audit retention, rollback, credential, and operator approval boundaries.",
      ],
      providerLocalConnectorAutomationStatus: [
        "Provider/local/connector/automation status: review pages exist, but live execution still requires bounded implementations and explicit approval outside this page.",
      ],
      fileTestExecutionStatus: [
        "File/test execution status: file mutation and test execution readiness are review-only; no file writes, patch apply behavior, command execution, or test runs are triggered here.",
      ],
      evidenceLoggingAuditStatus: [
        "Evidence/logging/audit status: output capture, redaction, audit owner, retention, and rejection rules remain gaps until implemented and approved separately.",
      ],
      highestRiskGaps: [
        "Highest-risk gaps: missing approved execution implementations, missing credential boundary, missing output retention policy, missing rollback owner, and missing explicit approval enforcement.",
      ],
      deniedGapReportActions: [
        "Denied gap report actions: run probes, call backends, call providers, call local models, call connectors, create automations, mutate files, run tests, persist settings, or claim live execution works.",
      ],
      unresolvedExecutionGaps: [
        "Unresolved execution gaps: implementation, approval, audit, rollback, credential, output retention, and result evidence gaps remain blocked until approved outside this review UI.",
      ],
      firstApprovedProviderTrialRoute: "First approved provider trial route: /first-approved-provider-execution-trial reviews provider trial readiness without calling providers.",
      firstApprovedLocalModelTrialRoute: "First approved local model trial route: /first-approved-local-model-execution-trial reviews local model trial readiness without calling local models.",
      nextRecommendedAction: "Next recommended action: keep all execution paths blocked while provider, local model, connector, automation, file, test, evidence, audit, and rollback gaps are implemented and approved outside this page.",
      advancedUnifiedExecutionGapDetails: "Advanced unified execution gap details: Unified execution boundary gap report is review-only. Unified execution boundary gap report does not run probes, execution gaps require implementation and explicit approval before use, and review UI is not proof of live execution. It does not call backends, providers, local models, connectors, local bridge endpoints, create automations, mutate files, run tests, persist settings, store outputs, persist approvals, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedExecutionBoundaryGapReportBoundary(): UnifiedExecutionBoundaryGapReportBoundary {
  return { reviewOnly: true, approvalRequired: true, boundaryProbeExecutionAllowedFromUi: false, backendCallsAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, testBuildSmokeExecutionAllowedFromUi: false, settingsPersistenceAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeUnifiedExecutionBoundaryGapReport(model: Pick<UnifiedExecutionBoundaryGapReportModel, "gapReports">): string {
  return "Unified execution boundary gap report summarizes " + model.gapReports.length + " execution gap report packet. Unified execution boundary gap report does not run probes, execution gaps require implementation and explicit approval before use, and review UI is not proof of live execution.";
}

export function buildUnifiedExecutionBoundaryGapReportModel(): UnifiedExecutionBoundaryGapReportModel {
  const gapReports = buildUnifiedExecutionBoundaryGapReports();
  const model: UnifiedExecutionBoundaryGapReportModel = {
    title: "Unified execution boundary gap report",
    summary: "",
    gapReports,
    boundary: buildUnifiedExecutionBoundaryGapReportBoundary(),
    language: [...UNIFIED_EXECUTION_BOUNDARY_GAP_REPORT_LANGUAGE],
    advancedDetails: [
      "Unified execution boundary gap report",
      "Unified execution gap identity",
      "Execution boundary groups",
      "Provider/local/connector/automation status",
      "File/test execution status",
      "Evidence/logging/audit status",
      "Highest-risk gaps",
      "Denied gap report actions",
      "Unresolved execution gaps",
      "First approved provider trial route",
      "First approved local model trial route",
      "Next recommended action",
      "Unified execution boundary gap report does not run probes",
      "Execution gaps require implementation and explicit approval before use",
      "Review UI is not proof of live execution",
      "advanced unified execution gap details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedExecutionBoundaryGapReport(model) };
}
