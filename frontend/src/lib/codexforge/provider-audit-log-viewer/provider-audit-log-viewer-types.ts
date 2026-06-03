export type ProviderAuditActionType =
  | "live-test-review"
  | "router-recommendation"
  | "failure-recovery"
  | "settings-review";

export type ProviderAuditApprovalStatus =
  | "approved"
  | "needs-review"
  | "blocked";

export type ProviderAuditBudgetGuardrailStatus =
  | "within-reviewed-limit"
  | "warning-threshold"
  | "blocked";

export type ProviderAuditLogEvent = {
  id: string;
  eventSummary: string;
  providerAffected: string;
  actionType: ProviderAuditActionType;
  approvalStatus: ProviderAuditApprovalStatus;
  privacyClass: string;
  budgetGuardrailStatus: ProviderAuditBudgetGuardrailStatus;
  resultRecoveryRoute: string;
  redactedDetails: string;
  retentionNote: string;
  exportReviewRoute: string;
  advancedEventDetails: string;
};

export type ProviderAuditLogBoundary = {
  providerApiCallsAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  apiKeysDisplayedAllowed: false;
  logMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  routerConfigMutationAllowedFromUi: false;
  tokenSpendAllowedFromUi: false;
  automaticRoutingAllowed: false;
  automaticProviderSendAllowed: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
};

export type ProviderAuditLogViewerModel = {
  title: "Provider audit log viewer";
  summary: string;
  events: ProviderAuditLogEvent[];
  boundary: ProviderAuditLogBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderAuditLogViewerStableKey(
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
