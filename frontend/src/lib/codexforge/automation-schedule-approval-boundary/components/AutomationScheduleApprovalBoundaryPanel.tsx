"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildAutomationScheduleApprovalBoundaryModel } from "@/lib/codexforge/automation-schedule-approval-boundary";

const AUTOMATION_SCHEDULE_APPROVAL_BOUNDARY_MARKERS = [
  "Automation schedule approval boundary",
  "Automation/schedule approval boundary does not create automations or schedules",
  "Automations and schedules require explicit operator approval",
  "Unsafe automations stay blocked",
  "Automation groups",
  "Condition watch checklist",
] as const;

export function AutomationScheduleApprovalBoundaryPanel() {
  const model = buildAutomationScheduleApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 624"
      title="Automation schedule approval boundary"
      subtitle="Automation/schedule approval boundary reviews watches and schedules without creating them. Automations and schedules require explicit operator approval, and unsafe automations stay blocked."
      primaryLabel="Review automation boundary"
      anchor="automation-schedule-approval-boundary"
      plainEnglishTitle="Plain-English automation schedule approval boundary"
      plainEnglishCopy="This page enables future scheduled research, monitoring, conditional watches, reminders, meeting follow-ups, and connector alerts only after approved automation boundaries exist. It does not create schedules, watches, tasks, reminders, polling loops, background jobs, or notifications from UI."
      language={model.language}
      markers={[...AUTOMATION_SCHEDULE_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/evidence-capture-boundary", label: "Evidence boundary" },
        { href: "/recovery-retry-boundary", label: "Recovery boundary" },
        { href: "/workflow-profile-registry", label: "Workflow profiles" },
      ]}
      packets={model.automationScheduleApprovalBoundaries}
      advancedSummary="Advanced automation/schedule approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced automation/schedule approval boundary details collapsed/secondary. This route does not create automations, reminders, tasks, watches, schedules, polling loops, background jobs, or notifications."
      dataScope="automation-schedule-approval-boundary buildAutomationScheduleApprovalBoundaryStableKey AutomationScheduleApprovalBoundaryPanel"
    />
  );
}
