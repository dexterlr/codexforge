import { buildTrialReviewStableKey, type TrialGoNoGoDecision, type TrialGoNoGoOutput, type TrialGoNoGoReason, type TrialPassFailChecklist, type TrialSafetyReview } from "./coding-flow-trial-review-types";
import { buildTrialPassFailChecklist } from "./trial-pass-fail-checklist";
import { buildTrialSafetyReview } from "./trial-safety-review";

export function buildTrialGoNoGoReason(label: string, passed: boolean, note: string): TrialGoNoGoReason {
  return { reasonId: buildTrialReviewStableKey("go-no-go-reason", label), label, passed, note };
}

export function buildTrialGoNoGoDecision(args: { checklist?: TrialPassFailChecklist; safety?: TrialSafetyReview } = {}): TrialGoNoGoDecision {
  const checklist = args.checklist ?? buildTrialPassFailChecklist();
  const safety = args.safety ?? buildTrialSafetyReview();
  const primaryActionCheck = checklist.items.find((item) => item.label.includes("/code-flow explained"));
  const failOrBlocked = checklist.items.filter((item) => item.status === "fail" || item.status === "blocked").length;
  const passCount = checklist.items.filter((item) => item.status === "pass").length;
  let output: TrialGoNoGoOutput = "go-with-fixes";
  if (safety.overallStatus === "blocker" || primaryActionCheck?.status === "fail" || primaryActionCheck?.status === "blocked") output = "no-go";
  else if (failOrBlocked > 0) output = "blocked";
  else if (passCount >= Math.max(1, checklist.items.length - 2)) output = "go";
  return {
    decisionId: "trial-go-no-go-decision",
    output,
    reasons: [
      buildTrialGoNoGoReason("core flow understandable", primaryActionCheck?.status !== "fail", "No-go if /code-flow primary action is unclear."),
      buildTrialGoNoGoReason("no unsafe execution", safety.overallStatus !== "blocker", "No-go if any safety blocker appears."),
      buildTrialGoNoGoReason("apply review clear", true, "Apply remains approval-gated."),
      buildTrialGoNoGoReason("validation clear", true, "Validation stays manual and copy-only."),
      buildTrialGoNoGoReason("result capture clear", true, "Workflow result and run history handoff remain reviewable."),
      buildTrialGoNoGoReason("next action clear", true, "Trial Review chooses the next UX fix."),
      buildTrialGoNoGoReason("critical UX blockers absent", failOrBlocked === 0, "Go-with-fixes is acceptable for minor copy/layout issues."),
    ],
    recommendation: output === "go" ? "Ready for stronger real apply hardening review." : output === "go-with-fixes" ? "Fix small UX issues before tightening real apply." : "Do not tighten real apply until blockers are resolved.",
  };
}

export function summarizeTrialGoNoGoDecision(decision = buildTrialGoNoGoDecision()): string {
  return `${decision.output}: ${decision.recommendation}`;
}
