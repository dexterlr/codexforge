import type { FirstApprovedAutomationDryRunTrial, FirstApprovedAutomationDryRunTrialBoundary, FirstApprovedAutomationDryRunTrialModel } from "./first-approved-automation-dry-run-trial-types";
import { buildFirstApprovedAutomationDryRunTrialStableKey } from "./first-approved-automation-dry-run-trial-types";

export const FIRST_APPROVED_AUTOMATION_DRY_RUN_TRIAL_LANGUAGE = [
  "First approved automation dry-run trial",
  "First approved automation dry-run trial does not create or run automations from UI",
  "Automation dry-runs require explicit operator approval at the boundary",
  "Unapproved automation dry-run paths remain blocked",
  "Automation dry-run groups",
  "Schedule watch checklist",
] as const;

export function buildFirstApprovedAutomationDryRunTrial(input: Omit<FirstApprovedAutomationDryRunTrial, "id"> & { idHint: string }): FirstApprovedAutomationDryRunTrial {
  const { idHint, ...trial } = input;
  return { id: buildFirstApprovedAutomationDryRunTrialStableKey("first-approved-automation-dry-run-trial", idHint, input.status), ...trial };
}

export function buildFirstApprovedAutomationDryRunTrials(): FirstApprovedAutomationDryRunTrial[] {
  return [
    buildFirstApprovedAutomationDryRunTrial({
      idHint: "automation-dry-run-trial-review-packet",
      status: "blocked",
      firstApprovedAutomationDryRunIdentity: "First approved automation dry-run identity: first-approved-automation-dry-run-trial-automation-dry-run-trial-review-packet.",
      automationDryRunGroups: [
        "Automation dry-run groups: approval gate, schedule/watch scope, notification policy, stop controls, rollback, audit logging, output retention, and operator handoff.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: automation dry-runs require explicit operator approval at the boundary, with trigger scope, owner, stop condition, and denied live actions reviewed elsewhere.",
      ],
      scheduleWatchChecklist: [
        "Schedule watch checklist: schedules, reminders, conditional watches, polling loops, background jobs, and task creation stay blocked until implemented and approved outside this page.",
      ],
      notificationChecklist: [
        "Notification checklist: notification channel, recipient, content, rate, quiet hours, and rollback owner must be approved before any notification can be sent elsewhere.",
      ],
      stopRollbackChecklist: [
        "Stop/rollback checklist: every dry-run plan needs a stop owner, rollback owner, disable path, audit owner, and evidence owner before execution claims.",
      ],
      deniedAutomationDryRunActions: [
        "Denied automation dry-run actions: create automations, run automations, schedule tasks, create reminders, create watches, start polling loops, create background jobs, send notifications, or persist automation rules.",
      ],
      unresolvedAutomationDryRunBlockers: [
        "Unresolved automation dry-run blockers: missing approval gate, missing schedule/watch scope, missing notification owner, missing stop control, missing rollback owner, and missing audit owner.",
      ],
      firstApprovedFilePatchDryRunRoute: "First approved file patch dry-run route: /first-approved-file-patch-dry-run reviews patch dry-run readiness without applying patches.",
      unifiedExecutionGapReportRoute: "Unified execution gap report route: /unified-execution-boundary-gap-report summarizes remaining execution gaps without running probes.",
      nextRecommendedAction: "Next recommended action: keep unapproved automation dry-run paths blocked until approval, schedule/watch, notification, stop, rollback, and audit boundaries are implemented outside this page.",
      advancedAutomationDryRunDetails: "Advanced automation dry-run details: First approved automation dry-run trial is review-only. First approved automation dry-run trial does not create or run automations from UI, automation dry-runs require explicit operator approval at the boundary, and unapproved automation dry-run paths remain blocked. It does not create automations, run automations, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, persist automation rules, persist approvals, call connectors, call providers, call local models, mutate files, run tests, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedAutomationDryRunTrialBoundary(): FirstApprovedAutomationDryRunTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, automationExecutionAllowedFromUi: false, automationCreationAllowedFromUi: false, automationRulePersistenceAllowedFromUi: false, reminderCreationAllowedFromUi: false, taskSchedulingAllowedFromUi: false, scheduleCreationAllowedFromUi: false, conditionalWatchCreationAllowedFromUi: false, backgroundJobCreationAllowedFromUi: false, pollingLoopAllowedFromUi: false, notificationSendingAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedAutomationDryRunTrial(model: Pick<FirstApprovedAutomationDryRunTrialModel, "automationDryRunTrials">): string {
  return "First approved automation dry-run trial summarizes " + model.automationDryRunTrials.length + " automation dry-run trial review packet. First approved automation dry-run trial does not create or run automations from UI, automation dry-runs require explicit operator approval at the boundary, and unapproved automation dry-run paths remain blocked.";
}

export function buildFirstApprovedAutomationDryRunTrialModel(): FirstApprovedAutomationDryRunTrialModel {
  const automationDryRunTrials = buildFirstApprovedAutomationDryRunTrials();
  const model: FirstApprovedAutomationDryRunTrialModel = {
    title: "First approved automation dry-run trial",
    summary: "",
    automationDryRunTrials,
    boundary: buildFirstApprovedAutomationDryRunTrialBoundary(),
    language: [...FIRST_APPROVED_AUTOMATION_DRY_RUN_TRIAL_LANGUAGE],
    advancedDetails: [
      "First approved automation dry-run trial",
      "First approved automation dry-run identity",
      "Automation dry-run groups",
      "Approval gate checklist",
      "Schedule watch checklist",
      "Notification checklist",
      "Stop/rollback checklist",
      "Denied automation dry-run actions",
      "Unresolved automation dry-run blockers",
      "First approved file patch dry-run route",
      "Unified execution gap report route",
      "Next recommended action",
      "First approved automation dry-run trial does not create or run automations from UI",
      "Automation dry-runs require explicit operator approval at the boundary",
      "Unapproved automation dry-run paths remain blocked",
      "advanced automation dry-run details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedAutomationDryRunTrial(model) };
}
