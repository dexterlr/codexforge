export type TestFailureRecoveryCategory =
  | "test failed"
  | "blocked"
  | "timed out"
  | "permission denied"
  | "scope mismatch"
  | "unknown";

export type TestFailureRecoveryRetryEligibility =
  | "eligible after review"
  | "not eligible"
  | "blocked";

export type TestFailureRecoveryBridge = {
  id: string;
  recoveryIdentity: string;
  sourceTestResultCapture: string;
  failureCategory: TestFailureRecoveryCategory;
  likelyCause: string;
  safeRecoveryChecklist: string[];
  retryEligibility: TestFailureRecoveryRetryEligibility;
  blockedRetryReasons: string[];
  patchPlanningRoute: string;
  commandRecoveryRoute: string;
  auditHandoff: string;
  advancedRecoveryDetails: string;
};

export type TestFailureRecoveryBridgeBoundary = {
  retryAutomaticAllowed: false;
  recoveryExecutesCommandsAllowed: false;
  automaticFixesPatchesAllowed: false;
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

export type TestFailureRecoveryBridgeModel = {
  title: "Test failure recovery bridge";
  summary: string;
  recoveries: TestFailureRecoveryBridge[];
  boundary: TestFailureRecoveryBridgeBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildTestFailureRecoveryBridgeStableKey(
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
