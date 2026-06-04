import type {
  JarvisdAuditLogBoundary,
  JarvisdAuditLogEvent,
  JarvisdAuditLogViewerModel,
} from "./jarvisd-audit-log-viewer-types";
import { buildJarvisdAuditLogViewerStableKey } from "./jarvisd-audit-log-viewer-types";

export const JARVISD_AUDIT_LOG_VIEWER_LANGUAGE = [
  "Jarvisd audit log viewer",
  "Audit logs are read-only from this page",
  "Secrets are never shown",
  "Audit entries are redacted before review",
  "Permission boundary reference",
  "Recovery console route",
] as const;

export function buildJarvisdAuditLogEvent(
  input: Omit<JarvisdAuditLogEvent, "id"> & { idHint: string }
): JarvisdAuditLogEvent {
  const { idHint, ...event } = input;
  return {
    id: buildJarvisdAuditLogViewerStableKey(
      "jarvisd-audit-log-viewer",
      idHint,
      input.eventCategory,
      input.approvalStatus
    ),
    ...event,
  };
}

export function buildJarvisdAuditLogEvents(): JarvisdAuditLogEvent[] {
  return [
    buildJarvisdAuditLogEvent({
      idHint: "blocked-command-plan",
      auditEventIdentity:
        "Audit event identity: jarvisd-audit-command-plan-blocked for a future command plan review.",
      eventCategory: "blocked-local-command-review",
      requestedCapability:
        "Requested capability: command plan preview only; no command execution and no daemon action runs from this page.",
      permissionBoundaryReference:
        "Permission boundary reference: /jarvisd-permissions must define an approved local boundary before any future local action.",
      approvalStatus: "blocked",
      resultStatus: "not-run",
      redactionStatus:
        "Redaction status: audit entries are redacted before review and exclude secrets, environment values, raw file content, and private prompt text.",
      retentionNote:
        "Retention note: keep a short local review note with identity, category, approval status, result status, and blocked reason only.",
      recoveryConsoleRoute: "/jarvisd-recovery-console",
      blockedReasons: [
        "Audit logs are read-only from this page",
        "Jarvisd actions are not executed from arbitrary UI",
        "Approved local boundary required",
      ],
      advancedEventDetails:
        "Advanced event details: this viewer does not fetch live logs, append audit entries, mutate logs, call Jarvisd, run commands, browse files, or show secrets.",
    }),
    buildJarvisdAuditLogEvent({
      idHint: "redacted-capability-review",
      auditEventIdentity:
        "Audit event identity: jarvisd-audit-capability-review-redacted for a future capability permission request.",
      eventCategory: "capability-permission-review",
      requestedCapability:
        "Requested capability: local process status read metadata; process control remains blocked.",
      permissionBoundaryReference:
        "Permission boundary reference: /jarvisd-permissions records allowed scope, denied scope, approval copy, and revocation guidance.",
      approvalStatus: "needs-review",
      resultStatus: "blocked",
      redactionStatus:
        "Redaction status: ready for review because secrets are never shown and daemon details are summarized.",
      retentionNote:
        "Retention note: retain redacted status, recovery route, and blocked reasons; do not retain secret payloads.",
      recoveryConsoleRoute: "/jarvisd-recovery-console",
      blockedReasons: [
        "No approved status-only boundary is connected",
        "No live log fetching from arbitrary UI",
        "No local process is mutated from the audit viewer",
      ],
      advancedEventDetails:
        "Advanced event details: future daemon audit storage is outside this UI; this page only renders reviewed redacted examples.",
    }),
  ];
}

export function buildJarvisdAuditLogBoundary(): JarvisdAuditLogBoundary {
  return {
    logMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    liveLogFetchAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonCallAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdAuditLogViewer(
  model: Pick<JarvisdAuditLogViewerModel, "events">
): string {
  return `Jarvisd audit log viewer prepares ${model.events.length} redacted audit event review(s). Audit logs are read-only from this page, secrets are never shown, and audit entries are redacted before review.`;
}

export function buildJarvisdAuditLogViewerModel(): JarvisdAuditLogViewerModel {
  const events = buildJarvisdAuditLogEvents();
  const model: JarvisdAuditLogViewerModel = {
    title: "Jarvisd audit log viewer",
    summary: "",
    events,
    boundary: buildJarvisdAuditLogBoundary(),
    auditLanguage: [...JARVISD_AUDIT_LOG_VIEWER_LANGUAGE],
    advancedDetails: [
      "Jarvisd audit log viewer",
      "Audit logs are read-only from this page",
      "Secrets are never shown",
      "Audit entries are redacted before review",
      "Audit event identity",
      "Event category",
      "Requested capability",
      "Permission boundary reference",
      "Approval status",
      "Result status",
      "Redaction status",
      "Retention note",
      "Recovery console route",
      "Blocked reasons",
      "No live log fetching from arbitrary UI",
      "No Jarvisd capability execution from UI",
    ],
  };
  return { ...model, summary: summarizeJarvisdAuditLogViewer(model) };
}
