import type { GlobalActivityEvent, GlobalActivityFeed, GlobalActivityFeedFilter, GlobalActivityFilterId } from "./global-activity-types";
import { selectGlobalActivityNextAction } from "./activity-next-action";
import { summarizeGlobalActivityFeed } from "./activity-feed-builder";
import { rankGlobalActivityEvents } from "./activity-feed-priority";

const LABELS: Record<GlobalActivityFilterId, string> = {
  all: "All",
  blockers: "Blockers",
  warnings: "Warnings",
  "review required": "Review required",
  verification: "Verification",
  regression: "Regression",
  "patch workflow": "Patch workflow",
  "apply gates": "Apply gates",
  memory: "Memory",
  creative: "Creative",
  stabilization: "Stabilization",
  safety: "Safety",
};

export function buildGlobalActivityFeedFilter(id: GlobalActivityFilterId = "all", search = ""): GlobalActivityFeedFilter {
  const tokens = search
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
  return { id, label: LABELS[id], search, tokens };
}

function matchesFilter(event: GlobalActivityEvent, filter: GlobalActivityFeedFilter): boolean {
  if (filter.id === "blockers" && event.severity !== "blocker") return false;
  if (filter.id === "warnings" && event.severity !== "warning") return false;
  if (filter.id === "review required" && !event.reviewRequired) return false;
  if (filter.id === "verification" && event.source !== "verification") return false;
  if (filter.id === "regression" && !event.source.startsWith("regression")) return false;
  if (filter.id === "patch workflow" && !["patch-preview", "preview-diff"].includes(event.source)) return false;
  if (filter.id === "apply gates" && event.source !== "apply-gate") return false;
  if (filter.id === "memory" && !["memory-review", "brain-review", "brain-governance", "runtime-replay"].includes(event.source)) return false;
  if (filter.id === "creative" && event.source !== "creative") return false;
  if (filter.id === "stabilization" && event.source !== "stabilization") return false;
  if (filter.id === "safety" && event.source !== "safety" && event.type !== "safety.blocked") return false;
  if (filter.tokens.length === 0) return true;
  const haystack = [
    event.title,
    event.detail,
    event.source,
    event.surface,
    ...event.relatedFiles,
    ...event.relatedIds,
    ...event.relatedRoutes,
  ]
    .join(" ")
    .toLowerCase();
  return filter.tokens.every((token) => haystack.includes(token));
}

export function filterGlobalActivityFeed(feed: GlobalActivityFeed, filter: GlobalActivityFeedFilter): GlobalActivityFeed {
  const events = rankGlobalActivityEvents(feed.events.filter((event) => matchesFilter(event, filter)));
  return {
    id: "global-activity-feed",
    events,
    eventCount: events.length,
    sourceCount: new Set(events.map((event) => event.source)).size,
    blockerCount: events.filter((event) => event.severity === "blocker").length,
    warningCount: events.filter((event) => event.severity === "warning").length,
    reviewRequiredCount: events.filter((event) => event.reviewRequired).length,
    highestPriorityEvent: events[0],
    nextSafeAction: selectGlobalActivityNextAction(events).label,
    summary: summarizeGlobalActivityFeed(events),
  };
}

export function summarizeGlobalActivityFeedFilter(filter: GlobalActivityFeedFilter, visibleCount: number): string {
  return `${filter.label} filter shows ${visibleCount} events with ${filter.tokens.length} search tokens.`;
}
