export type ProviderRunbookReviewStatus =
  | "ready-for-review"
  | "needs-approval"
  | "blocked";

export type ProviderRunbook = {
  id: string;
  runbookIdentity: string;
  providerSetupChecklist: string[];
  credentialSafetyChecklist: string[];
  liveTestGateChecklist: string[];
  privacyClassifierStep: string;
  budgetGuardrailStep: string;
  failureRecoveryStep: string;
  auditReviewStep: string;
  manualOnlyCommandsHandoff: string;
  excludedSecretsNote: string;
  reviewStatus: ProviderRunbookReviewStatus;
  advancedRunbookDetails: string;
};

export type ProviderRunbookGeneratorBoundary = {
  runbooksIncludeSecretsAllowed: false;
  shellCommandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  apiKeyExportAllowed: false;
  credentialStorageAllowed: false;
  automaticLiveTestAllowed: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  providerRegistryMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
};

export type ProviderRunbookGeneratorModel = {
  title: "Provider runbook generator";
  summary: string;
  runbooks: ProviderRunbook[];
  boundary: ProviderRunbookGeneratorBoundary;
  runbookLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderRunbookGeneratorStableKey(
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
