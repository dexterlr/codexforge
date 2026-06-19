"use client";

import { ActualProjectScaffoldBoundaryPanel } from "@/lib/codexforge/actual-project-scaffold-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualProjectScaffoldBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-project-scaffold-boundary"
      workspaceLabel="Actual Project Scaffold Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualProjectScaffoldBoundaryPanel />
    </CodexForgeAppShell>
  );
}
