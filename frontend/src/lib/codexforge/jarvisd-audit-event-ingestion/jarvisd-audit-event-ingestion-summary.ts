import type {
  JarvisdAuditEventIngestionBoundary,
  JarvisdAuditEventIngestionModel,
  JarvisdAuditEventIngestionReview,
} from "./jarvisd-audit-event-ingestion-types";
import { buildJarvisdAuditEventIngestionStableKey } from "./jarvisd-audit-event-ingestion-types";

export const JARVISD_AUDIT_EVENT_INGESTION_LANGUAGE = [
  "Jarvisd audit event ingestion",
  "Audit events are validated before ingestion",
  "Audit ingestion does not expose secrets",
  "UI does not mutate audit logs directly",
  "Duplicate and replay guard",
  "Retention policy",
  "Runtime controls are reviewed before use",
  "Approved local boundary required",
  "Secrets and signing material are never displayed or stored in browser storage",
] as const;

export function buildJarvisdAuditEventIngestionReview(
  input: Omit<JarvisdAuditEventIngestionReview, "id"> & { idHint: string }
): JarvisdAuditEventIngestionReview {
  const { idHint, ...review } = input;
  return {
    id: buildJarvisdAuditEventIngestionStableKey(
      "jarvisd-audit-event-ingestion",
      idHint,
      input.validationStatus
    ),
    ...review,
  };
}

export function buildJarvisdAuditEventIngestionReviews(): JarvisdAuditEventIngestionReview[] {
  return [
    buildJarvisdAuditEventIngestionReview({
      idHint: "runtime-enforcement-blocked",
      ingestionIdentity:
        "Ingestion identity: jarvisd-audit-ingestion-runtime-enforcement-blocked.",
      sourceCapability:
        "Source capability: Jarvisd permission runtime enforcement candidate for a blocked overbroad capability.",
      sourceSession:
        "Source session: jarvisd-session-consent-review, validated as review copy and not a live browser-stored session token.",
      eventCategory:
        "Event category: runtime-enforcement-blocked, redacted before any future audit ingestion.",
      redactionStatus:
        "Redaction status: audit ingestion does not expose secrets, signing material, environment values, raw file content, or prompt payloads.",
      validationStatus: "needs-review",
      duplicateReplayGuard:
        "Duplicate and replay guard: reject repeated event identity, stale signed request reference, expired session consent, or mismatched permission boundary.",
      retentionPolicy:
        "Retention policy: retain redacted identity, category, source route, decision, blocked reasons, and recovery route only.",
      auditLogRoute: "/jarvisd-audit-log",
      blockedReasons: [
        "Audit events are validated before ingestion",
        "UI does not mutate audit logs directly",
        "No direct appendEvent call from UI",
      ],
      advancedIngestionDetails:
        "Advanced ingestion details: this page does not fetch live logs, call appendEvent, mutate audit logs, call Jarvisd, execute capabilities, browse files, or store secrets.",
    }),
    buildJarvisdAuditEventIngestionReview({
      idHint: "signed-request-replay",
      ingestionIdentity:
        "Ingestion identity: jarvisd-audit-ingestion-signed-request-replay-blocked.",
      sourceCapability:
        "Source capability: signed request replay protection review, with requests not sent from this UI.",
      sourceSession:
        "Source session: expired or revoked session consent, blocked before ingestion.",
      eventCategory:
        "Event category: duplicate-replay-guard, blocked until a fresh reviewed request identity exists.",
      redactionStatus:
        "Redaction status: replay notes are safe because nonce/challenge detail is summarized and signing secrets are never displayed.",
      validationStatus: "duplicate-replay-blocked",
      duplicateReplayGuard:
        "Duplicate and replay guard: duplicate event identity, nonce reuse, and expired session consent keep the candidate blocked.",
      retentionPolicy:
        "Retention policy: retain the replay-blocked reason and route reference; do not retain tokens, secrets, or signing material.",
      auditLogRoute: "/jarvisd-audit-log",
      blockedReasons: [
        "Duplicate and replay guard blocked ingestion",
        "Expired sessions stay blocked",
        "Audit ingestion does not expose secrets",
      ],
      advancedIngestionDetails:
        "Advanced ingestion details: duplicate/replay blocking is modeled only; no live handshake, no raw fetch, no daemon call, and no browser token storage occurs.",
    }),
    buildJarvisdAuditEventIngestionReview({
      idHint: "kill-switch-review",
      ingestionIdentity:
        "Ingestion identity: jarvisd-audit-ingestion-kill-switch-review.",
      sourceCapability:
        "Source capability: Jarvisd kill switch and safe shutdown review surface, not a process-control event.",
      sourceSession:
        "Source session: active session summary must be redacted and validated before future ingestion.",
      eventCategory:
        "Event category: safe-shutdown-review, used for reviewed handoff copy only.",
      redactionStatus:
        "Redaction status: source session and in-flight capability summaries are redacted before ingestion review.",
      validationStatus: "validated",
      duplicateReplayGuard:
        "Duplicate and replay guard: one shutdown request identity maps to one reviewed audit candidate and cannot be replayed as execution authority.",
      retentionPolicy:
        "Retention policy: retain shutdown request identity, trigger reason, required confirmation copy, audit handoff, and blocked reasons.",
      auditLogRoute: "/jarvisd-audit-log",
      blockedReasons: [
        "Kill switch actions are not executed from ingestion",
        "No local process is killed or restarted from UI",
      ],
      advancedIngestionDetails:
        "Advanced ingestion details: validated means ready for review display only. It does not mutate logs, kill processes, restart daemons, or mutate local state.",
    }),
    buildJarvisdAuditEventIngestionReview({
      idHint: "secret-bearing-event",
      ingestionIdentity:
        "Ingestion identity: jarvisd-audit-ingestion-secret-bearing-event-blocked.",
      sourceCapability:
        "Source capability: any event candidate that includes passwords, API keys, tokens, or environment values.",
      sourceSession:
        "Source session: blocked because audit ingestion does not expose secrets and cannot accept secret-bearing payloads.",
      eventCategory:
        "Event category: secret-bearing-event-blocked.",
      redactionStatus:
        "Redaction status: blocked until secret-bearing fields are removed before ingestion review.",
      validationStatus: "blocked",
      duplicateReplayGuard:
        "Duplicate and replay guard: blocked event identities remain blocked and cannot be retried automatically from UI.",
      retentionPolicy:
        "Retention policy: retain only the fact that a secret-bearing event was rejected, without the secret value.",
      auditLogRoute: "/jarvisd-audit-log",
      blockedReasons: [
        "Audit ingestion does not expose secrets",
        "Secrets and signing material are never displayed or stored in browser storage",
        "No settings auto-import",
      ],
      advancedIngestionDetails:
        "Advanced ingestion details: blocked secret-bearing events are not shown, exported, stored, ingested, or appended by this UI.",
    }),
  ];
}

export function buildJarvisdAuditEventIngestionBoundary(): JarvisdAuditEventIngestionBoundary {
  return {
    auditAutoIngestionAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    liveLogFetchAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonDirectCallAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    settingsAutoImportAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdAuditEventIngestion(
  model: Pick<JarvisdAuditEventIngestionModel, "ingestionReviews">
): string {
  return `Jarvisd audit event ingestion reviews ${model.ingestionReviews.length} future audit event candidate(s). Audit events are validated before ingestion, audit ingestion does not expose secrets, and UI does not mutate audit logs directly.`;
}

export function buildJarvisdAuditEventIngestionModel(): JarvisdAuditEventIngestionModel {
  const ingestionReviews = buildJarvisdAuditEventIngestionReviews();
  const model: JarvisdAuditEventIngestionModel = {
    title: "Jarvisd audit event ingestion",
    summary: "",
    ingestionReviews,
    boundary: buildJarvisdAuditEventIngestionBoundary(),
    ingestionLanguage: [...JARVISD_AUDIT_EVENT_INGESTION_LANGUAGE],
    advancedDetails: [
      "Jarvisd audit event ingestion",
      "Audit events are validated before ingestion",
      "Audit ingestion does not expose secrets",
      "UI does not mutate audit logs directly",
      "Ingestion identity",
      "Source capability",
      "Source session",
      "Event category",
      "Redaction status",
      "Validation status",
      "Duplicate and replay guard",
      "Retention policy",
      "Audit log route",
      "Blocked reasons",
      "No direct appendEvent call from UI",
      "No audit log mutation from UI",
    ],
  };
  return { ...model, summary: summarizeJarvisdAuditEventIngestion(model) };
}
