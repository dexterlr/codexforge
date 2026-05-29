import type { ApplyEvidenceRecord, ApplyEvidenceSummary } from "./apply-evidence-capture-types";

export function buildApplyEvidenceSummary(record: ApplyEvidenceRecord): ApplyEvidenceSummary {
  return { title: "Capture apply evidence", status: record.boundaryRecord.status, selectedFile: record.input.selectedFile, nextAction: "Copy evidence pack" };
}
