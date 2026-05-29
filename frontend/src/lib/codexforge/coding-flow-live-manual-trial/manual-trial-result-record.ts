import type { ManualTrialResultRecord } from "./live-manual-trial-types";

export function buildManualTrialResultRecord(input: Partial<ManualTrialResultRecord> = {}): ManualTrialResultRecord {
  return { scenarioId: input.scenarioId ?? "safe-empty-state-copy", status: input.status ?? "not-started", observations: input.observations ?? [], validationOutput: input.validationOutput ?? "", evidenceSupplied: input.evidenceSupplied ?? false, approvalReviewed: input.approvalReviewed ?? false };
}

export function validateManualTrialResultRecord(record: ManualTrialResultRecord): string[] {
  const issues: string[] = [];
  if (record.status === "pass" && !record.evidenceSupplied) issues.push("Pass requires supplied apply evidence.");
  if (record.status === "pass" && !record.validationOutput.trim()) issues.push("Pass requires pasted validation output.");
  if (!record.approvalReviewed) issues.push("Review guarded apply request before final decision.");
  return issues;
}
