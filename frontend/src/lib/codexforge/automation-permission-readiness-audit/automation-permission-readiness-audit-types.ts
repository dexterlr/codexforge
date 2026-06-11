export type AutomationPermissionReadinessAuditStatus = "ready-for-review" | "blocked";

export type AutomationPermissionReadinessAudit = {
  id: string;
  automationPermissionIdentity: string;
  automationGroups: string[];
  scheduleWatchTaskPermissionPreview: string[];
  deniedAutomationActions: string[];
  notificationRedactionRules: string[];
  manualValidationChecklist: string[];
  blockedAutomationRisks: string[];
  localBridgeRoute: string;
  providerRoutingRoute: string;
  nextRecommendedAction: string;
  status: AutomationPermissionReadinessAuditStatus;
  advancedAutomationDetails: string;
};

export type AutomationPermissionReadinessAuditBoundary = {
  automationPermissionReadinessAuditReviewOnly: true;
  automationPermissionAuditDoesNotCreateSchedulesOrTasks: true;
  automationsRequireExplicitApproval: true;
  blockedAutomationsStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  watchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  permissionGrantPersistenceAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerTrafficAllowedFromUi: false;
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

export type AutomationPermissionReadinessAuditModel = {
  title: "Automation permission readiness audit";
  summary: string;
  audits: AutomationPermissionReadinessAudit[];
  boundary: AutomationPermissionReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildAutomationPermissionReadinessAuditStableKey(
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
