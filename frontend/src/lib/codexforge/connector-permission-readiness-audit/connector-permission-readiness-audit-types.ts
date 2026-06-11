export type ConnectorPermissionReadinessAuditStatus = "ready-for-review" | "blocked";

export type ConnectorPermissionReadinessAudit = {
  id: string;
  connectorPermissionIdentity: string;
  connectorGroups: string[];
  permissionScopes: string[];
  redactionPrivacyRules: string[];
  deniedConnectorActions: string[];
  manualValidationChecklist: string[];
  blockedConnectorRisks: string[];
  automationPermissionRoute: string;
  providerRoutingRoute: string;
  nextRecommendedAction: string;
  status: ConnectorPermissionReadinessAuditStatus;
  advancedConnectorDetails: string;
};

export type ConnectorPermissionReadinessAuditBoundary = {
  connectorPermissionReadinessAuditReviewOnly: true;
  connectorPermissionAuditDoesNotConnectAccounts: true;
  connectorAccessRequiresExplicitApproval: true;
  privateConnectorDetailsStayRedactedUntilApproved: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  gmailConnectionAllowedFromUi: false;
  calendarConnectionAllowedFromUi: false;
  contactsConnectionAllowedFromUi: false;
  connectorTokenStorageAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  privateConnectorDetailsDisplayedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localServiceCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  localFileReadScanAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ConnectorPermissionReadinessAuditModel = {
  title: "Connector permission readiness audit";
  summary: string;
  audits: ConnectorPermissionReadinessAudit[];
  boundary: ConnectorPermissionReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorPermissionReadinessAuditStableKey(
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
