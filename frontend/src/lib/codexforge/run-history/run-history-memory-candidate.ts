import { buildRunHistoryStableKey, capRunHistoryText, type RunHistoryMemoryCandidate, type RunHistoryMemoryCategory, type RunHistoryRecord, type RunHistoryRecordValidation } from "./run-history-types";

export function buildRunHistoryMemoryCandidate(args: { record: RunHistoryRecord; category?: RunHistoryMemoryCategory; reusableLesson?: string | null }): RunHistoryMemoryCandidate {
  const record = args.record;
  const reviewed = record.reviewStatus === "reviewed" || record.reviewStatus === "ready-for-memory-review" || record.reviewStatus === "complete";
  return {
    candidateId: buildRunHistoryStableKey("run-history-memory-candidate", record.runId, args.category ?? "unknown"),
    sourceRunId: record.runId,
    title: `Run history lesson: ${record.label}`,
    summary: capRunHistoryText(record.changeSummary ?? record.currentNextAction, 500).text,
    reusableLesson: capRunHistoryText(args.reusableLesson ?? "Capture only the reviewed lesson from this run; exclude secrets and raw logs.", 500).text,
    projectContext: `Source route ${record.sourceRoute}; run kind ${record.runKind}.`,
    excludedSensitiveDetails: ["raw logs", "secrets", "private notes", "large diffs"],
    promotionReadiness: reviewed ? "ready-for-review" : record.reviewStatus === "blocked" ? "blocked" : "needs-review",
    reviewRequired: true,
    suggestedMemoryCategory: args.category ?? (record.validationStatus === "failed" ? "validation-failure" : "workflow-preference"),
    noAutoPromotionGuarantee: true,
    noSecrets: true,
    noHugeLogs: true,
  };
}

export function validateRunHistoryMemoryCandidate(candidate: RunHistoryMemoryCandidate): RunHistoryRecordValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!candidate.noAutoPromotionGuarantee) blockedReasons.push("Memory candidate says no-auto-promotion guarantee is missing.");
  if (!candidate.noSecrets) blockedReasons.push("Secrets exclusion guarantee is missing.");
  if (!candidate.noHugeLogs) blockedReasons.push("Huge log exclusion guarantee is missing.");
  if (candidate.promotionReadiness !== "ready-for-review") warnings.push("Candidate is not reviewed only yet.");
  return { ok: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeRunHistoryMemoryCandidate(candidate: RunHistoryMemoryCandidate): string[] {
  return [
    `${candidate.title}: ${candidate.promotionReadiness}.`,
    `Suggested category ${candidate.suggestedMemoryCategory}; review required; no-auto-promotion.`,
    `Excluded sensitive details: ${candidate.excludedSensitiveDetails.join(", ")}.`,
  ];
}
