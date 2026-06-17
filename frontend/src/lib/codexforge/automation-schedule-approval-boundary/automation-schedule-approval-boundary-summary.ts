import type { AutomationScheduleApprovalBoundary, AutomationScheduleApprovalBoundaryBoundary, AutomationScheduleApprovalBoundaryModel } from "./automation-schedule-approval-boundary-types";
import { buildAutomationScheduleApprovalBoundaryStableKey } from "./automation-schedule-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const AUTOMATION_SCHEDULE_APPROVAL_BOUNDARY_LANGUAGE = [
  "Automation schedule approval boundary",
  "Automation/schedule approval boundary does not create automations or schedules",
  "Automations and schedules require explicit operator approval",
  "Unsafe automations stay blocked",
  "Automation groups",
  "Condition watch checklist",
] as const;

export function buildAutomationScheduleApprovalBoundary(input: Omit<AutomationScheduleApprovalBoundary, "id"> & { idHint: string }): AutomationScheduleApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildAutomationScheduleApprovalBoundaryStableKey("automation-schedule-approval-boundary", idHint, input.status), ...boundary };
}

export function buildAutomationScheduleApprovalBoundaries(): AutomationScheduleApprovalBoundary[] {
  return [
    buildAutomationScheduleApprovalBoundary({
      idHint: "automation-schedule-approval-boundary",
      status: "blocked",
      identity: "Automation boundary identity: automation-schedule-approval-boundary reviews schedules, watches, reminders, notifications, pause, stop, and recovery without creating automations or schedules.",
      sections: [
        { label: "Automation groups", items: ["Automation groups: scheduled research, conditional watches, reminders, tasks, monitoring jobs, connector watches, notifications, recovery jobs, and follow-up checks stay blocked until approved."] },
        { label: "Schedule checklist", items: ["Schedule checklist: cadence, timezone, owner, start condition, stop condition, retention, evidence route, and approval status must be visible before any future schedule."] },
        { label: "Condition watch checklist", items: ["Condition watch checklist: watched condition, source boundary, connector/web permission, polling limit, notification channel, and false-positive handling must be reviewed."] },
        { label: "Notification checklist", items: ["Notification checklist: notification target, content redaction, delivery permission, quiet hours, audit route, and no automatic notification sending from UI."] },
        { label: "Pause/stop checklist", items: ["Pause/stop checklist: manual pause, stop owner, expiration, retry limit, recovery path, and deletion plan must exist before any future automation."] },
        { label: "Denied automation actions", items: ["Denied automation actions: create automations, schedules, reminders, tasks, watches, polling loops, background jobs, or notifications from UI."] },
        { label: "Unresolved automation blockers", items: ["Unresolved automation blockers: missing schedule approval, missing source boundary, missing stop plan, missing notification approval, missing evidence route, and missing recovery route keep unsafe automations blocked."] },
      ],
      routes: ["/evidence-capture-boundary", "/recovery-retry-boundary", "/workflow-profile-registry"],
      nextRecommendedAction: "Next recommended action: keep automations blocked, review schedule and stop criteria, then seek explicit operator approval only after source, notification, and recovery boundaries exist.",
      advancedDetails: `Advanced automation/schedule approval boundary details: Automation/schedule approval boundary does not create automations or schedules. Automations and schedules require explicit operator approval. Unsafe automations stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildAutomationScheduleApprovalBoundaryBoundary(): AutomationScheduleApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeAutomationScheduleApprovalBoundary(model: Pick<AutomationScheduleApprovalBoundaryModel, "automationScheduleApprovalBoundaries">): string {
  return "Automation/schedule approval boundary reviews " + model.automationScheduleApprovalBoundaries.length + " automation boundary packet without creating automations or schedules. Automations and schedules require explicit operator approval, and unsafe automations stay blocked.";
}

export function buildAutomationScheduleApprovalBoundaryModel(): AutomationScheduleApprovalBoundaryModel {
  const automationScheduleApprovalBoundaries = buildAutomationScheduleApprovalBoundaries();
  const model: AutomationScheduleApprovalBoundaryModel = {
    title: "Automation schedule approval boundary",
    summary: "",
    reviewPackets: automationScheduleApprovalBoundaries,
    automationScheduleApprovalBoundaries,
    boundary: buildAutomationScheduleApprovalBoundaryBoundary(),
    language: [...AUTOMATION_SCHEDULE_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Automation boundary identity",
      "Automation groups",
      "Schedule checklist",
      "Condition watch checklist",
      "Notification checklist",
      "Pause/stop checklist",
      "Denied automation actions",
      "Unresolved automation blockers",
      "Evidence boundary route",
      "Recovery boundary route",
      "Next recommended action",
      "advanced automation/schedule approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeAutomationScheduleApprovalBoundary(model) };
}
