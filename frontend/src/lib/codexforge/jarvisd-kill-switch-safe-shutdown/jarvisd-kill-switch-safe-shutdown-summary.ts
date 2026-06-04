import type {
  JarvisdKillSwitchSafeShutdownBoundary,
  JarvisdKillSwitchSafeShutdownModel,
  JarvisdKillSwitchShutdownReview,
} from "./jarvisd-kill-switch-safe-shutdown-types";
import { buildJarvisdKillSwitchSafeShutdownStableKey } from "./jarvisd-kill-switch-safe-shutdown-types";

export const JARVISD_KILL_SWITCH_SAFE_SHUTDOWN_LANGUAGE = [
  "Jarvisd kill switch and safe shutdown",
  "Kill switch actions are not executed from this page",
  "Shutdown restart requires explicit approved local boundary",
  "No local process is killed or restarted from UI",
  "Required confirmation copy",
  "Safe shutdown checklist",
  "Runtime controls are reviewed before use",
  "Approved local boundary required",
  "Secrets and signing material are never displayed or stored in browser storage",
] as const;

export function buildJarvisdKillSwitchShutdownReview(
  input: Omit<JarvisdKillSwitchShutdownReview, "id"> & { idHint: string }
): JarvisdKillSwitchShutdownReview {
  const { idHint, ...review } = input;
  return {
    id: buildJarvisdKillSwitchSafeShutdownStableKey(
      "jarvisd-kill-switch-safe-shutdown",
      idHint,
      input.shutdownStatus
    ),
    ...review,
  };
}

export function buildJarvisdKillSwitchShutdownReviews(): JarvisdKillSwitchShutdownReview[] {
  return [
    buildJarvisdKillSwitchShutdownReview({
      idHint: "operator-reviewed-safe-shutdown",
      shutdownRequestIdentity:
        "Shutdown request identity: jarvisd-kill-switch-safe-shutdown-operator-reviewed.",
      triggerReason:
        "Trigger reason: operator wants to stop future Jarvisd local activity after a reviewed audit concern, without executing shutdown from this page.",
      activeSessionSummary:
        "Active session summary: session consent is summarized as redacted review copy; no session token is stored in localStorage.",
      inFlightCapabilitySummary:
        "In-flight capability summary: future capability work is summarized as review-only and no Jarvisd capability is executed from UI.",
      safeShutdownChecklist: [
        "Confirm the trigger reason is plain English",
        "Confirm active session summary is redacted",
        "Confirm in-flight capability summary is review-only",
        "Confirm artifact and operation retention note is preserved",
        "Confirm no local process is killed or restarted from UI",
      ],
      artifactOperationRetentionNote:
        "Artifact/operation retention note: preserve redacted artifact labels and operation summaries; do not delete artifacts or mutate files from this page.",
      requiredConfirmationCopy:
        "Required confirmation copy: I understand kill switch actions are not executed from this page and shutdown restart requires explicit approved local boundary.",
      recoveryConsoleRoute: "/jarvisd-recovery-console",
      auditHandoff:
        "Audit handoff: send a redacted shutdown review candidate to /jarvisd-audit-ingestion for validation, never by calling appendEvent from UI.",
      blockedReasons: [
        "Kill switch actions are not executed from this page",
        "Shutdown restart requires explicit approved local boundary",
        "No local process is killed or restarted from UI",
      ],
      shutdownStatus: "approved-boundary-required",
      advancedShutdownDetails:
        "Advanced shutdown details: this review does not kill, restart, shut down, reset, or mutate local processes; no commands, daemon calls, or raw fetches run.",
    }),
    buildJarvisdKillSwitchShutdownReview({
      idHint: "expired-session-kill-switch",
      shutdownRequestIdentity:
        "Shutdown request identity: jarvisd-kill-switch-expired-session-review.",
      triggerReason:
        "Trigger reason: expired session should remain blocked and route to recovery review instead of attempting restart.",
      activeSessionSummary:
        "Active session summary: expired sessions stay blocked and cannot authorize shutdown, restart, or capability execution.",
      inFlightCapabilitySummary:
        "In-flight capability summary: all pending capability candidates remain disabled until reviewed consent and permission boundaries are refreshed.",
      safeShutdownChecklist: [
        "Confirm expired sessions stay blocked",
        "Confirm no local process is touched",
        "Route missing consent back to Jarvisd session consent",
        "Route recovery copy to the recovery console",
      ],
      artifactOperationRetentionNote:
        "Artifact/operation retention note: leave artifacts and operation notes intact; no artifact deletion or file mutation is available here.",
      requiredConfirmationCopy:
        "Required confirmation copy: I understand expired sessions stay blocked and this page will not restart Jarvisd or kill local processes.",
      recoveryConsoleRoute: "/jarvisd-recovery-console",
      auditHandoff:
        "Audit handoff: preserve expired-session blocked reason as a redacted ingestion candidate for review.",
      blockedReasons: [
        "Expired sessions stay blocked",
        "Missing fresh consent",
        "No process restart from UI",
      ],
      shutdownStatus: "blocked",
      advancedShutdownDetails:
        "Advanced shutdown details: blocked means no daemon restart, no daemon shutdown, no process kill, no local state mutation, and no file operation.",
    }),
    buildJarvisdKillSwitchShutdownReview({
      idHint: "capability-runaway-review",
      shutdownRequestIdentity:
        "Shutdown request identity: jarvisd-kill-switch-runaway-capability-review.",
      triggerReason:
        "Trigger reason: a future in-flight capability appears unsafe, overbroad, or missing an audit handoff.",
      activeSessionSummary:
        "Active session summary: active consent and permission posture must be reviewed before any local boundary could be used.",
      inFlightCapabilitySummary:
        "In-flight capability summary: capability is treated as blocked review copy; no shutdown, restart, command, or capability execution happens from this UI.",
      safeShutdownChecklist: [
        "Confirm requested capability identity",
        "Confirm permission boundary dependency",
        "Confirm audit handoff exists",
        "Confirm recovery console route is available",
        "Confirm required confirmation copy is explicit",
      ],
      artifactOperationRetentionNote:
        "Artifact/operation retention note: keep in-flight operation summaries redacted and do not export secrets, delete artifacts, or mutate local files.",
      requiredConfirmationCopy:
        "Required confirmation copy: I understand runtime controls are reviewed before use and approved local boundary required before any future shutdown or restart.",
      recoveryConsoleRoute: "/jarvisd-recovery-console",
      auditHandoff:
        "Audit handoff: route blocked runaway capability evidence to audit ingestion review with duplicate and replay guard.",
      blockedReasons: [
        "Approved local boundary required",
        "Audit handoff must be validated",
        "No command execution from UI",
      ],
      shutdownStatus: "review-only",
      advancedShutdownDetails:
        "Advanced shutdown details: review-only means no live daemon control, no raw fetch loop, no socket, no command execution, and no settings auto-import.",
    }),
  ];
}

export function buildJarvisdKillSwitchSafeShutdownBoundary(): JarvisdKillSwitchSafeShutdownBoundary {
  return {
    killSwitchExecutionAllowedFromUi: false,
    safeShutdownExecutionAllowedFromUi: false,
    processKillAllowedFromUi: false,
    processRestartAllowedFromUi: false,
    processShutdownAllowedFromUi: false,
    daemonRestartAllowedFromUi: false,
    daemonShutdownAllowedFromUi: false,
    localStateMutationAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    daemonDirectCallAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    liveHandshakeAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowedFromUi: false,
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

export function summarizeJarvisdKillSwitchSafeShutdown(
  model: Pick<JarvisdKillSwitchSafeShutdownModel, "shutdownReviews">
): string {
  return `Jarvisd kill switch and safe shutdown reviews ${model.shutdownReviews.length} shutdown request posture(s). Kill switch actions are not executed from this page, shutdown restart requires explicit approved local boundary, and no local process is killed or restarted from UI.`;
}

export function buildJarvisdKillSwitchSafeShutdownModel(): JarvisdKillSwitchSafeShutdownModel {
  const shutdownReviews = buildJarvisdKillSwitchShutdownReviews();
  const model: JarvisdKillSwitchSafeShutdownModel = {
    title: "Jarvisd kill switch and safe shutdown",
    summary: "",
    shutdownReviews,
    boundary: buildJarvisdKillSwitchSafeShutdownBoundary(),
    shutdownLanguage: [...JARVISD_KILL_SWITCH_SAFE_SHUTDOWN_LANGUAGE],
    advancedDetails: [
      "Jarvisd kill switch and safe shutdown",
      "Kill switch actions are not executed from this page",
      "Shutdown restart requires explicit approved local boundary",
      "No local process is killed or restarted from UI",
      "Shutdown request identity",
      "Trigger reason",
      "Active session summary",
      "In-flight capability summary",
      "Safe shutdown checklist",
      "Artifact/operation retention note",
      "Required confirmation copy",
      "Recovery console route",
      "Audit handoff",
      "Blocked reasons",
      "Approved local boundary required",
      "Secrets and signing material are never displayed or stored in browser storage",
    ],
  };
  return { ...model, summary: summarizeJarvisdKillSwitchSafeShutdown(model) };
}
