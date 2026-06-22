"use client";

import { CockpitRecoveryPanel } from "@/lib/codexforge/cockpit-recovery-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitRecoveryPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-recovery-panel" workspaceLabel="Cockpit Recovery Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitRecoveryPanel />
    </CodexForgeAppShell>
  );
}
