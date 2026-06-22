"use client";

import { CockpitExecutionStatePanel } from "@/lib/codexforge/cockpit-execution-state-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitExecutionStatePanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-execution-state-panel" workspaceLabel="Cockpit Execution State Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitExecutionStatePanel />
    </CodexForgeAppShell>
  );
}
