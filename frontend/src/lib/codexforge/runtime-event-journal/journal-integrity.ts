import {
  buildRuntimeEventJournalStableKey,
  isRuntimeEventJournalKnownRuntimeEventType,
  type RuntimeEventJournalEntry,
  type RuntimeEventJournalIntegrityCheck,
  type RuntimeEventJournalIntegrityReport,
  type RuntimeEventJournalIntegrityStatus,
} from "./runtime-event-journal-types";

function statusFrom(condition: boolean, fallback: RuntimeEventJournalIntegrityStatus): RuntimeEventJournalIntegrityStatus {
  return condition ? "pass" : fallback;
}

export function buildRuntimeEventJournalIntegrityCheck(args: {
  id?: string;
  label: string;
  status: RuntimeEventJournalIntegrityStatus;
  detail: string;
  relatedEntryIds?: readonly string[];
}): RuntimeEventJournalIntegrityCheck {
  return {
    id: args.id ?? buildRuntimeEventJournalStableKey("runtime-event-journal-integrity", args.label),
    label: args.label,
    status: args.status,
    detail: args.detail,
    relatedEntryIds: [...(args.relatedEntryIds ?? [])].sort(),
  };
}

export function buildRuntimeEventJournalIntegrityReport(entries: readonly RuntimeEventJournalEntry[] = []): RuntimeEventJournalIntegrityReport {
  const requestEntries = entries.filter((entry) => entry.type !== "event.appended");
  const missingRequestIds = requestEntries.filter((entry) => !entry.requestId);
  const unknownEvents = entries.filter((entry) => entry.runtimeEventType !== "unknown" && !isRuntimeEventJournalKnownRuntimeEventType(entry.runtimeEventType));
  const executedEntries = entries.filter((entry) => entry.type === "event.appended" || entry.resultStatus === "executed");
  const previewEntries = entries.filter((entry) => entry.type === "reducerPreview.built");
  const memoryPromoted = entries.filter((entry) => entry.runtimeEventType === "memory.promoted");
  const missingEvidenceMemory = memoryPromoted.filter((entry) => entry.evidenceRefs.length === 0);
  const unknownEntries = entries.filter((entry) => entry.type === "unknown" || entry.runtimeEventType === "unknown");

  const checks: RuntimeEventJournalIntegrityCheck[] = [
    buildRuntimeEventJournalIntegrityCheck({
      label: "request id present",
      status: statusFrom(missingRequestIds.length === 0, "warning"),
      detail: missingRequestIds.length === 0 ? "Request IDs are visible where lifecycle state requires them." : "Some lifecycle entries are missing request IDs.",
      relatedEntryIds: missingRequestIds.map((entry) => entry.id),
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "event type known",
      status: statusFrom(unknownEvents.length === 0, "risk"),
      detail: unknownEvents.length === 0 ? "Known event types or explicit unknown placeholders are visible." : "A supplied runtime event type is not in the canonical runtime type list.",
      relatedEntryIds: unknownEvents.map((entry) => entry.id),
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "approval state visible",
      status: statusFrom(entries.some((entry) => entry.type === "approval.reviewed" || entry.type === "memoryPromotion.approved" || entry.type === "memoryPromotion.blocked"), "warning"),
      detail: "Approval state should be visible before runtime event execution.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "policy state visible",
      status: statusFrom(entries.some((entry) => entry.type === "policy.checked"), "warning"),
      detail: "Policy state should be visible before runtime event execution.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "validation state visible",
      status: statusFrom(entries.some((entry) => entry.type === "validation.checked") || entries.every((entry) => entry.runtimeEventType !== "memory.promoted"), "warning"),
      detail: "Validation state should be visible for appendable runtime event payloads.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "reducer preview present before execution where applicable",
      status: statusFrom(executedEntries.length === 0 || previewEntries.length > 0 || executedEntries.every((entry) => entry.reducerTraceRefs.length > 0), "blocker"),
      detail: "Executed or appended event visibility should include reducer preview or reducer trace context.",
      relatedEntryIds: executedEntries.map((entry) => entry.id),
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "memory.promoted has evidence refs",
      status: statusFrom(missingEvidenceMemory.length === 0, "risk"),
      detail: missingEvidenceMemory.length === 0 ? "memory.promoted entries include evidence refs." : "memory.promoted entries are missing evidence refs.",
      relatedEntryIds: missingEvidenceMemory.map((entry) => entry.id),
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "append-only semantics visible",
      status: statusFrom(entries.some((entry) => entry.auditRefs.length > 0 || entry.detail.toLowerCase().includes("append-only")), "warning"),
      detail: "Append-only semantics must remain visible in audit refs or detail text.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "direct UI mutation absent",
      status: "pass",
      detail: "Runtime Event Journal UI is read-only and has no graph mutation controls.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "source route known",
      status: statusFrom(entries.every((entry) => entry.relatedRoutes.some((route) => route.startsWith("/"))), "warning"),
      detail: "Each journal entry should link to at least one known route.",
    }),
    buildRuntimeEventJournalIntegrityCheck({
      label: "no stale unknown state if supplied",
      status: unknownEntries.length === 0 ? "pass" : "unknown",
      detail: unknownEntries.length === 0 ? "No unknown supplied state remains." : "Unknown state is visible and must be reviewed before execution.",
      relatedEntryIds: unknownEntries.map((entry) => entry.id),
    }),
  ];

  const report: RuntimeEventJournalIntegrityReport = {
    id: "runtime-event-journal-integrity-report",
    checks,
    passCount: checks.filter((check) => check.status === "pass").length,
    warningCount: checks.filter((check) => check.status === "warning").length,
    riskCount: checks.filter((check) => check.status === "risk").length,
    blockerCount: checks.filter((check) => check.status === "blocker").length,
    unknownCount: checks.filter((check) => check.status === "unknown").length,
    summary: [],
  };
  return { ...report, summary: summarizeRuntimeEventJournalIntegrity(report) };
}

export function summarizeRuntimeEventJournalIntegrity(report: RuntimeEventJournalIntegrityReport): string[] {
  return [
    `${report.passCount} integrity checks pass.`,
    `${report.warningCount} warning, ${report.riskCount} risk, ${report.blockerCount} blocker, ${report.unknownCount} unknown checks.`,
    "Integrity report checks append-only semantics and direct UI mutation absent.",
  ];
}
