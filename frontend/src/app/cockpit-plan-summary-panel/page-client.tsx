"use client";

import { CockpitPlanSummaryPanel } from "@/lib/codexforge/cockpit-plan-summary-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitPlanSummaryPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-plan-summary-panel" workspaceLabel="Cockpit Plan Summary Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitPlanSummaryPanel />
    </CodexForgeAppShell>
  );
}
