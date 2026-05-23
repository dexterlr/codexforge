import { buildTrialReviewStableKey, type TrialUxFixItem, type TrialUxFixPlan } from "./coding-flow-trial-review-types";

export function buildTrialUxFixItem(input: Omit<TrialUxFixItem, "fixId"> & { fixId?: string }): TrialUxFixItem {
  const priority = input.priority === "unknown" && input.category === "primary-action" ? "now" : input.priority;
  return { ...input, priority, fixId: input.fixId ?? buildTrialReviewStableKey("ux-fix", `${input.category}-${input.route}-${input.title}`) };
}

export function buildTrialUxFixPlan(items: TrialUxFixItem[] = DEFAULT_FIXES): TrialUxFixPlan {
  return { planId: "trial-ux-fix-plan", title: "UX fix plan", items: items.map((item) => ({ ...item })) };
}

export function summarizeTrialUxFixPlan(plan = buildTrialUxFixPlan()): string {
  const next = plan.items.find((item) => item.priority === "now") ?? plan.items[0];
  return `${plan.items.length} fixes, top next fix: ${next?.title ?? "none"}.`;
}

const DEFAULT_FIXES = [
  buildTrialUxFixItem({ category: "primary-action", title: "Clarify the Code Flow next action", route: "/code-flow", problem: "The operator may not know what to do next.", proposedFix: "Make one primary action visible and move secondary links below.", userBenefit: "The trial keeps moving without hesitation.", priority: "now", effort: "small", safetyImpact: "Preserves approval-gated flow.", suggestedNextPhase: "Phase 81 UX tightening" }),
  buildTrialUxFixItem({ category: "validation", title: "Make validation capture simpler", route: "/validation", problem: "Manual output capture can feel vague.", proposedFix: "Add pass/fail prompts and capped output guidance.", userBenefit: "Operators capture useful evidence faster.", priority: "now", effort: "small", safetyImpact: "No auto-run; copy-only guidance.", suggestedNextPhase: "Phase 81 validation copy pass" }),
  buildTrialUxFixItem({ category: "result-capture", title: "Link results to trial review", route: "/workflow-results", problem: "Result handoff and trial review are separate.", proposedFix: "Add a Trial Review handoff link.", userBenefit: "Review notes land in one place.", priority: "soon", effort: "small", safetyImpact: "No persistence mutation.", suggestedNextPhase: "Phase 81 handoff polish" }),
  buildTrialUxFixItem({ category: "safety-copy", title: "Compact repeated safety copy", route: "/apply-validation", problem: "Repeated warnings can hide task guidance.", proposedFix: "Keep one compact safety strip plus context-specific warnings.", userBenefit: "Safety stays visible without noise.", priority: "later", effort: "small", safetyImpact: "Improves safety comprehension.", suggestedNextPhase: "Phase 82 safety copy review" }),
  buildTrialUxFixItem({ category: "flow-handoff", title: "Add Review coding trial shortcut", route: "/start", problem: "Operators need a clear post-trial review path.", proposedFix: "Expose Review coding trial as a friendly action.", userBenefit: "Manual trial leads to a go/no-go decision.", priority: "soon", effort: "small", safetyImpact: "Review-only route.", suggestedNextPhase: "Phase 81 route handoff polish" }),
];
