"use client";

import { UnifiedCockpitBoundaryPanel } from "@/lib/codexforge/unified-cockpit-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UnifiedCockpitBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/unified-cockpit-boundary" workspaceLabel="Unified Cockpit Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <UnifiedCockpitBoundaryPanel />
    </CodexForgeAppShell>
  );
}
