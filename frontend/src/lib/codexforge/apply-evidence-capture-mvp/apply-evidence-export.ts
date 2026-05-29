import type { ApplyEvidenceExport, ApplyEvidenceRecord } from "./apply-evidence-capture-types";

export function buildApplyEvidenceExport(record: ApplyEvidenceRecord): ApplyEvidenceExport {
  return {
    format: "markdown",
    title: "Apply evidence pack",
    redacted: true,
    body: `# Apply evidence pack\nSelected file: ${record.input.selectedFile}\nDiff: ${record.diffRecord.label}\nPolicy: ${record.policyDecision.decision}\nApproval: ${record.approvalRecord.status}\nBoundary: ${record.boundaryRecord.status}\n${record.rollbackRecord.guidance}\n${record.validationHandoff.summary}\nNo auto-apply. No auto-run. Preserve latest-message authority.`,
  };
}
