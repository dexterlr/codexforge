import {
  buildGuardedApplyCandidateStableId,
  type GuardedApplyImplementationGap,
  type GuardedApplyImplementationGapCategory,
  type GuardedApplyImplementationGapPriority,
  type GuardedApplyImplementationGaps,
} from "./guarded-apply-candidate-types";

export function buildGuardedApplyImplementationGap(
  category: GuardedApplyImplementationGapCategory,
  priority: GuardedApplyImplementationGapPriority,
  label: string,
  detail: string,
  nextAction: string
): GuardedApplyImplementationGap {
  return {
    id: buildGuardedApplyCandidateStableId("gap", category, priority, label),
    category,
    priority,
    label,
    detail,
    nextAction,
  };
}

export function buildGuardedApplyImplementationGaps(): GuardedApplyImplementationGaps {
  const gaps = [
    buildGuardedApplyImplementationGap("diff-boundary", "blocker", "no exact diff hash/label", "Candidate approval cannot bind to exact patch until a stable diff hash/label is available.", "Add exact diff label/hash before implementation."),
    buildGuardedApplyImplementationGap("approval", "blocker", "approval not tied to exact diff", "Approval not tied to exact diff is unsafe for guarded apply.", "Bind approval to selected file, diff label/hash, and latest request."),
    buildGuardedApplyImplementationGap("rollback", "high", "rollback not explicit enough", "Rollback guidance must be concrete before a real candidate.", "Keep target file restore, staged restore, git revert, and failure guidance visible."),
    buildGuardedApplyImplementationGap("validation", "high", "validation result capture missing", "Validation result capture must be ready before handoff.", "Capture command, status, output excerpt, and failure route."),
    buildGuardedApplyImplementationGap("result-capture", "high", "apply evidence not captured", "Apply evidence must capture touched file list and result status.", "Define evidence capture contract before MVP."),
    buildGuardedApplyImplementationGap("UI", "medium", "UI still too confusing", "Operator should see one file, one diff, one approval, one rollback, one validation checklist.", "Keep advanced details secondary and one primary copy action."),
    buildGuardedApplyImplementationGap("smoke", "medium", "missing smoke coverage", "Smoke must prove route, domain, safety markers, and managed suite entry.", "Keep guarded candidate smoke in the all suite exactly once."),
    buildGuardedApplyImplementationGap("tool-boundary", "blocker", "direct tool call risk", "Any future apply must not call write-file, apply-diff, or run-command directly from UI.", "Use existing guarded apply boundary only if present or add a dedicated policy-gated boundary."),
  ];
  const model: GuardedApplyImplementationGaps = {
    id: buildGuardedApplyCandidateStableId("implementation-gaps", gaps.map((gap) => gap.id).join("|")),
    gaps,
    blockerCount: gaps.filter((gap) => gap.priority === "blocker").length,
    highCount: gaps.filter((gap) => gap.priority === "high").length,
    summary: [],
  };
  return { ...model, summary: summarizeGuardedApplyImplementationGaps(model) };
}

export function summarizeGuardedApplyImplementationGaps(model: GuardedApplyImplementationGaps): string[] {
  return [
    `${model.gaps.length} implementation gap(s) tracked.`,
    `${model.blockerCount} blocker gap(s), ${model.highCount} high priority gap(s).`,
    "Clear blocker gaps before implementation.",
  ];
}
