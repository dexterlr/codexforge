export type OpenAiCompatibleLiveTestCredentialReadiness =
  | "env-reference-ready"
  | "env-reference-missing"
  | "local-runtime-manual";

export type OpenAiCompatibleLiveTestGateStatus =
  | "gate-review-required"
  | "blocked-until-approved"
  | "handoff-only";

export type OpenAiCompatibleLiveTestClassification =
  | "cloud-provider"
  | "aggregator-cloud"
  | "local-compatible-runtime";

export type OpenAiCompatibleLiveTestPlan = {
  id: string;
  providerRuntimeIdentity: string;
  endpointPolicy: string;
  modelSelection: string;
  credentialReadiness: OpenAiCompatibleLiveTestCredentialReadiness;
  approvedTestPromptSummary: string;
  tokenSpendLimit: string;
  expectedResponseShape: string;
  liveTestGateStatus: OpenAiCompatibleLiveTestGateStatus;
  localVsCloudClassification: OpenAiCompatibleLiveTestClassification;
  resultHandoff: string;
  blockedReasons: string[];
  gateRoute: "/provider-live-test-gate";
};

export type OpenAiCompatibleLiveTestBoundary = {
  noAutomaticLiveTest: true;
  providerApiCallsAllowedFromUi: false;
  localRuntimeCallsAllowedFromUi: false;
  credentialDisplayAllowed: false;
  promptOrFileAutoSendAllowed: false;
  successClaimWithoutProvidedResultAllowed: false;
  localStorageApiKeyStorageAllowed: false;
};

export type OpenAiCompatibleLiveTestModel = {
  title: "OpenAI-compatible live test";
  summary: string;
  plans: OpenAiCompatibleLiveTestPlan[];
  boundary: OpenAiCompatibleLiveTestBoundary;
  gateLanguage: string[];
  advancedDetails: string[];
};

export function buildOpenAiCompatibleLiveTestStableKey(
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
