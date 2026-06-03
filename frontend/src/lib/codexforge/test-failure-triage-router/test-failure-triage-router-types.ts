export type TestFailureCauseCategory =
  | "test regression"
  | "build issue"
  | "environment issue"
  | "timeout"
  | "approval blocked"
  | "unknown";

export type TestFailureSeverity = "low" | "medium" | "high" | "blocked";

export type TestFailureRetryEligibility = "eligible after review" | "not eligible" | "blocked";

export type TestFailureTriage = {
  id: string;
  failureIdentity: string;
  sourceTestResult: string;
  likelyCauseCategory: TestFailureCauseCategory;
  severity: TestFailureSeverity;
  safeNextAction: string;
  recommendedRoute: string;
  retryEligibility: TestFailureRetryEligibility;
  blockedRetryReasons: string[];
  patchPlanningRoute: string;
  recoveryHandoff: string;
  advancedTriageDetails: string;
};

export type TestFailureTriageRouterBoundary = {
  triageAutoFixAllowed: false;
  retryAutomaticAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testsRunFromPageAllowed: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type TestFailureTriageRouterModel = {
  title: "Test failure triage router";
  summary: string;
  triageItems: TestFailureTriage[];
  boundary: TestFailureTriageRouterBoundary;
  triageLanguage: string[];
  advancedDetails: string[];
};

export function buildTestFailureTriageRouterStableKey(
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
