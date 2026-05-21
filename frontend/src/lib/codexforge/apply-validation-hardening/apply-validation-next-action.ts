import { buildApplyValidationStableId, type ApplyValidationNextAction, type ApplyValidationNextActionPlan, type CodingFlowCompletion, type HardenedApplyInput, type HardenedApplyPolicy, type HardenedRollbackPlan, type HardenedValidationPlan, type ValidationOutputReview } from "./apply-validation-hardening-types";

export function selectApplyValidationNextAction(args: { input?: HardenedApplyInput | null; policy?: HardenedApplyPolicy | null; rollbackPlan?: HardenedRollbackPlan | null; validationPlan?: HardenedValidationPlan | null; outputReview?: ValidationOutputReview | null; completion?: CodingFlowCompletion | null } = {}): ApplyValidationNextAction {
  if (args.policy?.blockedReasons.some((reason) => reason.toLowerCase().includes("high risk"))) return { id: "blocked-high-risk", label: "Stop and review", href: "/apply-validation", detail: "Blocked high risk requires explicit review.", priority: 1, stopAndReview: true };
  if (!args.input?.previewDiffText) return { id: "missing-preview", label: "Open Real Patch Preview", href: "/files", detail: "Missing preview routes to Real Patch Preview.", priority: 2, stopAndReview: false };
  if (args.policy?.blockedReasons.some((reason) => reason.toLowerCase().includes("approval"))) return { id: "missing-approval", label: "Open Approved Patch Apply", href: "/files", detail: "Missing approval routes to Approved Patch Apply.", priority: 3, stopAndReview: false };
  if (!args.rollbackPlan?.ready) return { id: "missing-rollback", label: "Show rollback plan", href: "/apply-validation", detail: "Rollback must be visible before apply.", priority: 4, stopAndReview: false };
  if (!args.validationPlan?.commands.length) return { id: "missing-validation-plan", label: "Prepare validation", href: "/apply-validation", detail: "Prepare copy-only validation commands.", priority: 5, stopAndReview: false };
  if (!args.outputReview?.items.length) return { id: "missing-output", label: "Open Validation Runner", href: "/validation", detail: "Missing output routes to Validation Runner.", priority: 6, stopAndReview: false };
  if (args.outputReview.status === "fail") return { id: "failing-output", label: "Open Closed Loop", href: "/closed-loop", detail: "Failing output routes to Closed Loop.", priority: 7, stopAndReview: false };
  if (args.outputReview.status === "pass") return { id: "passing-output", label: "Show completion guidance", href: "/apply-validation", detail: "Passing output routes to commit/tag/push guidance.", priority: 8, stopAndReview: false };
  return { id: "unknown-output", label: "Review validation", href: "/validation", detail: "Unknown output routes to Validation Runner.", priority: 9, stopAndReview: false };
}

export function buildApplyValidationNextActionPlan(args: Parameters<typeof selectApplyValidationNextAction>[0] = {}): ApplyValidationNextActionPlan {
  const selected = selectApplyValidationNextAction(args);
  const candidates = [
    selected,
    { id: "real-patch-preview", label: "Real Patch Preview", href: "/files", detail: "Review preview diff before apply.", priority: 20, stopAndReview: false },
    { id: "validation-runner", label: "Validation Runner", href: "/validation", detail: "Capture supplied/manual output.", priority: 21, stopAndReview: false },
    { id: "closed-loop", label: "Closed Loop", href: "/closed-loop", detail: "Route failures into a reviewed fix loop.", priority: 22, stopAndReview: false },
  ];
  const plan: ApplyValidationNextActionPlan = {
    id: buildApplyValidationStableId("apply-validation-next-action", selected.id),
    selected,
    candidates,
    summary: [],
  };
  return { ...plan, summary: summarizeApplyValidationNextAction(plan) };
}

export function summarizeApplyValidationNextAction(plan: ApplyValidationNextActionPlan): string[] {
  return [`Next safe action: ${plan.selected.label}.`, plan.selected.detail];
}
