export type OperatorNotificationCenterShellStatus = "shell ready" | "blocked";

export type OperatorNotificationCenterShell = {
  id: string;
  notificationCenterIdentity: string;
  sourceConnectorResearchOperatorLoops: string[];
  notificationCategories: string[];
  priorityPolicy: string[];
  privacyRedactionPolicy: string[];
  deliveryChannelNonGoals: string[];
  reminderBoundaryRoute: string;
  scheduledResearchBoundaryRoute: string;
  blockedReasons: string[];
  status: OperatorNotificationCenterShellStatus;
  advancedNotificationDetails: string;
};

export type OperatorNotificationCenterShellBoundary = {
  operatorNotificationCenterShellOnly: true;
  notificationCenterDoesNotSendNotificationsYet: true;
  notificationDeliveryRequiresExplicitApproval: true;
  privateConnectorResearchDetailsStayRedacted: true;
  notificationSendAllowedFromUi: false;
  notificationDeliveryAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorTokenStorageAllowedFromUi: false;
  browserTokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  tokensDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  privateConnectorValuesDisplayedAllowed: false;
  connectorDataReadFromPageAllowed: false;
  connectorSyncAllowedFromUi: false;
  automaticConnectorReadsAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
  emailDraftSendAllowedFromUi: false;
  calendarEventMutationAllowedFromUi: false;
  contactMutationAllowedFromUi: false;
  connectorEvidenceAutoIngestionAllowed: false;
  connectorEvidenceAutoPromotionAllowed: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  automaticProviderCallsAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptFileSourceConnectorAutoSendAllowed: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type OperatorNotificationCenterShellModel = {
  title: "Operator notification center shell";
  summary: string;
  centers: OperatorNotificationCenterShell[];
  boundary: OperatorNotificationCenterShellBoundary;
  notificationLanguage: string[];
  advancedDetails: string[];
};

export function buildOperatorNotificationCenterShellStableKey(
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
