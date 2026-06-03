export type TestCommandPlanRiskLevel = "low" | "medium" | "high" | "blocked";

export type TestCommandPlanStatus = "review-required" | "ready-for-approval" | "blocked";

export type TestCommandPlan = {
  id: string;
  testPlanIdentity: string;
  sourceChangePlanPatchResult: string;
  recommendedCommandSummary: string;
  workingDirectoryScope: string;
  expectedDurationRisk: string;
  environmentSecretsSafetyNote: string;
  requiredApproval: string;
  commandApprovalRoute: string;
  executionApprovalRoute: string;
  blockedReasons: string[];
  riskLevel: TestCommandPlanRiskLevel;
  status: TestCommandPlanStatus;
  advancedCommandDetails: string;
};

export type TestCommandPlannerBoundary = {
  planningOnly: true;
  testsRunFromPageAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  shellExecutionWithoutApprovalAllowed: false;
  runCommandCallAllowedFromUi: false;
  brokerExecutionCallAllowedFromUi: false;
  localExecutorApiCallAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  environmentValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type TestCommandPlannerModel = {
  title: "Test command planner";
  summary: string;
  plans: TestCommandPlan[];
  boundary: TestCommandPlannerBoundary;
  planningLanguage: string[];
  advancedDetails: string[];
};

export function buildTestCommandPlannerStableKey(
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
