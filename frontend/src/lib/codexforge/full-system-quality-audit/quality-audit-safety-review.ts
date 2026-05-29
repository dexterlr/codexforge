import { type QualityAuditSafetyReview } from "./full-system-quality-audit-types";

export function buildQualityAuditSafetyReview(input: Partial<QualityAuditSafetyReview> = {}): QualityAuditSafetyReview {
  return {
    id: input.id ?? "quality-audit-safety-review",
    boundaries: input.boundaries ?? [
      "Approval required",
      "Review first",
      "No auto-apply",
      "No auto-run",
      "Validate separately",
      "Preserve latest-message authority",
    ],
    blockedPatterns: input.blockedPatterns ?? [
      "appendEvent from UI",
      "saveBrainGraph from UI",
      "direct graph mutation from UI",
      "direct apply-diff call from UI",
      "direct write-file call from UI",
      "direct run-command call from UI",
      "broker-execution call",
      "memory auto-promotion",
    ],
    latestMessageAuthorityPreserved: input.latestMessageAuthorityPreserved ?? true,
    summary: input.summary ?? "The quality audit route is read-only and copy-only. It documents safety posture without execution buttons.",
  };
}
