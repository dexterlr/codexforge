export type ProviderRoutingReadinessAuditStatus = "ready-for-review" | "blocked";

export type ProviderRoutingReadinessAudit = {
  id: string;
  providerRoutingReadinessIdentity: string;
  providerGroups: string[];
  modelRoutingPreview: string[];
  deniedRoutingPaths: string[];
  keyTokenSafetyRules: string[];
  manualValidationChecklist: string[];
  blockedProviderRisks: string[];
  connectorPermissionRoute: string;
  automationPermissionRoute: string;
  nextRecommendedAction: string;
  status: ProviderRoutingReadinessAuditStatus;
  advancedProviderDetails: string;
};

export type ProviderRoutingReadinessAuditBoundary = {
  providerRoutingReadinessAuditReviewOnly: true;
  providerRoutingAuditDoesNotSendProviderTraffic: true;
  providerRoutingRequiresExplicitApproval: true;
  keysAndTokensNeverDisplayedOrStoredHere: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  providerKeyStorageAllowedFromUi: false;
  providerTokenStorageAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
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

export type ProviderRoutingReadinessAuditModel = {
  title: "Provider routing readiness audit";
  summary: string;
  audits: ProviderRoutingReadinessAudit[];
  boundary: ProviderRoutingReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderRoutingReadinessAuditStableKey(
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
