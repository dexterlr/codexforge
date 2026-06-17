import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstAutomationControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstAutomationControlledTrialStableKey };

export const FIRST_AUTOMATION_CONTROLLED_TRIAL_LANGUAGE = [
  "First automation controlled trial",
  "First automation controlled trial does not create automations or schedules",
  "Automations require explicit operator approval",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery review",
] as const;

const FIRST_AUTOMATION_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "First automation controlled trial identity",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery review",
  "Next recommended action",
  "advanced first automation controlled trial details collapsed/secondary",
] as const;

export function buildFirstAutomationControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-automation-controlled-trial", input);
}

export function buildFirstAutomationControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstAutomationControlledTrial({
      idHint: "first-automation-controlled-trial",
      status: "blocked",
      identity: "First automation controlled trial identity: First automation controlled trial does not create automations or schedules. It previews schedule, watch, notification, audit, and recovery review without background jobs.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Schedule", items: ["Schedule: cadence, timezone, start/stop date, missed-run policy, quiet hours, manual confirmation, and no automatic schedule creation."] },
        { label: "Condition/watch", items: ["Condition/watch: condition definition, source permission, polling limit, freshness rule, failure behavior, and no monitoring job creation."] },
        { label: "Notification", items: ["Notification: recipient, channel, redaction, consent, rate limit, quiet hours, and no notification sending without explicit approval."] },
        { label: "Pause/stop", items: ["Pause/stop: owner, pause rule, stop rule, emergency disable, expiration, and no background job persistence from this route."] },
        { label: "Audit", items: ["Audit: approval packet, source scope, planned action, redaction, result review, and operator handoff must be visible before any automation exists."] },
        { label: "Recovery review", items: ["Recovery review: missed run, false positive, failed notification, stale watch, rollback, retry, escalation, and no automatic recovery trigger."] },
      ),
      routes: ["/first-packaging-export-controlled-trial", "/universal-builder-recovery-review", "/universal-builder-mvp-candidate"],
      nextRecommendedAction: "Next recommended action: keep automations blocked until schedule, condition/watch, notification, pause/stop, audit, recovery review, and explicit operator approval are complete.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first automation controlled trial", FIRST_AUTOMATION_CONTROLLED_TRIAL_LANGUAGE, FIRST_AUTOMATION_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstAutomationControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstAutomationControlledTrial(model: { firstAutomationControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First automation controlled trial", model.firstAutomationControlledTrials, "Automations require explicit operator approval.");
}

export function buildFirstAutomationControlledTrialModel() {
  const firstAutomationControlledTrials = buildFirstAutomationControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 660",
    title: "First automation controlled trial",
    summarySubject: "First automation controlled trial",
    approvalCopy: "Automations require explicit operator approval.",
    subtitle: "Preview automation controls without creating automations or schedules.",
    primaryLabel: "Review automation trial",
    anchor: "first-automation-controlled-trial",
    plainEnglishTitle: "Plain-English first automation controlled trial",
    plainEnglishCopy: "This page shows what an automation would need before approval: schedule, condition/watch, notification, pause/stop, audit, and recovery review. It cannot create automations or schedules.",
    language: FIRST_AUTOMATION_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_AUTOMATION_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-packaging-export-controlled-trial", label: "Packaging trial" },
      { href: "/universal-builder-recovery-review", label: "Builder recovery review" },
      { href: "/universal-builder-mvp-candidate", label: "Builder MVP candidate" },
    ],
    packets: firstAutomationControlledTrials,
    advancedCopy: "advanced first automation controlled trial details collapsed/secondary. This route does not create automations, create schedules, create reminders, create tasks, create watches, create polling loops, create background jobs, send notifications, trigger recovery, or persist automation rules.",
    dataScope: "first-automation-controlled-trial buildFirstAutomationControlledTrialStableKey FirstAutomationControlledTrialPanel",
  });
  return { ...model, firstAutomationControlledTrials };
}
