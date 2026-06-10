"use client";

import { UnifiedWorkspaceRealWorldTrialReportPanel } from "@/lib/codexforge/unified-workspace-real-world-trial-report/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedWorkspaceRealWorldTrialReportPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/unified-workspace-real-world-trial-report"
      workspaceLabel="Unified Trial Report"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UnifiedWorkspaceRealWorldTrialReportPanel />
    </CodexForgeAppShell>
  );
}
