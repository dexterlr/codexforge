"use client";

import { ActualPackagingBoundaryPanel } from "@/lib/codexforge/actual-packaging-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualPackagingBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-packaging-boundary"
      workspaceLabel="Actual Packaging Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualPackagingBoundaryPanel />
    </CodexForgeAppShell>
  );
}
