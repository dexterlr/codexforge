export type CodingLoopReleaseDecision = "ready" | "ready with fixes" | "blocked";

export type CodingLoopReadiness = "ready" | "needs review" | "blocked";

export type CodingLoopMvpAudit = {
  id: string;
  auditIdentity: string;
  coveredCodingLoopSurfaces: string[];
  projectIntelligenceReadiness: string;
  changePlanReadiness: string;
  patchPreviewReadiness: string;
  fileOperationReadiness: string;
  testOperationReadiness: string;
  gitOperationReadiness: string;
  patchApplyRollbackReadiness: string;
  reviewInboxReadiness: string;
  knownGaps: string[];
  releaseDecision: CodingLoopReleaseDecision;
  nextRecommendedRoute: string;
  advancedAuditDetails: string;
};

export type CodingLoopMvpAuditBoundary = {
  commandsExecutedFromAuditAllowed: false;
  patchApplyAllowedFromAudit: false;
  commitCreationAllowedFromAudit: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  rollbackAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  runCommandCallAllowedFromUi: false;
  brokerExecutionCallAllowedFromUi: false;
  localExecutorApiCallAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesInspectedOrDisplayedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type CodingLoopMvpAuditModel = {
  title: "Coding loop MVP audit";
  summary: string;
  audits: CodingLoopMvpAudit[];
  boundary: CodingLoopMvpAuditBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildCodingLoopMvpAuditStableKey(
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
