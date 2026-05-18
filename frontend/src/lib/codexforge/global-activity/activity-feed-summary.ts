import type { GlobalActivityEvent, GlobalActivityFeed, GlobalActivityFeedSummary } from "./global-activity-types";
import { selectGlobalActivityNextAction } from "./activity-next-action";
import { summarizeActivitySources } from "./activity-source-adapters";

export function buildGlobalActivityFeedSummary(feed: GlobalActivityFeed, visibleEvents: readonly GlobalActivityEvent[] = feed.events): GlobalActivityFeedSummary {
  const sources = summarizeActivitySources(feed.events);
  const topSource = [...sources].sort((a, b) => b.eventCount - a.eventCount || a.source.localeCompare(b.source))[0]?.source ?? "none";
  const topRisk = visibleEvents.find((event) => event.severity === "blocker" || event.severity === "warning")?.title ?? "No visible blocker or warning.";
  const nextSafeAction = selectGlobalActivityNextAction(visibleEvents).label;
  return {
    id: "global-activity-feed-summary",
    eventCount: feed.eventCount,
    visibleEventCount: visibleEvents.length,
    blockerCount: visibleEvents.filter((event) => event.severity === "blocker").length,
    warningCount: visibleEvents.filter((event) => event.severity === "warning").length,
    reviewRequiredCount: visibleEvents.filter((event) => event.reviewRequired).length,
    sourceCount: feed.sourceCount,
    topSource,
    topRisk,
    nextSafeAction,
    summary: summarizeGlobalActivityFeedSession(feed, visibleEvents),
  };
}

export function summarizeGlobalActivityFeedSession(feed: GlobalActivityFeed, visibleEvents: readonly GlobalActivityEvent[] = feed.events): string[] {
  return [
    `${visibleEvents.length} of ${feed.eventCount} events visible.`,
    `${visibleEvents.filter((event) => event.reviewRequired).length} visible events require review.`,
    `Next safe action: ${selectGlobalActivityNextAction(visibleEvents).label}.`,
  ];
}
