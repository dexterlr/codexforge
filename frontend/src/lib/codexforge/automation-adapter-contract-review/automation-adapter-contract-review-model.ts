import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildAutomationAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildAutomationAdapterContractReviewStableKey };

export const AUTOMATION_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Automation adapter contract review",
  "Automation adapter contract review does not create automations or schedules",
  "Automation adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery",
  "Denied automation adapter actions",
] as const;

const AUTOMATION_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Automation adapter contract review identity",
  "Schedule",
  "Condition/watch",
  "Notification",
  "Pause/stop",
  "Audit",
  "Recovery",
  "Denied automation adapter actions",
  "Unresolved automation adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced automation adapter contract review details collapsed/secondary",
] as const;

export function buildAutomationAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("automation-adapter-contract-review", input);
}

export function buildAutomationAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildAutomationAdapterContractReview({
      idHint: "automation-adapter-contract-review",
      status: "blocked",
      identity: "Automation adapter contract review identity: Automation adapter contract review does not create automations or schedules. Automation adapters require explicit operator approval before any future schedule, watch, reminder, task, or notification.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Schedule", items: ["Schedule: cadence, time window, timezone source, duration, expiry, owner, and no automatic schedule creation must be visible before approval."] },
        { label: "Condition/watch", items: ["Condition/watch: trigger condition, source scope, comparison rule, threshold, polling prohibition until approved, and manual review state are required."] },
        { label: "Notification", items: ["Notification: channel, recipient, message preview, privacy class, rate limit, and no automatic notification sending must be reviewed."] },
        { label: "Pause/stop", items: ["Pause/stop: pause rule, stop rule, revocation path, emergency hold, owner, and blocked-state handling must be part of the contract."] },
        { label: "Audit", items: ["Audit: future automations need request identity, schedule scope, trigger evidence, notification decision, pause/stop action, and no persisted approval decision here."] },
        { label: "Recovery", items: ["Recovery: missed runs, failed notifications, stale watches, retry limits, escalation, and cleanup require explicit operator approval."] },
        { label: "Denied automation adapter actions", items: ["Denied automation adapter actions: create automations, create schedules, create reminders, create tasks, create watches, create polling loops, create background jobs, send notifications, trigger recovery, or persist automation rules from UI."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/connector-adapter-contract-review", "/recovery-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep automations blocked while schedule, condition/watch, notification, pause/stop, audit, and recovery contracts are reviewed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("automation adapter contract review", AUTOMATION_ADAPTER_CONTRACT_REVIEW_LANGUAGE, AUTOMATION_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildAutomationAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeAutomationAdapterContractReview(model: { automationAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Automation adapter contract review", model.automationAdapterContractReviews, "Automation adapters require explicit operator approval.");
}

export function buildAutomationAdapterContractReviewModel() {
  const automationAdapterContractReviews = buildAutomationAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 672",
    title: "Automation adapter contract review",
    summarySubject: "Automation adapter contract review",
    approvalCopy: "Automation adapters require explicit operator approval.",
    subtitle: "Review the automation adapter contract without creating automations or schedules.",
    primaryLabel: "Review automation adapter",
    anchor: "automation-adapter-contract-review",
    plainEnglishTitle: "Plain-English automation adapter contract review",
    plainEnglishCopy: "This page defines what a real automation adapter must show before it can ever create a schedule or watch: schedule, condition, notification, pause/stop, audit, recovery, and denied actions. It is not implemented yet.",
    language: AUTOMATION_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...AUTOMATION_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/connector-adapter-contract-review", label: "Connector adapter" },
      { href: "/recovery-adapter-contract-review", label: "Recovery adapter" },
    ],
    packets: automationAdapterContractReviews,
    advancedCopy: "advanced automation adapter contract review details collapsed/secondary. This route does not create automations, schedules, reminders, tasks, watches, polling loops, background jobs, notifications, recovery triggers, or persisted automation rules.",
    dataScope: "automation-adapter-contract-review buildAutomationAdapterContractReviewStableKey AutomationAdapterContractReviewPanel",
  });
  return { ...model, automationAdapterContractReviews };
}
