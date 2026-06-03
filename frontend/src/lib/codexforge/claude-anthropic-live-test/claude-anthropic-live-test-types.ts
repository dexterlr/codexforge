export type ClaudeAnthropicCredentialReadiness =
  | "official-api-reference-missing"
  | "official-api-reference-ready"
  | "manual-browser-only";

export type ClaudeAnthropicGateStatus =
  | "blocked-until-approved"
  | "privacy-review-required"
  | "handoff-only";

export type ClaudeAnthropicLiveTestPlan = {
  id: string;
  providerProfile: string;
  modelFamily: string;
  credentialReadiness: ClaudeAnthropicCredentialReadiness;
  approvedTestPromptSummary: string;
  privacyReview: string;
  spendTokenLimit: string;
  expectedResponseShape: string;
  liveTestGateStatus: ClaudeAnthropicGateStatus;
  resultHandoff: string;
  blockedReasons: string[];
  gateRoute: "/provider-live-test-gate";
};

export type ClaudeAnthropicLiveTestBoundary = {
  noAutomaticLiveTest: true;
  anthropicApiCallsAllowedFromUi: false;
  credentialDisplayAllowed: false;
  promptOrFileAutoSendAllowed: false;
  browserLoginAutomationAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  privacyReviewRequired: true;
};

export type ClaudeAnthropicLiveTestModel = {
  title: "Claude Anthropic live test";
  summary: string;
  plans: ClaudeAnthropicLiveTestPlan[];
  boundary: ClaudeAnthropicLiveTestBoundary;
  gateLanguage: string[];
  advancedDetails: string[];
};

export function buildClaudeAnthropicLiveTestStableKey(
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
