"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstApprovedAutomationDryRunTrialModel, buildFirstApprovedAutomationDryRunTrialStableKey } from "@/lib/codexforge/first-approved-automation-dry-run-trial";

const FIRST_APPROVED_AUTOMATION_DRY_RUN_TRIAL_MARKERS = [
  "First approved automation dry-run trial",
  "First approved automation dry-run trial does not create or run automations from UI",
  "Automation dry-runs require explicit operator approval at the boundary",
  "Unapproved automation dry-run paths remain blocked",
  "Automation dry-run groups",
  "Schedule watch checklist",
] as const;

export function FirstApprovedAutomationDryRunTrialPanel() {
  const model = buildFirstApprovedAutomationDryRunTrialModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.automationDryRunTrials.map((trial) => ({
    id: buildFirstApprovedAutomationDryRunTrialStableKey("first-approved-automation-dry-run-trial-card", trial.id),
    title: trial.firstApprovedAutomationDryRunIdentity,
    status: trial.status,
    sections: [
      { label: "Automation dry-run groups", items: trial.automationDryRunGroups },
      { label: "Approval gate checklist", items: trial.approvalGateChecklist },
      { label: "Schedule watch checklist", items: trial.scheduleWatchChecklist },
      { label: "Notification checklist", items: trial.notificationChecklist },
      { label: "Stop/rollback checklist", items: trial.stopRollbackChecklist },
      { label: "Denied automation dry-run actions", items: trial.deniedAutomationDryRunActions },
      { label: "Unresolved automation dry-run blockers", items: trial.unresolvedAutomationDryRunBlockers },
    ],
    routes: [trial.firstApprovedFilePatchDryRunRoute, trial.unifiedExecutionGapReportRoute],
    nextRecommendedAction: trial.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 544"
      title="Automation dry-run trial"
      subtitle="First approved automation dry-run trial prepares automation dry-run review in plain English. First approved automation dry-run trial does not create or run automations from UI. Automation dry-runs require explicit operator approval at the boundary, and unapproved automation dry-run paths remain blocked."
      primaryLabel="Review automation dry-run"
      anchor="first-approved-automation-dry-run-trial"
      plainEnglishTitle="Plain-English first approved automation dry-run trial"
      plainEnglishCopy="This page reviews first approved automation dry-run identity, Automation dry-run groups, Approval gate checklist, Schedule watch checklist, Notification checklist, Stop/rollback checklist, Denied automation dry-run actions, Unresolved automation dry-run blockers, First approved file patch dry-run route, Unified execution gap report route, and next recommended action. It is review-only, approval required, and it does not create or run automations from UI, schedule tasks, create reminders, create watches, create background jobs, start polling loops, send notifications, persist automation rules, persist approvals, call connectors, call providers, call local models, mutate files, or run tests."
      language={model.language}
      markers={[...FIRST_APPROVED_AUTOMATION_DRY_RUN_TRIAL_MARKERS]}
      links={[
        { href: "/first-approved-file-patch-dry-run", label: "File patch dry-run" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
        { href: "/automation-execution-boundary-readiness-review", label: "Automation boundary" },
        { href: "/first-approved-connector-access-trial", label: "Connector trial" },
      ]}
      cards={cards}
      advancedSummary="Advanced automation dry-run details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.automationDryRunTrials.map((trial) => trial.advancedAutomationDryRunDetails)}
      advancedCopy="advanced automation dry-run details collapsed/secondary. This route remains review-only and approval required. It never creates automations, runs automations, schedules tasks, creates reminders, creates watches, creates background jobs, starts polling loops, sends notifications, persists automation rules, persists approvals, calls connectors, calls providers, calls local models, mutates files, runs tests, or creates an MCP runtime."
      dataScope="first-approved-automation-dry-run-trial buildFirstApprovedAutomationDryRunTrialStableKey FirstApprovedAutomationDryRunTrialPanel"
    />
  );
}
