"use client";

import { CockpitSafetyCoachPanel } from "@/lib/codexforge/cockpit-safety-coach-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitSafetyCoachPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-safety-coach-panel" workspaceLabel="Cockpit Safety Coach Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitSafetyCoachPanel />
    </CodexForgeAppShell>
  );
}
