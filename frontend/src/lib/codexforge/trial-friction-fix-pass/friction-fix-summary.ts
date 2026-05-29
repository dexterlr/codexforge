import type { FrictionFinding, FrictionFixSummary } from "./trial-friction-fix-types";

export function buildFrictionFixSummary(findings: FrictionFinding[]): FrictionFixSummary {
  return { title: "Fix trial friction", nowCount: findings.filter((finding) => finding.priority === "now").length, nextAction: "Copy friction fix plan", safety: "no broad rewrites, no unsafe execution, no auto-apply, no auto-run" };
}
