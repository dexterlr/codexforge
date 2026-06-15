export type UnifiedExecutionBoundaryGapReportStatus = "ready-for-review" | "blocked";

export type UnifiedExecutionBoundaryGapReport = {
  id: string;
  unifiedExecutionGapIdentity: string;
  executionBoundaryGroups: string[];
  providerLocalConnectorAutomationStatus: string[];
  fileTestExecutionStatus: string[];
  evidenceLoggingAuditStatus: string[];
  highestRiskGaps: string[];
  deniedGapReportActions: string[];
  unresolvedExecutionGaps: string[];
  firstApprovedProviderTrialRoute: string;
  firstApprovedLocalModelTrialRoute: string;
  nextRecommendedAction: string;
  status: UnifiedExecutionBoundaryGapReportStatus;
  advancedUnifiedExecutionGapDetails: string;
};

export type UnifiedExecutionBoundaryGapReportBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  boundaryProbeExecutionAllowedFromUi: false;
  backendCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type UnifiedExecutionBoundaryGapReportModel = {
  title: "Unified execution boundary gap report";
  summary: string;
  gapReports: UnifiedExecutionBoundaryGapReport[];
  boundary: UnifiedExecutionBoundaryGapReportBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildUnifiedExecutionBoundaryGapReportStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
