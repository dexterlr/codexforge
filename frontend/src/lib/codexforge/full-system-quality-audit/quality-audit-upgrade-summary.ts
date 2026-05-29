import { type FullSystemQualityAuditSession, type QualityAuditUpgradeSummary } from "./full-system-quality-audit-types";

export function buildQualityAuditUpgradeSummary(input: Partial<QualityAuditUpgradeSummary> = {}): QualityAuditUpgradeSummary {
  return {
    id: input.id ?? "quality-audit-upgrade-summary",
    headline: input.headline ?? "System quality audit is now first-class, read-only, and smoke-backed.",
    uxUpgrades: input.uxUpgrades ?? [
      "Main path copy uses plain product wording.",
      "Advanced details are collapsed or visually secondary.",
      "Safety badges stay compact above the fold.",
    ],
    routeFixes: input.routeFixes ?? [
      "Canonical MVP path references /code-flow/live-run.",
      "Guarded apply, evidence, validation, result, and history handoffs remain visible.",
      "Failed validation routes to /closed-loop.",
    ],
    smokeFixes: input.smokeFixes ?? [
      "New Phase 89 smoke verifies domain, route, UI, exports, safety, and suite inclusion.",
    ],
    safetyResult: input.safetyResult ?? "No unsafe execution buttons, no direct mutation calls, no hidden persistence.",
  };
}

export function summarizeQualityAuditSession(session: FullSystemQualityAuditSession): string {
  return [
    "System quality audit",
    `Checks: ${session.checks.length}`,
    `Findings: ${session.findings.length}`,
    `Path: ${session.routeMap.primaryPath}`,
    `Safety: ${session.safetyReview.summary}`,
    `Smoke: ${session.smokeReview.summary}`,
    `Upgrade: ${session.upgradeSummary.headline}`,
  ].join("\n");
}
