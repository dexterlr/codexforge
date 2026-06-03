export type ProviderLiveTestGateCredentialReadiness =
  | "credential-reference-ready"
  | "credential-reference-missing"
  | "manual-only";

export type ProviderLiveTestGateStatus =
  | "ready-for-review"
  | "blocked"
  | "handoff-only";

export type ProviderLiveTestGateChecklist = {
  id: string;
  providerProfileSummary: string;
  credentialReadiness: ProviderLiveTestGateCredentialReadiness;
  testScope: string;
  approvedTestPromptSummary: string;
  spendTokenLimit: string;
  networkCallApproval: string;
  privacyReview: string;
  expectedResponseShape: string;
  auditHandoffSummary: string;
  blockedReasons: string[];
  gateStatus: ProviderLiveTestGateStatus;
  executionBoundary: string;
};

export type ProviderLiveTestGateBoundary = {
  noAutomaticLiveTest: true;
  secretsDisplayedAllowed: false;
  promptOrFileAutoSendAllowed: false;
  networkCallRequiresExplicitApproval: true;
  providerRegistryMutationAllowed: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  arbitraryCloudCallsAllowed: false;
  backendBoundaryRequired: true;
};

export type ProviderLiveTestGateModel = {
  title: "AI provider live test gate";
  summary: string;
  checklists: ProviderLiveTestGateChecklist[];
  boundary: ProviderLiveTestGateBoundary;
  sharedGateLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderLiveTestGateStableKey(
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
