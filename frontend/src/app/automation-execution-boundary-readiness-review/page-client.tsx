"use client";

import { AutomationExecutionBoundaryReadinessReviewPanel } from "@/lib/codexforge/automation-execution-boundary-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AutomationExecutionBoundaryReadinessReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/automation-execution-boundary-readiness-review"
      workspaceLabel="Automation Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AutomationExecutionBoundaryReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
