export type TestResultStatus = "passed" | "failed" | "blocked" | "timed out" | "needs review";

export type TestResultSummary = {
  id: string;
  resultIdentity: string;
  sourceExecutionRequest: string;
  status: TestResultStatus;
  commandSummary: string;
  outputSummary: string;
  failureSummary: string;
  changedRiskFollowUp: string;
  patchResultRoute: string;
  reviewInboxHandoff: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedRawOutputDetails: string;
};

export type TestResultSummarizerBoundary = {
  resultsReviewedBeforePromotionRequired: true;
  rawOutputPrimaryAllowed: false;
  memoryAutoPromotionAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testsRunFromPageAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type TestResultSummarizerModel = {
  title: "Test result summarizer";
  summary: string;
  results: TestResultSummary[];
  boundary: TestResultSummarizerBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildTestResultSummarizerStableKey(
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
