import type {
  ProviderAuditLogBoundary,
  ProviderAuditLogEvent,
  ProviderAuditLogViewerModel,
} from "./provider-audit-log-viewer-types";
import { buildProviderAuditLogViewerStableKey } from "./provider-audit-log-viewer-types";

export const PROVIDER_AUDIT_LOG_VIEWER_LANGUAGE = [
  "Provider audit log viewer",
  "Audit logs are redacted",
  "Secrets are never shown",
  "Redacted details",
  "Retention note",
  "Does not mutate logs from UI",
] as const;

export function buildProviderAuditLogEvent(
  input: Omit<ProviderAuditLogEvent, "id"> & { idHint: string }
): ProviderAuditLogEvent {
  const { idHint, ...event } = input;
  return {
    id: buildProviderAuditLogViewerStableKey(
      "provider-audit-log-viewer",
      idHint,
      input.actionType,
      input.approvalStatus
    ),
    ...event,
  };
}

export function buildProviderAuditLogEvents(): ProviderAuditLogEvent[] {
  return [
    buildProviderAuditLogEvent({
      idHint: "blocked-cloud-test",
      eventSummary:
        "Event summary: cloud provider live-test handoff was reviewed and blocked because approval and budget guardrails were incomplete.",
      providerAffected:
        "Provider affected: reviewed cloud provider profile label only; secrets are never shown.",
      actionType: "live-test-review",
      approvalStatus: "blocked",
      privacyClass:
        "Privacy class: sensitive prompt summary needs redaction before any provider-send review.",
      budgetGuardrailStatus: "blocked",
      resultRecoveryRoute: "/provider-failure-recovery",
      redactedDetails:
        "Redacted details: provider label, model family, approval status, privacy class, budget guardrail status, and blocked reason with no API keys or raw prompt.",
      retentionNote:
        "Retention note: local review log notes are short, redacted, and not presented as an immutable compliance system.",
      exportReviewRoute: "/provider-settings-review",
      advancedEventDetails:
        "Advanced event details: keep raw headers, credentials, prompts, file content, and private memory out of audit records.",
    }),
    buildProviderAuditLogEvent({
      idHint: "router-recommendation",
      eventSummary:
        "Event summary: router recommendation was prepared for human review and not applied automatically.",
      providerAffected:
        "Provider affected: local compatible runtime and optional cloud fallback profile, metadata only.",
      actionType: "router-recommendation",
      approvalStatus: "needs-review",
      privacyClass:
        "Privacy class: internal summary can stay local unless a human approves provider-send readiness.",
      budgetGuardrailStatus: "warning-threshold",
      resultRecoveryRoute: "/router-recommendation-review",
      redactedDetails:
        "Redacted details: route suggestion, privacy class, budget warning, and fallback route with no secrets or raw sensitive content.",
      retentionNote:
        "Retention note: audit logs are redacted review aids and can be summarized for export review without secrets.",
      exportReviewRoute: "/provider-settings-review",
      advancedEventDetails:
        "Advanced event details: this viewer does not call provider APIs, append events, mutate logs, mutate Brain graph, or spend tokens.",
    }),
  ];
}

export function buildProviderAuditLogBoundary(): ProviderAuditLogBoundary {
  return {
    providerApiCallsAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    apiKeysDisplayedAllowed: false,
    logMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    routerConfigMutationAllowedFromUi: false,
    tokenSpendAllowedFromUi: false,
    automaticRoutingAllowed: false,
    automaticProviderSendAllowed: false,
    settingsAutoImportAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    arbitraryFileBrowsingAllowed: false,
  };
}

export function summarizeProviderAuditLogViewer(
  model: Pick<ProviderAuditLogViewerModel, "events">
): string {
  return `Provider audit log viewer prepares ${model.events.length} redacted event review(s). Audit logs are redacted, secrets are never shown, and this viewer does not mutate logs from UI.`;
}

export function buildProviderAuditLogViewerModel(): ProviderAuditLogViewerModel {
  const events = buildProviderAuditLogEvents();
  const model: ProviderAuditLogViewerModel = {
    title: "Provider audit log viewer",
    summary: "",
    events,
    boundary: buildProviderAuditLogBoundary(),
    auditLanguage: [...PROVIDER_AUDIT_LOG_VIEWER_LANGUAGE],
    advancedDetails: [
      "Provider audit log viewer",
      "Audit logs are redacted",
      "Secrets are never shown",
      "Redacted details",
      "Retention note",
      "Does not mutate logs from UI",
      "Provider affected",
      "Action type",
      "Approval status",
      "Privacy class",
      "Budget guardrail status",
      "Result/recovery route",
      "Export review route",
      "No automatic provider send",
      "No auto-routing",
      "No auto-spend",
      "No settings auto-import",
    ],
  };
  return { ...model, summary: summarizeProviderAuditLogViewer(model) };
}
