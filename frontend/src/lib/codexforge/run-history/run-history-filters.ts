import type { RunHistoryFilter, RunHistoryFilterId, RunHistoryRecord } from "./run-history-types";

const FILTERS: readonly Omit<RunHistoryFilter, "count" | "selected">[] = [
  { filterId: "all", label: "All", description: "Show every reviewed or pending run." },
  { filterId: "needs-review", label: "Needs review", description: "Runs that still need operator review." },
  { filterId: "failed", label: "Failed", description: "Runs with failed validation." },
  { filterId: "passed", label: "Passed", description: "Runs with passed validation." },
  { filterId: "blocked", label: "Blocked", description: "Runs waiting on an unblock step." },
  { filterId: "code-fix", label: "Code fix", description: "Coding flow runs." },
  { filterId: "validation", label: "Validation", description: "Validation runs." },
  { filterId: "closed-loop", label: "Closed loop", description: "Closed-loop failure review runs." },
  { filterId: "creative", label: "Creative", description: "Creative plan or review runs." },
  { filterId: "local-setup", label: "Local setup", description: "Local setup and health probe runs." },
  { filterId: "memory-candidate", label: "Memory candidate", description: "Runs with reviewed memory candidates." },
  { filterId: "handoff-ready", label: "Handoff ready", description: "Runs ready for copyable handoff." },
];

function matches(record: RunHistoryRecord, filterId: RunHistoryFilterId): boolean {
  if (filterId === "all") return true;
  if (filterId === "needs-review") return record.reviewStatus === "needs-review";
  if (filterId === "failed") return record.validationStatus === "failed";
  if (filterId === "passed") return record.validationStatus === "passed";
  if (filterId === "blocked") return record.reviewStatus === "blocked";
  if (filterId === "code-fix") return record.runKind === "code-fix";
  if (filterId === "validation") return record.runKind === "validation";
  if (filterId === "closed-loop") return record.runKind === "closed-loop";
  if (filterId === "creative") return record.runKind === "creative-plan" || record.runKind === "creative-review";
  if (filterId === "local-setup") return record.runKind === "local-setup" || record.runKind === "health-probe";
  if (filterId === "memory-candidate") return record.memoryCandidateReadiness === "ready-for-review";
  if (filterId === "handoff-ready") return record.handoffReadiness === "ready";
  return true;
}

export function buildRunHistoryFilters(records: readonly RunHistoryRecord[], selectedFilter: RunHistoryFilterId = "all"): RunHistoryFilter[] {
  return FILTERS.map((filter) => ({
    ...filter,
    count: records.filter((record) => matches(record, filter.filterId)).length,
    selected: filter.filterId === selectedFilter,
  }));
}

export function applyRunHistoryFilters(records: readonly RunHistoryRecord[], selectedFilter: RunHistoryFilterId = "all"): RunHistoryRecord[] {
  return records.filter((record) => matches(record, selectedFilter));
}

export function summarizeRunHistoryFilters(filters: readonly RunHistoryFilter[]): string[] {
  return filters.map((filter) => `${filter.label}: ${filter.count}${filter.selected ? " selected" : ""}.`);
}
