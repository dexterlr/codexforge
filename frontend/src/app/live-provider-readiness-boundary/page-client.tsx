"use client";

import { LiveProviderReadinessBoundaryPanel } from "@/lib/codexforge/live-provider-readiness-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LiveProviderReadinessBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-provider-readiness-boundary"
      workspaceLabel="Live Provider Readiness Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveProviderReadinessBoundaryPanel />
    </CodexForgeAppShell>
  );
}
