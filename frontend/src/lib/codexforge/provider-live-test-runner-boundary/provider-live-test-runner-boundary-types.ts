export type ProviderLiveTestRunnerBoundaryStatus =
  | "approval-required"
  | "blocked";

export type ProviderLiveTestRunnerBoundaryReview = {
  id: string;
  runnerBoundaryIdentity: string;
  providerAccountDependency: string;
  providerPolicyDependency: string;
  promptPrivacyClassification: string;
  budgetCostGuardrail: string;
  modelEndpointSummary: string;
  testPayloadSummary: string;
  approvalRequirement: string;
  resultCaptureRoute: string;
  blockedReasons: string[];
  status: ProviderLiveTestRunnerBoundaryStatus;
  advancedProviderDetails: string;
};

export type ProviderLiveTestRunnerBoundary = {
  explicitApprovalRequired: true;
  providerLiveTestsRunAutomaticallyAllowed: false;
  providerApiCallsAllowedFromUi: false;
  openAiCompatibleApiCallsAllowedFromUi: false;
  promptOrFileAutoSendAllowed: false;
  automaticProviderSendAllowed: false;
  autoSpendTokensAllowed: false;
  apiKeysDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
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
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type ProviderLiveTestRunnerBoundaryModel = {
  title: "Provider live test runner boundary";
  summary: string;
  reviews: ProviderLiveTestRunnerBoundaryReview[];
  boundary: ProviderLiveTestRunnerBoundary;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderLiveTestRunnerBoundaryStableKey(
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
