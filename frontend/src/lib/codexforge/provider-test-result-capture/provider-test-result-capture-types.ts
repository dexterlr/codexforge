export type ProviderTestResultStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "needs review";

export type ProviderTestResultCaptureRecord = {
  id: string;
  providerProfileSummary: string;
  liveTestGateReference: "/provider-live-test-gate";
  testScope: string;
  reviewedPromptSummary: string;
  resultStatus: ProviderTestResultStatus;
  responseSummary: string;
  latencySummary: string;
  tokenCostEstimateSummary: string;
  privacyNotes: string;
  nextRecommendedRoute: string;
  handoffCopy: string;
  rawResponseDetails: string;
};

export type ProviderTestResultCaptureBoundary = {
  secretsCapturedAllowed: false;
  apiKeysDisplayedAllowed: false;
  successClaimWithoutReviewedEvidenceAllowed: false;
  providerRegistryMutationAllowed: false;
  providerSendAllowedFromUi: false;
  automaticLiveTestAllowed: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type ProviderTestResultCaptureModel = {
  title: "Provider test result capture";
  summary: string;
  records: ProviderTestResultCaptureRecord[];
  boundary: ProviderTestResultCaptureBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderTestResultCaptureStableKey(
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
