"use client";

import { AutomationScheduleApprovalBoundaryPanel } from "@/lib/codexforge/automation-schedule-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationScheduleApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-schedule-approval-boundary"
      workspaceLabel="Automation Schedule Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationScheduleApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
