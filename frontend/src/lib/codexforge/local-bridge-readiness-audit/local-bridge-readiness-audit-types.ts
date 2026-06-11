export type LocalBridgeReadinessAuditStatus = "ready-for-review" | "blocked";

export type LocalBridgeReadinessAudit = {
  id: string;
  localBridgeReadinessIdentity: string;
  coveredBridgeAreas: string[];
  healthBoundarySummary: string[];
  deniedLocalActions: string[];
  manualValidationChecklist: string[];
  blockedReadinessRisks: string[];
  providerRoutingRoute: string;
  connectorPermissionRoute: string;
  nextRecommendedAction: string;
  status: LocalBridgeReadinessAuditStatus;
  advancedLocalBridgeDetails: string;
};

export type LocalBridgeReadinessAuditBoundary = {
  localBridgeReadinessAuditReviewOnly: true;
  localBridgeAuditDoesNotCallLocalServices: true;
  localBridgeChecksRequireExplicitOperatorApproval: true;
  blockedLocalActionsStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localServiceCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  localProbeExecutionAllowedFromUi: false;
  localFileReadScanAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  tokenStorageAllowed: false;
  secretDisplayAllowed: false;
  processEnvDisplayAllowed: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type LocalBridgeReadinessAuditModel = {
  title: "Local bridge readiness audit";
  summary: string;
  audits: LocalBridgeReadinessAudit[];
  boundary: LocalBridgeReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalBridgeReadinessAuditStableKey(
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
