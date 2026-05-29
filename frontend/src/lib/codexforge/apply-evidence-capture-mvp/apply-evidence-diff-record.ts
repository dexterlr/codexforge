import type { ApplyEvidenceDiffRecord, ApplyEvidenceInput } from "./apply-evidence-capture-types";

export function buildApplyEvidenceDiffRecord(input: ApplyEvidenceInput): ApplyEvidenceDiffRecord {
  return { label: input.diffLabel, summary: input.diffSummary, rawDiffStoredByDefault: false, excerptCap: input.excerptCap };
}
