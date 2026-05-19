import { normalizeGlobalActivityEvent } from "./activity-event-model";
import {
  buildActivityEventsFromApplyGate,
  buildActivityEventsFromBrainContinuity,
  buildActivityEventsFromBrainGovernance,
  buildActivityEventsFromCreative,
  buildActivityEventsFromMemoryReview,
  buildActivityEventsFromPatchQueue,
  buildActivityEventsFromRegressionFixQueue,
  buildActivityEventsFromRegressionTriage,
  buildActivityEventsFromRuntimeReplay,
  buildActivityEventsFromSnapshotRestore,
  buildActivityEventsFromStabilization,
  buildActivityEventsFromVerification,
} from "./activity-source-adapters";
import { selectGlobalActivityNextAction } from "./activity-next-action";
import { rankGlobalActivityEvents, scoreGlobalActivityEventPriority } from "./activity-feed-priority";
import type { GlobalActivityEvent, GlobalActivityFeed, GlobalActivityFeedInput } from "./global-activity-types";

const DEFAULT_SOURCE_INPUT = [{}] as const;

export function mergeGlobalActivityEvents(...groups: readonly GlobalActivityEvent[][]): GlobalActivityEvent[] {
  return dedupeGlobalActivityEvents(groups.flat());
}

export function dedupeGlobalActivityEvents(events: readonly GlobalActivityEvent[]): GlobalActivityEvent[] {
  const byId = new Map<string, GlobalActivityEvent>();
  for (const event of events) {
    const existing = byId.get(event.id);
    if (!existing || scoreGlobalActivityEventPriority(event) > scoreGlobalActivityEventPriority(existing)) {
      byId.set(event.id, event);
    }
  }
  return rankGlobalActivityEvents([...byId.values()]);
}

export function buildGlobalActivityFeed(input: GlobalActivityFeedInput = {}): GlobalActivityFeed {
  const events = mergeGlobalActivityEvents(
    (input.events ?? []).map(normalizeGlobalActivityEvent),
    buildActivityEventsFromVerification(input.verification ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromRegressionTriage(input.regressionTriage ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromRegressionFixQueue(input.regressionFixQueue ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromPatchQueue(input.patchQueue ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromApplyGate(input.applyGate ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromMemoryReview(input.memoryReview ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromBrainGovernance(input.brainGovernance ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromRuntimeReplay(input.runtimeReplay ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromSnapshotRestore(input.snapshotRestore ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromBrainContinuity(input.brainContinuity ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromCreative(input.creative ?? DEFAULT_SOURCE_INPUT),
    buildActivityEventsFromStabilization(input.stabilization ?? DEFAULT_SOURCE_INPUT)
  );
  const sources = new Set(events.map((event) => event.source));
  const nextAction = selectGlobalActivityNextAction(events);
  return {
    id: "global-activity-feed",
    events,
    eventCount: events.length,
    sourceCount: sources.size,
    blockerCount: events.filter((event) => event.severity === "blocker").length,
    warningCount: events.filter((event) => event.severity === "warning").length,
    reviewRequiredCount: events.filter((event) => event.reviewRequired).length,
    highestPriorityEvent: events[0],
    nextSafeAction: nextAction.label,
    summary: summarizeGlobalActivityFeed(events),
  };
}

export function summarizeGlobalActivityFeed(feedOrEvents: GlobalActivityFeed | readonly GlobalActivityEvent[]): string[] {
  const events = "events" in feedOrEvents ? feedOrEvents.events : feedOrEvents;
  const blockerCount = events.filter((event) => event.severity === "blocker").length;
  const warningCount = events.filter((event) => event.severity === "warning").length;
  const reviewCount = events.filter((event) => event.reviewRequired).length;
  return [
    `${events.length} deterministic read-only activity events.`,
    `${blockerCount} blockers, ${warningCount} warnings, ${reviewCount} review-required events.`,
    "No command execution, no file writes, no Brain graph mutation, and no auto-persistence.",
  ];
}
