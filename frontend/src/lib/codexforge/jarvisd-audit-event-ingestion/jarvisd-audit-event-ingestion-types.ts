export type JarvisdAuditIngestionValidationStatus =
  | "validated"
  | "needs-review"
  | "duplicate-replay-blocked"
  | "blocked";

export type JarvisdAuditEventIngestionReview = {
  id: string;
  ingestionIdentity: string;
  sourceCapability: string;
  sourceSession: string;
  eventCategory: string;
  redactionStatus: string;
  validationStatus: JarvisdAuditIngestionValidationStatus;
  duplicateReplayGuard: string;
  retentionPolicy: string;
  auditLogRoute: string;
  blockedReasons: string[];
  advancedIngestionDetails: string;
};

export type JarvisdAuditEventIngestionBoundary = {
  auditAutoIngestionAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  liveLogFetchAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonDirectCallAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdAuditEventIngestionModel = {
  title: "Jarvisd audit event ingestion";
  summary: string;
  ingestionReviews: JarvisdAuditEventIngestionReview[];
  boundary: JarvisdAuditEventIngestionBoundary;
  ingestionLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdAuditEventIngestionStableKey(
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
