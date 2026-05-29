import { type QualityAuditFixPlan } from "./full-system-quality-audit-types";

export function buildQualityAuditFixPlan(input: Partial<QualityAuditFixPlan> = {}): QualityAuditFixPlan {
  return {
    id: input.id ?? "quality-audit-fix-plan",
    primaryAction: input.primaryAction ?? "Copy audit summary",
    steps: input.steps ?? [
      "Check bugs and build status.",
      "Verify route handoffs on the coding MVP path.",
      "Confirm smoke suite coverage once.",
      "Keep unsafe execution actions out of UI.",
    ],
    blockedActions: input.blockedActions ?? [
      "No auto-apply",
      "No auto-run",
      "No direct graph mutation",
      "No hidden memory promotion",
    ],
    completionSignal: input.completionSignal ?? "All required validation commands pass and git diff check is clean.",
  };
}
