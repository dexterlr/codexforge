import { buildApplyValidationStableId, type ApplyValidationCompletionStatus, type CodingFlowCompletion, type CodingFlowCompletionChecklistItem, type HardenedApplyPolicy, type HardenedRollbackPlan, type HardenedValidationPlan, type ValidationOutputReview } from "./apply-validation-hardening-types";

export function buildCodingFlowCompletionChecklist(args: {
  previewReviewed?: boolean;
  approvalChecked?: boolean;
  rollbackReady?: boolean;
  validationCaptured?: boolean;
  resultReviewed?: boolean;
  nextActionSelected?: boolean;
  commitGuidanceReady?: boolean;
} = {}): CodingFlowCompletionChecklistItem[] {
  return [
    { id: "preview-reviewed", label: "Preview reviewed", complete: Boolean(args.previewReviewed) },
    { id: "approval-checked", label: "Approval checked", complete: Boolean(args.approvalChecked) },
    { id: "rollback-ready", label: "Rollback ready", complete: Boolean(args.rollbackReady) },
    { id: "validation-run-captured", label: "Validation run/captured", complete: Boolean(args.validationCaptured) },
    { id: "result-reviewed", label: "Result reviewed", complete: Boolean(args.resultReviewed) },
    { id: "next-action-selected", label: "Next action selected", complete: Boolean(args.nextActionSelected) },
    { id: "commit-guidance-ready", label: "Commit guidance ready", complete: Boolean(args.commitGuidanceReady) },
  ];
}

export function buildCodingFlowCompletion(args: { policy?: HardenedApplyPolicy | null; rollbackPlan?: HardenedRollbackPlan | null; validationPlan?: HardenedValidationPlan | null; outputReview?: ValidationOutputReview | null; nextActionSelected?: boolean | null } = {}): CodingFlowCompletion {
  const outputStatus = args.outputReview?.status ?? "unknown";
  const status: ApplyValidationCompletionStatus = args.policy?.blockedReasons.length ? "blocked" : outputStatus === "pass" ? "validation-passed" : outputStatus === "fail" ? "validation-failed" : args.policy?.requestReady ? "apply-request-ready" : args.validationPlan?.commands.length ? "applied-needs-validation" : "preview-ready";
  const checklist = buildCodingFlowCompletionChecklist({
    previewReviewed: Boolean(args.policy?.previewDiffRequired),
    approvalChecked: Boolean(args.policy?.explicitApprovalRequired && args.policy.requestReady),
    rollbackReady: Boolean(args.rollbackPlan?.ready),
    validationCaptured: Boolean(args.outputReview?.items.length),
    resultReviewed: outputStatus !== "unknown",
    nextActionSelected: Boolean(args.nextActionSelected),
    commitGuidanceReady: outputStatus === "pass",
  });
  const completion: CodingFlowCompletion = {
    id: buildApplyValidationStableId("coding-flow-completion", status, String(checklist.filter((item) => item.complete).length)),
    status,
    checklist,
    successGuidance: ["git status --short", "git diff --stat", "git add -A", "git commit -m \"<message>\"", "git tag <tag-if-appropriate>", "git push origin <branch> --follow-tags"],
    copyOnly: true,
    summary: [],
  };
  return { ...completion, summary: summarizeCodingFlowCompletion(completion) };
}

export function summarizeCodingFlowCompletion(completion: CodingFlowCompletion): string[] {
  return [
    `Completion status is ${completion.status}.`,
    `${completion.checklist.filter((item) => item.complete).length}/${completion.checklist.length} checklist item(s) complete.`,
    "Success guidance is copy-only and does not execute git commands from UI.",
  ];
}
