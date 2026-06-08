export type WorkflowPackageValidatorLiveBridgeStatus =
  | "ready-for-submit-trial-review"
  | "needs-review"
  | "blocked";

export type WorkflowPackageValidatorLiveBridge = {
  id: string;
  validatorIdentity: string;
  sourceMetadataBridge: string;
  workflowPackageSummary: string;
  requiredNodeModelSummary: string;
  missingDependencySummary: string;
  compatibilityStatus: string;
  riskSecretsRedactionStatus: string;
  submitTrialRoute: string;
  recoveryRoute: string;
  blockedReasons: string[];
  status: WorkflowPackageValidatorLiveBridgeStatus;
  advancedValidationDetails: string;
};

export type WorkflowPackageValidatorLiveBridgeBoundary = {
  preparedWorkflowPackageOnly: true;
  workflowValidationMutatesFiles: false;
  validationSubmitsComfyUiJobs: false;
  arbitraryLocalFileBrowsingAllowed: false;
  secretDisplayAllowed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
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

export type WorkflowPackageValidatorLiveBridgeModel = {
  title: "Workflow package validator live bridge";
  summary: string;
  validators: WorkflowPackageValidatorLiveBridge[];
  boundary: WorkflowPackageValidatorLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildWorkflowPackageValidatorLiveBridgeStableKey(
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
