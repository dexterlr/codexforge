import type { FrictionFinding, FrictionFixHandoff } from "./trial-friction-fix-types";

export function buildFrictionFixHandoff(findings: FrictionFinding[]): FrictionFixHandoff {
  const now = findings.filter((finding) => finding.priority === "now");
  return { title: "Friction fix plan", copyPlan: `Fix now: ${now.map((finding) => `${finding.route} ${finding.category}`).join("; ")}. Prefer small copy/layout/handoff fixes.`, routes: ["/code-flow/live-run", "/code-flow/manual-trial", "/guarded-apply-mvp", "/apply-evidence", "/validation-results", "/workflow-results", "/run-history", "/start"], noUnsafeExecution: true };
}
