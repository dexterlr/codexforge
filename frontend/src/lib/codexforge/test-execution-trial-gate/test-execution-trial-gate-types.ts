export type TestExecutionTrialStatus = "review-required" | "not-approved" | "blocked";

export type TestExecutionTrialWorkspaceTrustStatus =
  | "trusted-for-review"
  | "review-required"
  | "blocked";

export type TestExecutionTrial = {
  id: string;
  executionTrialIdentity: string;
  testCommandBridgeDependency: string;
  commandExecutionTrialDependency: string;
  workspaceTrustStatus: TestExecutionTrialWorkspaceTrustStatus;
  allowedCommandScope: string;
  deniedCommandScope: string;
  timeoutPolicy: string;
  expectedOutputShape: string;
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: TestExecutionTrialStatus;
  advancedTrialDetails: string;
};

export type TestExecutionTrialGateBoundary = {
  testsExecutedFromPageAllowed: false;
  approvedLocalBoundaryRequiredBeforeTestExecution: true;
  envValuesSecretsExposedAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
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
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type TestExecutionTrialGateModel = {
  title: "Test execution trial gate";
  summary: string;
  trials: TestExecutionTrial[];
  boundary: TestExecutionTrialGateBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildTestExecutionTrialGateStableKey(
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
