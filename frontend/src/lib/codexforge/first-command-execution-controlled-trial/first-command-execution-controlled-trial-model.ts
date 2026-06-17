import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstCommandExecutionControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstCommandExecutionControlledTrialStableKey };

export const FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_LANGUAGE = [
  "First command execution controlled trial",
  "First command execution controlled trial does not run commands",
  "Command execution requires explicit operator approval",
  "Command preview",
  "Working directory",
  "Env/secrets",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery checklist",
] as const;

const FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First command execution controlled trial identity",
  "Command preview",
  "Working directory",
  "Env/secrets",
  "Timeout",
  "Stdout/stderr",
  "Exit code",
  "Recovery checklist",
  "Next recommended action",
  "advanced first command execution controlled trial details collapsed/secondary",
] as const;

export function buildFirstCommandExecutionControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-command-execution-controlled-trial", input);
}

export function buildFirstCommandExecutionControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstCommandExecutionControlledTrial({
      idHint: "first-command-execution-controlled-trial",
      status: "blocked",
      identity: "First command execution controlled trial identity: First command execution controlled trial does not run commands. It previews a command request and review packet without invoking shell, git, tests, builds, package tools, or servers.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Command preview", items: ["Command preview: exact command text, purpose, allowed executable, arguments, expected duration, expected output, and forbidden side effects must be reviewed."] },
        { label: "Working directory", items: ["Working directory: fixed workspace path, no arbitrary path crawling, no external repo targeting, and no implicit directory changes are allowed without approval."] },
        { label: "Env/secrets", items: ["Env/secrets: no secret printing, no credential injection, no real endpoint display, no token storage, and no environment value exposure from UI."] },
        { label: "Timeout", items: ["Timeout: maximum runtime, cancellation expectation, retry limit, long-running process rule, and recovery owner remain explicit operator decisions."] },
        { label: "Stdout/stderr", items: ["Stdout/stderr: output capture would need redaction, truncation, operator review, and no automatic reuse or storage."] },
        { label: "Exit code", items: ["Exit code: success, warning, failure, timeout, and blocked results require operator review before any next workflow step."] },
        { label: "Recovery checklist", items: ["Recovery checklist: retry gate, rollback plan, cleanup plan, escalation owner, and no automatic recovery or retry trigger."] },
      ),
      routes: ["/first-command-execution-trial-review", "/first-local-runtime-controlled-trial", "/universal-builder-recovery-review"],
      nextRecommendedAction: "Next recommended action: keep command execution blocked until command preview, working directory, env/secrets, timeout, output, exit code, and recovery review are explicitly approved.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first command execution controlled trial", FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_LANGUAGE, FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstCommandExecutionControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstCommandExecutionControlledTrial(model: { firstCommandExecutionControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First command execution controlled trial", model.firstCommandExecutionControlledTrials, "Command execution requires explicit operator approval.");
}

export function buildFirstCommandExecutionControlledTrialModel() {
  const firstCommandExecutionControlledTrials = buildFirstCommandExecutionControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 654",
    title: "First command execution controlled trial",
    summarySubject: "First command execution controlled trial",
    approvalCopy: "Command execution requires explicit operator approval.",
    subtitle: "Preview the first controlled command trial without running commands.",
    primaryLabel: "Review command trial",
    anchor: "first-command-execution-controlled-trial",
    plainEnglishTitle: "Plain-English first command execution controlled trial",
    plainEnglishCopy: "This page shows what a real command run would need before approval: command preview, working directory, env/secrets, timeout, output, exit code, and recovery. It cannot run commands.",
    language: FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_COMMAND_EXECUTION_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-command-execution-trial-review", label: "Command review" },
      { href: "/first-local-runtime-controlled-trial", label: "Runtime trial" },
      { href: "/universal-builder-recovery-review", label: "Builder recovery review" },
    ],
    packets: firstCommandExecutionControlledTrials,
    advancedCopy: "advanced first command execution controlled trial details collapsed/secondary. This route does not run commands, run shell/git/test/build/smoke/package tools, start servers, print process environment values, store output, trigger retry, or persist approval decisions.",
    dataScope: "first-command-execution-controlled-trial buildFirstCommandExecutionControlledTrialStableKey FirstCommandExecutionControlledTrialPanel",
  });
  return { ...model, firstCommandExecutionControlledTrials };
}
