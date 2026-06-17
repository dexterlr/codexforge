import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildCommandExecutionControlledTrialReviewStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildCommandExecutionControlledTrialReviewStableKey };

export const COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_LANGUAGE = [
  "Command execution controlled trial review",
  "Command execution controlled trial review does not execute commands",
  "Command outputs require operator review before reuse",
  "Stdout/stderr/log redaction",
  "Exit-code checklist",
  "Retry/recovery checklist",
] as const;

const COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS = [
  "Command execution controlled trial review identity",
  "Stdout/stderr/log redaction",
  "Exit-code checklist",
  "Retry/recovery checklist",
  "Next recommended action",
  "advanced command execution controlled trial review details collapsed/secondary",
] as const;

export function buildCommandExecutionControlledTrialReview(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("command-execution-controlled-trial-review", input);
}

export function buildCommandExecutionControlledTrialReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildCommandExecutionControlledTrialReview({
      idHint: "command-execution-controlled-trial-review",
      status: "blocked",
      identity: "Command execution controlled trial review identity: command-execution-controlled-trial-review reviews command outputs without executing commands, storing logs, approving reuse, or triggering retry.",
      sections: buildControlledBuilderReviewSections(
        { label: "Stdout/stderr/log redaction", items: ["Stdout/stderr/log redaction: remove secrets, endpoint values, private paths, account data, token-like values, and excessive logs before reuse."] },
        { label: "Exit-code checklist", items: ["Exit-code checklist: exit code, expected status, failure meaning, partial output risk, validation need, and operator decision remain review-only."] },
        { label: "Retry/recovery checklist", items: ["Retry/recovery checklist: retry requires changed command plan, recovery review, rollback posture, bounded timeout, and explicit operator approval."] },
      ),
      routes: ["/command-execution-controlled-trial-plan", "/result-review-boundary", "/recovery-retry-boundary"],
      nextRecommendedAction: "Next recommended action: keep command outputs blocked from reuse until operator review covers redaction, exit code, retry, and recovery.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("command execution controlled trial review", COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_LANGUAGE, COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCommandExecutionControlledTrialReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeCommandExecutionControlledTrialReview(model: { commandExecutionControlledTrialReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Command execution controlled trial review", model.commandExecutionControlledTrialReviews, "Command outputs require operator review before reuse.");
}

export function buildCommandExecutionControlledTrialReviewModel() {
  const commandExecutionControlledTrialReviews = buildCommandExecutionControlledTrialReviews();
  const summary = summarizeCommandExecutionControlledTrialReview({ commandExecutionControlledTrialReviews });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 642",
    title: "Command execution controlled trial review",
    summary,
    subtitle: "Review command outputs before reuse without executing commands.",
    primaryLabel: "Review command output",
    anchor: "command-execution-controlled-trial-review",
    plainEnglishTitle: "Plain-English command execution controlled trial review",
    plainEnglishCopy: "This page is where command output would be reviewed after an approved future trial. It cannot execute commands or reuse outputs on its own.",
    language: COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    markers: COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_LANGUAGE,
    links: [
      { href: "/command-execution-controlled-trial-plan", label: "Command plan" },
      { href: "/result-review-boundary", label: "Result boundary" },
      { href: "/recovery-retry-boundary", label: "Recovery boundary" },
    ],
    packets: commandExecutionControlledTrialReviews,
    advancedSummary: "Advanced command execution controlled trial review details",
    advancedDetails: [...COMMAND_EXECUTION_CONTROLLED_TRIAL_REVIEW_ADVANCED_DETAILS],
    advancedCopy: "advanced command execution controlled trial review details collapsed/secondary. This route does not execute commands, store logs, approve command outputs, trigger retry, trigger recovery, or run validation.",
    dataScope: "command-execution-controlled-trial-review buildCommandExecutionControlledTrialReviewStableKey CommandExecutionControlledTrialReviewPanel",
  });
  return { ...model, commandExecutionControlledTrialReviews };
}
