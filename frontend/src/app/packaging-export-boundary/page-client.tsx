"use client";

import { PackagingExportBoundaryPanel } from "@/lib/codexforge/packaging-export-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PackagingExportBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/packaging-export-boundary"
      workspaceLabel="Packaging Export Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PackagingExportBoundaryPanel />
    </CodexForgeAppShell>
  );
}
