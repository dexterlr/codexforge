"use client";

import { CockpitMvpEmptyStatePanel } from "@/lib/codexforge/cockpit-mvp-empty-state/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitMvpEmptyStatePageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-mvp-empty-state" workspaceLabel="Cockpit MVP Empty State" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitMvpEmptyStatePanel />
    </CodexForgeAppShell>
  );
}
