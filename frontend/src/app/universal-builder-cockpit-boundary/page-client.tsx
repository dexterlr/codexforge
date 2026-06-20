"use client";

import { UniversalBuilderCockpitBoundaryPanel } from "@/lib/codexforge/universal-builder-cockpit-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalBuilderCockpitBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-builder-cockpit-boundary"
      workspaceLabel="Universal Builder Cockpit Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalBuilderCockpitBoundaryPanel />
    </CodexForgeAppShell>
  );
}
