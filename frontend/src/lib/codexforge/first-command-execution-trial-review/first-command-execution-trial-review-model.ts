import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstCommandExecutionTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstCommandExecutionTrialReviewStableKey };

export const FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_LANGUAGE = [
  "First command execution trial review",
  "First command execution trial review does not execute commands",
  "Command outputs require operator review before reuse",
  "Log redaction",
  "Result acceptance",
  "Retry",
  "Recovery",
  "Packaging readiness",
] as const;

const FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "First command execution trial review identity",
  "Log redaction",
  "Result acceptance",
  "Retry",
  "Recovery",
  "Packaging readiness",
  "Next recommended action",
  "advanced first command execution trial review details collapsed/secondary",
] as const;

export function buildFirstCommandExecutionTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-command-execution-trial-review", input);
}

export function buildFirstCommandExecutionTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstCommandExecutionTrialReview({
      idHint: "first-command-execution-trial-review",
      status: "blocked",
      identity: "First command execution trial review identity: First command execution trial review does not execute commands. It reviews command outputs before reuse, packaging, retry, recovery, or handoff.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Log redaction", items: ["Log redaction: remove secrets, private paths, connector payloads, endpoint values, account identifiers, and excessive logs before any output can be reused."] },
        { label: "Result acceptance", items: ["Result acceptance: operator compares command intent, stdout/stderr, exit code, timeout, validation needs, and downstream impact before accepting results."] },
        { label: "Retry", items: ["Retry: retry is a reviewed decision only; changed command text, timeout, working directory, and risk must be approved before any future retry."] },
        { label: "Recovery", items: ["Recovery: recovery covers rollback, cleanup, partial output handling, blocked command escalation, and no automatic recovery trigger."] },
        { label: "Packaging readiness", items: ["Packaging readiness: command outputs can support a package only after redaction, acceptance, license review, reproducibility notes, and operator approval."] },
      ),
      routes: ["/first-command-execution-controlled-trial", "/first-local-runtime-trial-review", "/first-packaging-export-controlled-trial"],
      nextRecommendedAction: "Next recommended action: keep command outputs out of reuse until log redaction, result acceptance, retry, recovery, and packaging readiness are reviewed.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first command execution trial review", FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_LANGUAGE, FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstCommandExecutionTrialReviewBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstCommandExecutionTrialReview(model: { firstCommandExecutionTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First command execution trial review", model.firstCommandExecutionTrialReviews, "Command outputs require operator review before reuse.");
}

export function buildFirstCommandExecutionTrialReviewModel() {
  const firstCommandExecutionTrialReviews = buildFirstCommandExecutionTrialReviews();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 655",
    title: "First command execution trial review",
    summarySubject: "First command execution trial review",
    approvalCopy: "Command outputs require operator review before reuse.",
    subtitle: "Review future command output decisions without executing commands.",
    primaryLabel: "Review command output",
    anchor: "first-command-execution-trial-review",
    plainEnglishTitle: "Plain-English first command execution trial review",
    plainEnglishCopy: "This page shows how command output would be redacted, accepted, retried, recovered, or prepared for packaging. It cannot execute commands or reuse outputs automatically.",
    language: FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_LANGUAGE,
    advancedDetails: [...FIRST_COMMAND_EXECUTION_TRIAL_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/first-command-execution-controlled-trial", label: "Command trial" },
      { href: "/first-local-runtime-trial-review", label: "Runtime review" },
      { href: "/first-packaging-export-controlled-trial", label: "Packaging trial" },
    ],
    packets: firstCommandExecutionTrialReviews,
    advancedCopy: "advanced first command execution trial review details collapsed/secondary. This route does not execute commands, store command outputs, reuse command outputs, trigger retry, trigger recovery, package exports, mutate memory, or persist approval decisions.",
    dataScope: "first-command-execution-trial-review buildFirstCommandExecutionTrialReviewStableKey FirstCommandExecutionTrialReviewPanel",
  });
  return { ...model, firstCommandExecutionTrialReviews };
}
