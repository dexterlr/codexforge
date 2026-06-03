export type PromptPrivacyClass =
  | "public"
  | "internal"
  | "sensitive"
  | "blocked";

export type PromptProviderSendReadiness =
  | "local-first"
  | "needs-redaction"
  | "blocked-until-approval";

export type PromptPrivacyClassifierItem = {
  id: string;
  promptContextSummary: string;
  privacyClass: PromptPrivacyClass;
  sensitiveDataFlags: string[];
  fileContextSendRisk: string;
  localFirstRecommendation: string;
  providerSendReadiness: PromptProviderSendReadiness;
  redactionGuidance: string;
  approvalRequirement: string;
  blockedReasons: string[];
  handoffRoute: string;
  rawSensitiveContentHandling: string;
};

export type PromptPrivacyClassifierBoundary = {
  classificationSendsPromptsAllowed: false;
  promptOrFileAutoSendAllowed: false;
  providerApiCallsAllowedFromUi: false;
  fileUploadAllowed: false;
  rawSensitiveContentAboveFoldAllowed: false;
  memoryAutoStorageAllowed: false;
  memoryAutoPromotionAllowed: false;
  providerRegistryMutationAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  brainGraphMutationAllowed: false;
};

export type PromptPrivacyClassifierModel = {
  title: "Prompt privacy classifier";
  summary: string;
  classifications: PromptPrivacyClassifierItem[];
  boundary: PromptPrivacyClassifierBoundary;
  classifierLanguage: string[];
  advancedDetails: string[];
};

export function buildPromptPrivacyClassifierStableKey(
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
