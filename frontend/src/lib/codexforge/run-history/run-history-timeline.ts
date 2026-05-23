import { buildRunHistoryRecord } from "./run-history-record";
import { selectRunHistoryNextAction } from "./run-history-next-action";
import { buildRunHistoryStableKey, type RunHistoryGroupMode, type RunHistoryRecord, type RunHistoryTimeline, type RunHistoryTimelineSection } from "./run-history-types";

export function groupRunHistoryRecords(records: readonly RunHistoryRecord[], mode: RunHistoryGroupMode = "recent"): RunHistoryTimelineSection[] {
  if (mode === "none" || mode === "recent") {
    return [{ sectionId: buildRunHistoryStableKey("run-history-section", mode, records.length), label: mode === "recent" ? "Recent runs" : "Runs", records: [...records] }];
  }
  const keyFor = (record: RunHistoryRecord) => {
    if (mode === "status") return record.validationStatus;
    if (mode === "workflow-kind") return record.runKind;
    if (mode === "review-state") return record.reviewStatus;
    if (mode === "route") return record.sourceRoute;
    return "Runs";
  };
  const groups = new Map<string, RunHistoryRecord[]>();
  for (const record of records) groups.set(keyFor(record), [...(groups.get(keyFor(record)) ?? []), record]);
  return [...groups.entries()].map(([label, groupedRecords]) => ({ sectionId: buildRunHistoryStableKey("run-history-section", mode, label), label, records: groupedRecords }));
}

export function buildRunHistoryTimeline(args: { records?: readonly RunHistoryRecord[] | null; groupMode?: RunHistoryGroupMode; sourceMode?: RunHistoryTimeline["sourceMode"] } = {}): RunHistoryTimeline {
  const records = args.records?.length ? [...args.records] : [
    buildRunHistoryRecord({
      runKind: "code-fix",
      label: "Coding flow result review",
      sourceWorkflowResultId: "demo-code-flow-result",
      sourceRoute: "/code-flow",
      selectedFilePath: "src/app/code-flow/page-client.tsx",
      changeSummary: "Completion links to run history for reviewed handoff.",
      validationStatus: "failed",
      reviewStatus: "needs-review",
      handoffReadiness: "needs-review",
      currentNextAction: "Review validation output, then route the failure.",
    }),
    buildRunHistoryRecord({
      runKind: "validation",
      label: "Validation output capture",
      sourceWorkflowResultId: "demo-validation-result",
      sourceRoute: "/validation",
      validationStatus: "passed",
      reviewStatus: "ready-for-handoff",
      handoffReadiness: "ready",
      memoryCandidateReadiness: "not-candidate",
      currentNextAction: "Copy a handoff or commit guidance after review.",
    }),
    buildRunHistoryRecord({
      runKind: "closed-loop",
      label: "Closed-loop failure route",
      sourceWorkflowResultId: "demo-closed-loop",
      sourceRoute: "/closed-loop",
      validationStatus: "failed",
      reviewStatus: "blocked",
      handoffReadiness: "ready",
      currentNextAction: "Paste the smallest failing check and choose one fix step.",
    }),
  ];
  const featuredRecord = records[0] ?? null;
  const nextAction = featuredRecord ? selectRunHistoryNextAction(featuredRecord).label : "No run history records supplied.";
  return {
    timelineId: buildRunHistoryStableKey("run-history-timeline", records.length, args.groupMode ?? "recent", featuredRecord?.runId),
    records,
    groupedSections: groupRunHistoryRecords(records, args.groupMode ?? "recent"),
    featuredRecord,
    totalCount: records.length,
    needsReviewCount: records.filter((record) => record.reviewStatus === "needs-review").length,
    failedCount: records.filter((record) => record.validationStatus === "failed").length,
    completedCount: records.filter((record) => record.reviewStatus === "complete" || record.validationStatus === "passed").length,
    nextAction,
    sourceMode: args.sourceMode ?? (args.records?.length ? "supplied-records" : "deterministic-sample"),
  };
}

export function summarizeRunHistoryTimeline(timeline: RunHistoryTimeline): string[] {
  return [
    `${timeline.totalCount} run history record(s), ${timeline.needsReviewCount} need review, ${timeline.failedCount} failed, ${timeline.completedCount} complete or passed.`,
    `Source mode: ${timeline.sourceMode}; no hidden persistence or Brain auto-mutation.`,
    `Next safe action: ${timeline.nextAction}.`,
  ];
}
