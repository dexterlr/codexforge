export type JarvisdAuditApprovalStatus = "approved" | "needs-review" | "blocked";
export type JarvisdAuditResultStatus = "completed" | "failed" | "blocked" | "not-run";

export type JarvisdAuditLogEvent = {
  id: string;
  auditEventIdentity: string;
  eventCategory: string;
  requestedCapability: string;
  permissionBoundaryReference: string;
  approvalStatus: JarvisdAuditApprovalStatus;
  resultStatus: JarvisdAuditResultStatus;
  redactionStatus: string;
  retentionNote: string;
  recoveryConsoleRoute: string;
  blockedReasons: string[];
  advancedEventDetails: string;
};

export type JarvisdAuditLogBoundary = {
  logMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  liveLogFetchAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonCallAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  settingsAutoImportAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdAuditLogViewerModel = {
  title: "Jarvisd audit log viewer";
  summary: string;
  events: JarvisdAuditLogEvent[];
  boundary: JarvisdAuditLogBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdAuditLogViewerStableKey(
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
