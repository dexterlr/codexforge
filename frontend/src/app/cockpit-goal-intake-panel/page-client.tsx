"use client";

import { CockpitGoalIntakePanel } from "@/lib/codexforge/cockpit-goal-intake-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitGoalIntakePanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-goal-intake-panel" workspaceLabel="Cockpit Goal Intake Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitGoalIntakePanel />
    </CodexForgeAppShell>
  );
}
