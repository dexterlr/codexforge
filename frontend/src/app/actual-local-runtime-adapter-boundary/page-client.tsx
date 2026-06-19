"use client";

import { ActualLocalRuntimeAdapterBoundaryPanel } from "@/lib/codexforge/actual-local-runtime-adapter-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualLocalRuntimeAdapterBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-local-runtime-adapter-boundary"
      workspaceLabel="Actual Local Runtime Adapter Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualLocalRuntimeAdapterBoundaryPanel />
    </CodexForgeAppShell>
  );
}
