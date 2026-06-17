import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildCommandExecutionControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildCommandExecutionControlledTrialPlanStableKey };

export const COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Command execution controlled trial plan",
  "Command execution controlled trial plan does not run commands",
  "Command execution controlled trials require explicit operator approval",
  "Working directory checklist",
  "Env/secrets checklist",
  "Timeout checklist",
  "Log checklist",
  "Rollback checklist",
] as const;

const COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Command execution controlled trial plan identity",
  "Working directory checklist",
  "Env/secrets checklist",
  "Timeout checklist",
  "Log checklist",
  "Rollback checklist",
  "Next recommended action",
  "advanced command execution controlled trial plan details collapsed/secondary",
] as const;

export function buildCommandExecutionControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("command-execution-controlled-trial-plan", input);
}

export function buildCommandExecutionControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildCommandExecutionControlledTrialPlan({
      idHint: "command-execution-controlled-trial-plan",
      status: "blocked",
      identity: "Command execution controlled trial plan identity: command-execution-controlled-trial-plan plans future command execution without running shell, git, test, build, smoke, package, setup, or server commands.",
      sections: buildControlledBuilderReviewSections(
        { label: "Working directory checklist", items: ["Working directory checklist: exact approved project root, no arbitrary path crawling, command purpose, expected files, and denied directories must be reviewed."] },
        { label: "Env/secrets checklist", items: ["Env/secrets checklist: no process.env printing, no secret values, redacted env names, no token storage, and no real endpoint values in UI."] },
        { label: "Timeout checklist", items: ["Timeout checklist: maximum duration, cancellation policy, stop condition, retry policy, and failure budget require explicit approval."] },
        { label: "Log checklist", items: ["Log checklist: stdout, stderr, truncated logs, redaction rules, and operator review before reuse must be defined."] },
        { label: "Rollback checklist", items: ["Rollback checklist: file impact, package impact, runtime impact, cleanup plan, and recovery boundary must be ready before execution."] },
      ),
      routes: ["/command-execution-approval-boundary", "/command-execution-controlled-trial-review", "/local-runtime-controlled-trial-plan"],
      nextRecommendedAction: "Next recommended action: keep command execution blocked until working directory, env/secrets, timeout, logs, rollback, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("command execution controlled trial plan", COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_LANGUAGE, COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildCommandExecutionControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeCommandExecutionControlledTrialPlan(model: { commandExecutionControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Command execution controlled trial plan", model.commandExecutionControlledTrialPlans, "Command execution controlled trials require explicit operator approval.");
}

export function buildCommandExecutionControlledTrialPlanModel() {
  const commandExecutionControlledTrialPlans = buildCommandExecutionControlledTrialPlans();
  const summary = summarizeCommandExecutionControlledTrialPlan({ commandExecutionControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 641",
    title: "Command execution controlled trial plan",
    summary,
    subtitle: "Plan a future controlled command without running commands.",
    primaryLabel: "Review command plan",
    anchor: "command-execution-controlled-trial-plan",
    plainEnglishTitle: "Plain-English command execution controlled trial plan",
    plainEnglishCopy: "This page shows the safety review a future command must pass. It cannot run commands, tests, builds, smoke checks, package commands, or server commands.",
    language: COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/command-execution-approval-boundary", label: "Command boundary" },
      { href: "/command-execution-controlled-trial-review", label: "Command review" },
      { href: "/local-runtime-controlled-trial-plan", label: "Runtime plan" },
    ],
    packets: commandExecutionControlledTrialPlans,
    advancedSummary: "Advanced command execution controlled trial plan details",
    advancedDetails: [...COMMAND_EXECUTION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced command execution controlled trial plan details collapsed/secondary. This route does not run commands, shell commands, git commands, tests, builds, smoke checks, package commands, setup commands, or server commands.",
    dataScope: "command-execution-controlled-trial-plan buildCommandExecutionControlledTrialPlanStableKey CommandExecutionControlledTrialPlanPanel",
  });
  return { ...model, commandExecutionControlledTrialPlans };
}
