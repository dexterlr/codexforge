import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildAutomationControlledTrialPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildAutomationControlledTrialPlanStableKey };

export const AUTOMATION_CONTROLLED_TRIAL_PLAN_LANGUAGE = [
  "Automation controlled trial plan",
  "Automation controlled trial plan does not create automations or schedules",
  "Automations require explicit operator approval",
  "Schedule checklist",
  "Condition/watch checklist",
  "Notification checklist",
  "Pause/stop checklist",
] as const;

const AUTOMATION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS = [
  "Automation controlled trial plan identity",
  "Schedule checklist",
  "Condition/watch checklist",
  "Notification checklist",
  "Pause/stop checklist",
  "Next recommended action",
  "advanced automation controlled trial plan details collapsed/secondary",
] as const;

export function buildAutomationControlledTrialPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("automation-controlled-trial-plan", input);
}

export function buildAutomationControlledTrialPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildAutomationControlledTrialPlan({
      idHint: "automation-controlled-trial-plan",
      status: "blocked",
      identity: "Automation controlled trial plan identity: automation-controlled-trial-plan plans future automation without creating schedules, reminders, tasks, watches, polling loops, background jobs, or notifications.",
      sections: buildControlledBuilderReviewSections(
        { label: "Schedule checklist", items: ["Schedule checklist: cadence, timezone, start/stop date, missed-run policy, manual confirmation, and no automatic schedule creation."] },
        { label: "Condition/watch checklist", items: ["Condition/watch checklist: watched condition, source permission, polling limits, freshness needs, failure behavior, and no monitoring job creation from UI."] },
        { label: "Notification checklist", items: ["Notification checklist: recipient, channel, content redaction, quiet hours, consent, and no notification sending without explicit approval."] },
        { label: "Pause/stop checklist", items: ["Pause/stop checklist: pause control, stop control, owner, audit trail, recovery path, and no background job persistence from this route."] },
      ),
      routes: ["/automation-schedule-approval-boundary", "/connector-controlled-trial-plan", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep automations blocked until schedule, condition/watch, notification, pause/stop, and explicit operator approval are complete.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("automation controlled trial plan", AUTOMATION_CONTROLLED_TRIAL_PLAN_LANGUAGE, AUTOMATION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildAutomationControlledTrialPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeAutomationControlledTrialPlan(model: { automationControlledTrialPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Automation controlled trial plan", model.automationControlledTrialPlans, "Automations require explicit operator approval.");
}

export function buildAutomationControlledTrialPlanModel() {
  const automationControlledTrialPlans = buildAutomationControlledTrialPlans();
  const summary = summarizeAutomationControlledTrialPlan({ automationControlledTrialPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 647",
    title: "Automation controlled trial plan",
    summary,
    subtitle: "Plan future automations without creating automations or schedules.",
    primaryLabel: "Review automation plan",
    anchor: "automation-controlled-trial-plan",
    plainEnglishTitle: "Plain-English automation controlled trial plan",
    plainEnglishCopy: "This page prepares future watches, schedules, reminders, and notifications as review-only plans. It cannot create or run an automation.",
    language: AUTOMATION_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    markers: AUTOMATION_CONTROLLED_TRIAL_PLAN_LANGUAGE,
    links: [
      { href: "/automation-schedule-approval-boundary", label: "Automation boundary" },
      { href: "/connector-controlled-trial-plan", label: "Connector plan" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Builder candidate" },
    ],
    packets: automationControlledTrialPlans,
    advancedSummary: "Advanced automation controlled trial plan details",
    advancedDetails: [...AUTOMATION_CONTROLLED_TRIAL_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced automation controlled trial plan details collapsed/secondary. This route does not create automations, create schedules, create reminders, create tasks, create watches, create background jobs, create polling loops, or send notifications.",
    dataScope: "automation-controlled-trial-plan buildAutomationControlledTrialPlanStableKey AutomationControlledTrialPlanPanel",
  });
  return { ...model, automationControlledTrialPlans };
}
