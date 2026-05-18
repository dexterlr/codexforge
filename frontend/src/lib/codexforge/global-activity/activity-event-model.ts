import { scoreGlobalActivityEventPriority } from "./activity-feed-priority";
import type { GlobalActivityEvent, GlobalActivityEventInput, GlobalActivitySeverity, GlobalActivityStatus } from "./global-activity-types";
import { buildGlobalActivityStableKey } from "./global-activity-types";

function defaultStatus(severity: GlobalActivitySeverity, reviewRequired: boolean): GlobalActivityStatus {
  if (severity === "blocker") return "blocked";
  if (reviewRequired) return "review-required";
  if (severity === "success") return "complete";
  if (severity === "warning") return "needs-attention";
  return "prepared";
}

export function normalizeGlobalActivityEvent(input: GlobalActivityEventInput): GlobalActivityEvent {
  const relatedRoutes = [...new Set(input.relatedRoutes ?? [])];
  const relatedFiles = [...new Set(input.relatedFiles ?? [])];
  const relatedIds = [...new Set(input.relatedIds ?? [])];
  const severity = input.severity ?? (input.type === "verification.failed" || input.type === "safety.blocked" ? "blocker" : "info");
  const reviewRequired = input.reviewRequired ?? severity === "blocker";
  const status = input.status ?? defaultStatus(severity, reviewRequired);
  const source = input.source ?? "unknown";
  const surface = input.surface ?? "Unknown";
  const title = input.title.trim();
  const detail = (input.detail ?? title).trim();
  const id =
    input.id ??
    buildGlobalActivityStableKey("activity", source, input.type, relatedIds, title);
  const event: GlobalActivityEvent = {
    id,
    type: input.type,
    title,
    detail,
    source,
    surface,
    severity,
    priority: input.priority ?? 0,
    status,
    relatedRoutes,
    relatedFiles,
    relatedIds,
    reviewRequired,
    nextActionLabel: input.nextActionLabel ?? (reviewRequired ? "Review before mutation gates" : "Keep visible in activity feed"),
    timestampLabel: input.timestampLabel,
    sortKey: input.sortKey ?? id,
  };

  return { ...event, priority: input.priority ?? scoreGlobalActivityEventPriority(event) };
}

export function buildGlobalActivityEvent(input: GlobalActivityEventInput): GlobalActivityEvent {
  return normalizeGlobalActivityEvent(input);
}

export function summarizeGlobalActivityEvent(event: GlobalActivityEvent): string {
  return `${event.title}: ${event.severity}, ${event.status}, next safe action: ${event.nextActionLabel}.`;
}
