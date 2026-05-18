import type { GlobalActivityEvent, GlobalActivityTimeline, GlobalActivityTimelineGroup, GlobalActivityTimelineGroupLabel } from "./global-activity-types";
import { buildGlobalActivityStableKey } from "./global-activity-types";
import { rankGlobalActivityEvents } from "./activity-feed-priority";

const GROUPS: readonly GlobalActivityTimelineGroupLabel[] = [
  "Needs attention",
  "Verification",
  "Regression workflow",
  "Patch workflow",
  "Apply workflow",
  "Memory and Brain review",
  "Creative production",
  "Stabilization",
  "Navigation and commands",
];

function groupFor(event: GlobalActivityEvent): GlobalActivityTimelineGroupLabel {
  if (event.severity === "blocker" || event.status === "needs-attention" || event.type === "safety.blocked") return "Needs attention";
  if (event.source === "verification") return "Verification";
  if (event.source.startsWith("regression")) return "Regression workflow";
  if (event.source === "patch-preview" || event.source === "preview-diff") return "Patch workflow";
  if (event.source === "apply-gate" || event.source === "post-apply-verification") return "Apply workflow";
  if (event.source === "memory-review" || event.source === "brain-review" || event.source === "brain-governance") return "Memory and Brain review";
  if (event.source === "creative") return "Creative production";
  if (event.source === "stabilization") return "Stabilization";
  return "Navigation and commands";
}

export function buildGlobalActivityTimelineGroup(label: GlobalActivityTimelineGroupLabel, events: readonly GlobalActivityEvent[]): GlobalActivityTimelineGroup {
  const groupEvents = rankGlobalActivityEvents(events.filter((event) => groupFor(event) === label));
  return {
    id: buildGlobalActivityStableKey("timeline", label),
    label,
    events: groupEvents,
    summary: `${label}: ${groupEvents.length} events.`,
  };
}

export function buildGlobalActivityTimeline(events: readonly GlobalActivityEvent[]): GlobalActivityTimeline {
  const groups = GROUPS.map((label) => buildGlobalActivityTimelineGroup(label, events)).filter((group) => group.events.length > 0 || group.label === "Needs attention");
  return {
    id: "global-activity-timeline",
    groups,
    summary: summarizeGlobalActivityTimeline(groups),
  };
}

export function summarizeGlobalActivityTimeline(timelineOrGroups: GlobalActivityTimeline | readonly GlobalActivityTimelineGroup[]): string[] {
  const groups = "groups" in timelineOrGroups ? timelineOrGroups.groups : timelineOrGroups;
  return [`${groups.length} timeline groups visible.`, "Timeline includes Needs attention, Regression workflow, and Patch workflow."];
}
