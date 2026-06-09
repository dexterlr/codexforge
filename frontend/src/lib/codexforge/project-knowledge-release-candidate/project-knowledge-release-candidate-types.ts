export type ProjectKnowledgeReleaseDecision = "ready" | "ready with fixes" | "blocked";

export type ProjectKnowledgeReleaseCandidate = {
  id: string;
  releaseCandidateIdentity: string;
  coveredProjectKnowledgeSurfaces: string[];
  snapshotReadiness: string;
  timelineReadiness: string;
  decisionLogReadiness: string;
  runbookExportReadiness: string;
  memoryPromotionReadiness: string;
  knownGaps: string[];
  releaseDecision: ProjectKnowledgeReleaseDecision;
  nextRecommendedRoute: string;
  advancedReleaseDetails: string;
};

export type ProjectKnowledgeReleaseCandidateBoundary = {
  projectKnowledgeReleaseReviewOnly: true;
  projectFilesReadFromPage: false;
  memoryPromotedAutomatically: false;
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

export type ProjectKnowledgeReleaseCandidateModel = {
  title: "Project knowledge release candidate";
  summary: string;
  candidates: ProjectKnowledgeReleaseCandidate[];
  boundary: ProjectKnowledgeReleaseCandidateBoundary;
  releaseLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectKnowledgeReleaseCandidateStableKey(
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
