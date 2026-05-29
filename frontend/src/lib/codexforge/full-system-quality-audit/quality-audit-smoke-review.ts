import { type QualityAuditSmokeReview } from "./full-system-quality-audit-types";

export function buildQualityAuditSmokeReview(input: Partial<QualityAuditSmokeReview> = {}): QualityAuditSmokeReview {
  return {
    id: input.id ?? "quality-audit-smoke-review",
    requiredScripts: input.requiredScripts ?? [
      "smoke-codexforge-full-system-quality-audit.ps1",
      "smoke-codexforge-guarded-apply-mvp.ps1",
      "smoke-codexforge-apply-evidence-capture-mvp.ps1",
      "smoke-codexforge-validation-result-capture-mvp.ps1",
      "smoke-codexforge-coding-flow-live-run-mvp.ps1",
      "smoke-codexforge-coding-flow-mvp-release-audit.ps1",
    ],
    managedSuiteEntry: input.managedSuiteEntry ?? "Full System Quality Audit",
    duplicateEntryRisk: input.duplicateEntryRisk ?? false,
    summary: input.summary ?? "Managed smoke suite includes Full System Quality Audit exactly once.",
  };
}
