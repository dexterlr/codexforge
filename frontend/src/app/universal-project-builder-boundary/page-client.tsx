"use client";

import { UniversalProjectBuilderBoundaryPanel } from "@/lib/codexforge/universal-project-builder-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalProjectBuilderBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-project-builder-boundary"
      workspaceLabel="Universal Project Builder Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalProjectBuilderBoundaryPanel />
    </CodexForgeAppShell>
  );
}
