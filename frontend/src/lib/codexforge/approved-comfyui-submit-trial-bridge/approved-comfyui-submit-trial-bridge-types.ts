export type ApprovedComfyUiSubmitTrialBridgeStatus =
  | "explicit-approval-required"
  | "review-ready"
  | "blocked";

export type ApprovedComfyUiSubmitTrialBridge = {
  id: string;
  submitTrialIdentity: string;
  healthProbeDependency: string;
  metadataDependency: string;
  workflowValidatorDependency: string;
  approvedLocalBoundaryDependency: string;
  promptWorkflowSummary: string;
  allowedSubmitScope: string;
  deniedSubmitScope: string;
  timeoutCancelPolicy: string;
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: ApprovedComfyUiSubmitTrialBridgeStatus;
  advancedSubmitDetails: string;
};

export type ApprovedComfyUiSubmitTrialBridgeBoundary = {
  explicitApprovalRequired: true;
  noComfyUiRequestSentFromPage: true;
  localEndpointSecretsDisplayed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  promptWorkflowSendAllowedFromPage: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  rawFetchAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type ApprovedComfyUiSubmitTrialBridgeModel = {
  title: "Approved ComfyUI submit trial bridge";
  summary: string;
  trials: ApprovedComfyUiSubmitTrialBridge[];
  boundary: ApprovedComfyUiSubmitTrialBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildApprovedComfyUiSubmitTrialBridgeStableKey(
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
