export type MultiProviderLiveTestProvider = "Gemini" | "DeepSeek" | "OpenRouter";

export type MultiProviderCredentialReadiness =
  | "credential-reference-missing"
  | "credential-reference-ready"
  | "aggregator-reference-required";

export type MultiProviderGateStatus =
  | "blocked-until-approved"
  | "provider-review-required"
  | "handoff-only";

export type MultiProviderLiveTestPlan = {
  id: string;
  selectedProvider: MultiProviderLiveTestProvider;
  modelRuntimeIdentity: string;
  credentialReadiness: MultiProviderCredentialReadiness;
  endpointNetworkPolicy: string;
  approvedTestPromptSummary: string;
  spendTokenLimit: string;
  privacyReview: string;
  expectedResponseShape: string;
  liveTestGateStatus: MultiProviderGateStatus;
  providerSpecificBlockedReasons: string[];
  resultHandoff: string;
  gateRoute: "/provider-live-test-gate";
};

export type MultiProviderLiveTestBoundary = {
  noAutomaticLiveTest: true;
  providerApiCallsAllowedFromUi: false;
  credentialDisplayAllowed: false;
  promptOrFileAutoSendAllowed: false;
  providerSpecificShortcutAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  providerRegistryMutationAllowed: false;
};

export type MultiProviderLiveTestModel = {
  title: "Gemini DeepSeek OpenRouter live test";
  summary: string;
  plans: MultiProviderLiveTestPlan[];
  boundary: MultiProviderLiveTestBoundary;
  gateLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiProviderLiveTestStableKey(
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
