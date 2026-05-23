import { buildTrialReviewStableKey, type TrialRunRecord } from "./coding-flow-trial-review-types";

export function buildTrialRunRecord(input: Partial<TrialRunRecord> = {}): TrialRunRecord {
  const sourceTrialId = input.sourceTrialId ?? "coding-flow-live-trial-phase-79";
  const finalTrialStatus = input.finalTrialStatus ?? "in-progress";
  const selectedFilePath = input.selectedFilePath;
  const trialRunId = buildTrialReviewStableKey("trial-run", `${sourceTrialId}-${selectedFilePath ?? "no-file"}-${finalTrialStatus}`);
  return {
    trialRunId,
    sourceTrialId,
    sourceRoute: input.sourceRoute ?? "/code-flow/trial",
    selectedFileCategory: input.selectedFileCategory ?? "safe UI copy, docs, empty state, or demo data",
    selectedFilePath,
    changeRequestSummary: input.changeRequestSummary ?? "Small copy-only coding-flow trial change.",
    screensVisited: input.screensVisited ? [...input.screensVisited] : ["/start", "/code-flow/trial", "/code-flow", "/workflow-results", "/run-history"],
    validationCommandsReviewed: input.validationCommandsReviewed ? [...input.validationCommandsReviewed] : ["npm run build", "npm run smoke:codexforge:server", "git diff --check"],
    validationResultStatus: input.validationResultStatus ?? "ready",
    operatorNotes: input.operatorNotes ?? "Record what worked, what was confusing, and what needs UX improvement.",
    finalTrialStatus,
    reviewRequired: input.reviewRequired ?? true,
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder: input.latestMessageAuthorityReminder ?? "Preserve latest-message authority when turning review notes into the next fix.",
  };
}

export function validateTrialRunRecord(record: TrialRunRecord): string[] {
  const issues: string[] = [];
  if (!record.sourceTrialId.trim()) issues.push("source trial id is required");
  if (!record.selectedFileCategory.trim()) issues.push("selected file category is required");
  if (!record.changeRequestSummary.trim()) issues.push("change request summary is required");
  if (!record.reviewRequired) issues.push("review required must remain true");
  if (!record.noAutoApplyGuarantee) issues.push("no-auto-apply guarantee must remain true");
  if (!record.noAutoRunGuarantee) issues.push("no-auto-run guarantee must remain true");
  return issues;
}

export function summarizeTrialRunRecord(record = buildTrialRunRecord()): string {
  return `${record.trialRunId}: ${record.finalTrialStatus}, ${record.screensVisited.length} screens visited, validation ${record.validationResultStatus}.`;
}
