export type ProjectMemoryPromotionBoundaryStatus = "ready-for-review" | "blocked";

export type ProjectMemoryPromotionBoundaryReview = {
  id: string;
  status: ProjectMemoryPromotionBoundaryStatus;
  promotionBoundaryIdentity: string;
  sourceSnapshotTimelineDecisionLogRunbook: string;
  candidateKnowledgeSummary: string;
  allowedPromotionScope: string[];
  deniedPromotionScope: string[];
  redactionPrivacyChecklist: string[];
  approvalRequirement: string;
  knowledgeReleaseRoute: string;
  blockedReasons: string[];
  advancedMemoryDetails: string;
};

export type ProjectMemoryPromotionBoundaryPolicy = {
  memoryPromotionRequiresExplicitReview: true;
  projectMemoryPromotedFromPage: false;
  secretsAndLocalPathsRedacted: true;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  runbookFileWriteAllowedFromUi: false;
  runbookExportAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ProjectMemoryPromotionBoundaryModel = {
  title: "Project memory promotion boundary";
  summary: string;
  reviews: ProjectMemoryPromotionBoundaryReview[];
  boundary: ProjectMemoryPromotionBoundaryPolicy;
  promotionLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectMemoryPromotionBoundaryStableKey(
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
