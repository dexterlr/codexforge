export type TestCommandBridgeStatus = "review-required" | "ready-for-trial" | "blocked";

export type TestCommandBridgeRiskLevel = "low" | "medium" | "high" | "blocked";

export type TestCommandBridge = {
  id: string;
  bridgeIdentity: string;
  sourceTestCommandPlanner: string;
  sourceCommandDryRunBridge: string;
  workspaceTrustDependency: string;
  permissionEnforcementDependency: string;
  recommendedCommandSummary: string;
  workingDirectoryScope: string;
  expectedDurationRisk: string;
  environmentSecretsSafetyNote: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: TestCommandBridgeStatus;
  riskLevel: TestCommandBridgeRiskLevel;
  advancedBridgeDetails: string;
};

export type TestCommandBridgeBoundary = {
  testCommandsRunFromPageAllowed: false;
  executionBehindApprovedLocalBoundaryRequired: true;
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

export type TestCommandBridgeModel = {
  title: "Test command bridge";
  summary: string;
  bridges: TestCommandBridge[];
  boundary: TestCommandBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildTestCommandBridgeStableKey(
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
