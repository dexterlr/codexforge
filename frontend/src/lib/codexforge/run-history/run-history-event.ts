import { buildRunHistoryStableKey, type RunHistoryEvent, type RunHistoryEventKind, type RunHistoryEventStatus, type RunHistoryRecord } from "./run-history-types";

export function buildRunHistoryEvent(args: {
  runId: string;
  order: number;
  eventKind: RunHistoryEventKind;
  label: string;
  summary?: string | null;
  route?: string | null;
  status?: RunHistoryEventStatus;
  reviewRequired?: boolean;
  safetyNote?: string | null;
  handoffNote?: string | null;
}): RunHistoryEvent {
  return {
    eventId: buildRunHistoryStableKey("run-history-event", args.runId, args.order, args.eventKind, args.label),
    runId: args.runId,
    order: args.order,
    eventKind: args.eventKind,
    label: args.label,
    summary: args.summary?.trim() || "Event captured as reviewed timeline context.",
    route: args.route?.trim() || "/run-history",
    status: args.status ?? "needs-review",
    reviewRequired: args.reviewRequired ?? true,
    safetyNote: args.safetyNote?.trim() || "Review-only event; no persistence, execution, apply, or Brain mutation.",
    handoffNote: args.handoffNote?.trim() || "Safe for capped handoff after operator review.",
  };
}

export function buildRunHistoryEventsForRecord(record: RunHistoryRecord): RunHistoryEvent[] {
  const events: RunHistoryEvent[] = [
    buildRunHistoryEvent({ runId: record.runId, order: 1, eventKind: "started", label: "Run started", summary: `${record.label} started from ${record.sourceRoute}.`, route: record.sourceRoute, status: "done" }),
  ];
  if (record.selectedFilePath) events.push(buildRunHistoryEvent({ runId: record.runId, order: 2, eventKind: "file-selected", label: "File selected", summary: record.selectedFilePath, route: "/files", status: "done" }));
  if (record.changeSummary) events.push(buildRunHistoryEvent({ runId: record.runId, order: 3, eventKind: "change-described", label: "Change described", summary: record.changeSummary, route: record.sourceRoute, status: "done" }));
  events.push(buildRunHistoryEvent({ runId: record.runId, order: 4, eventKind: "preview-created", label: "Preview created", summary: "Preview summary can be represented without raw diff overflow.", route: "/code-flow", status: "needs-review" }));
  events.push(buildRunHistoryEvent({ runId: record.runId, order: 5, eventKind: "apply-reviewed", label: "Apply reviewed", summary: "Apply remains approval-gated and is not triggered here.", route: "/apply-validation", status: record.validationStatus === "not-run" ? "pending" : "done" }));
  events.push(buildRunHistoryEvent({ runId: record.runId, order: 6, eventKind: "validation-output-reviewed", label: "Validation output reviewed", summary: `Validation result: ${record.validationStatus}.`, route: "/validation", status: record.validationStatus === "failed" ? "blocked" : "needs-review" }));
  if (record.validationStatus === "failed") events.push(buildRunHistoryEvent({ runId: record.runId, order: 7, eventKind: "failure-routed", label: "Failure routed", summary: "Failed validation routes to closed-loop review.", route: "/closed-loop", status: "blocked" }));
  events.push(buildRunHistoryEvent({ runId: record.runId, order: 8, eventKind: "result-captured", label: "Result captured", summary: "Workflow result is visible as copyable run history context.", route: "/workflow-results", status: "needs-review" }));
  if (record.handoffReadiness === "ready") events.push(buildRunHistoryEvent({ runId: record.runId, order: 9, eventKind: "handoff-created", label: "Handoff created", summary: "Copyable handoff is ready for review.", route: "/run-history", status: "done" }));
  if (record.memoryCandidateReadiness === "ready-for-review") events.push(buildRunHistoryEvent({ runId: record.runId, order: 10, eventKind: "memory-candidate-created", label: "Memory candidate created", summary: "Reviewed memory candidate is copyable only; no-auto-promotion.", route: "/memory", status: "needs-review" }));
  if (record.reviewStatus === "complete") events.push(buildRunHistoryEvent({ runId: record.runId, order: 11, eventKind: "completed", label: "Completed", summary: "Run is complete after review.", route: "/run-history", status: "done", reviewRequired: false }));
  if (record.reviewStatus === "blocked") events.push(buildRunHistoryEvent({ runId: record.runId, order: 12, eventKind: "blocked", label: "Blocked", summary: record.currentNextAction, route: "/run-history", status: "blocked" }));
  return events.sort((a, b) => a.order - b.order);
}

export function summarizeRunHistoryEvent(event: RunHistoryEvent): string {
  return `${event.order}. ${event.label}: ${event.status}. ${event.summary}`;
}
