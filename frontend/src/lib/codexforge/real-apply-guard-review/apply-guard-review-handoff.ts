import {
  buildRealApplyGuardReviewStableKey,
  type ApplyApprovalPacketReview,
  type ApplyCommandWriteSeparation,
  type ApplyDiffBoundaryReview,
  type ApplyGuardGoNoGo,
  type ApplyGuardPolicyReview,
  type ApplyGuardReviewHandoff,
  type ApplyGuardReviewHandoffSection,
  type ApplyGuardReviewInput,
  type ApplyPathBoundaryReview,
  type ApplyRollbackConfidence,
  type ApplyValidationRequirement,
} from "./real-apply-guard-review-types";

export function buildApplyGuardReviewHandoffSection(input: {
  id: string;
  title: string;
  lines: readonly string[];
}): ApplyGuardReviewHandoffSection {
  return {
    id: buildRealApplyGuardReviewStableKey("apply-guard-review-handoff-section", input.id),
    title: input.title,
    lines: input.lines.map((line) => line.trim()).filter(Boolean),
  };
}

export function buildApplyGuardReviewHandoff(args: {
  input: ApplyGuardReviewInput;
  policyReview: ApplyGuardPolicyReview;
  approvalReview: ApplyApprovalPacketReview;
  diffBoundaryReview: ApplyDiffBoundaryReview;
  pathBoundaryReview: ApplyPathBoundaryReview;
  rollbackConfidence: ApplyRollbackConfidence;
  commandWriteSeparation: ApplyCommandWriteSeparation;
  validationRequirement: ApplyValidationRequirement;
  goNoGo: ApplyGuardGoNoGo;
}): ApplyGuardReviewHandoff {
  const sections = [
    buildApplyGuardReviewHandoffSection({ id: "summary", title: "Guard Review Summary", lines: args.input.summary }),
    buildApplyGuardReviewHandoffSection({ id: "policy", title: "Policy Findings", lines: args.policyReview.summary }),
    buildApplyGuardReviewHandoffSection({ id: "approval", title: "Approval Findings", lines: args.approvalReview.summary }),
    buildApplyGuardReviewHandoffSection({ id: "diff-path", title: "Diff/Path Boundary Findings", lines: [...args.diffBoundaryReview.summary, ...args.pathBoundaryReview.summary] }),
    buildApplyGuardReviewHandoffSection({ id: "rollback", title: "Rollback Confidence", lines: args.rollbackConfidence.summary }),
    buildApplyGuardReviewHandoffSection({ id: "separation", title: "Command/Write Separation", lines: args.commandWriteSeparation.summary }),
    buildApplyGuardReviewHandoffSection({ id: "validation", title: "Validation Requirement", lines: args.validationRequirement.summary }),
    buildApplyGuardReviewHandoffSection({ id: "decision", title: "Go/No-Go Decision", lines: args.goNoGo.summary }),
    buildApplyGuardReviewHandoffSection({ id: "required-fixes", title: "Required Fixes", lines: requiredFixes(args) }),
    buildApplyGuardReviewHandoffSection({ id: "next", title: "Next Implementation Recommendation", lines: [args.goNoGo.nextSafeAction] }),
  ];
  const markdownGuardReport = sections.map((section) => [`## ${section.title}`, ...section.lines.map((line) => `- ${line}`)].join("\n")).join("\n\n");
  const handoff: ApplyGuardReviewHandoff = {
    id: buildRealApplyGuardReviewStableKey("apply-guard-review-handoff", args.input.reviewId, args.goNoGo.decision),
    sections,
    markdownGuardReport,
    uxFixPrompt: [
      "UX fix prompt: improve Apply Guard Review clarity.",
      "Keep review-only behavior, one primary action, copy-only handoffs, no direct apply buttons, no command execution buttons, and no raw JSON above fold.",
    ].join("\n"),
    safetyFixPrompt: [
      "Safety fix prompt: close apply guard blockers.",
      "Preserve approval packet enforcement, diff boundaries, path boundaries, rollback, command/write separation, validation requirement, and latest-message authority.",
    ].join("\n"),
    guardedApplyCandidateBrief: [
      "Guarded apply candidate brief.",
      `Decision: ${args.goNoGo.decision}.`,
      "go-for-guarded-apply-candidate does not execute in Phase 82.",
      "executionAllowed false in Phase 82.",
      "Candidate requires explicit approval, dry-run evidence, rollback, validation, and no direct UI apply/write/run bypass.",
    ].join("\n"),
    copyOnly: true,
    summary: [],
  };
  return { ...handoff, summary: summarizeApplyGuardReviewHandoff(handoff) };
}

function requiredFixes(args: Parameters<typeof buildApplyGuardReviewHandoff>[0]): string[] {
  const blocked = [
    ...args.policyReview.checks,
    ...args.approvalReview.checks,
    ...args.diffBoundaryReview.checks,
    ...args.pathBoundaryReview.checks,
    ...args.rollbackConfidence.items,
    ...args.commandWriteSeparation.checks,
    ...args.validationRequirement.checks,
  ].filter((check) => check.status === "blocker" || check.status === "warning");
  return blocked.length > 0 ? blocked.map((check) => `${check.label}: ${check.detail}`) : ["No required fixes detected by the guard review."];
}

export function summarizeApplyGuardReviewHandoff(handoff: ApplyGuardReviewHandoff): string[] {
  return [
    `${handoff.sections.length} handoff section(s) prepared.`,
    "Markdown guard report, UX fix prompt, safety fix prompt, and guarded apply candidate brief are copyable only.",
    "No file writes and no execution are performed.",
  ];
}
