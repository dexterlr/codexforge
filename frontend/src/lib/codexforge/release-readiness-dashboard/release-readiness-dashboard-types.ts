export type ReleaseReadinessDashboardStatus = "ready-for-review" | "blocked";

export type ReleaseReadinessDashboard = {
  id: string;
  releaseReadinessDashboardIdentity: string;
  readinessGroups: string[];
  smokeBuildDocsStatusChecklist: string[];
  approvalEvidenceResultRecoveryHardeningChecklist: string[];
  liveCapableLaneReadinessChecklist: string[];
  deniedReadinessActions: string[];
  unresolvedReleaseRisks: string[];
  foundation500MilestoneRoute: string;
  firstRealDailyWorkflowCandidateRoute: string;
  nextRecommendedAction: string;
  status: ReleaseReadinessDashboardStatus;
  advancedReadinessDetails: string;
};

export type ReleaseReadinessDashboardBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  releaseReadinessDashboardDoesNotApproveRelease: true;
  releaseReadinessRequiresExplicitOperatorApproval: true;
  unresolvedReleaseRisksStayBlocked: true;
  releaseApprovalAllowedFromUi: false;
  ciPassedClaimedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  recoveryTriggerAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type ReleaseReadinessDashboardModel = {
  title: "Release readiness dashboard";
  summary: string;
  dashboards: ReleaseReadinessDashboard[];
  boundary: ReleaseReadinessDashboardBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildReleaseReadinessDashboardStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
