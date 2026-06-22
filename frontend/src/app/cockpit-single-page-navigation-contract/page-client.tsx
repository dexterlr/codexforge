"use client";

import { CockpitSinglePageNavigationContractPanel } from "@/lib/codexforge/cockpit-single-page-navigation-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitSinglePageNavigationContractPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-single-page-navigation-contract" workspaceLabel="Cockpit Single Page Navigation Contract" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitSinglePageNavigationContractPanel />
    </CodexForgeAppShell>
  );
}
