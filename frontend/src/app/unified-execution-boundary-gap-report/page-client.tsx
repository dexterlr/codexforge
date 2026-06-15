"use client";

import { UnifiedExecutionBoundaryGapReportPanel } from "@/lib/codexforge/unified-execution-boundary-gap-report/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedExecutionBoundaryGapReportPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-execution-boundary-gap-report"
      workspaceLabel="Execution Gap Report"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedExecutionBoundaryGapReportPanel />
    </CodexForgeAppShell>
  );
}
