"use client";

import { ActualResultStoreBoundaryPanel } from "@/lib/codexforge/actual-result-store-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualResultStoreBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-result-store-boundary"
      workspaceLabel="Actual Result Store Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualResultStoreBoundaryPanel />
    </CodexForgeAppShell>
  );
}
