"use client";

import { CockpitResultPanel } from "@/lib/codexforge/cockpit-result-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitResultPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-result-panel" workspaceLabel="Cockpit Result Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitResultPanel />
    </CodexForgeAppShell>
  );
}
