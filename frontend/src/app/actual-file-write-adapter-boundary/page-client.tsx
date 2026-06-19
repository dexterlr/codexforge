"use client";

import { ActualFileWriteAdapterBoundaryPanel } from "@/lib/codexforge/actual-file-write-adapter-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualFileWriteAdapterBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-file-write-adapter-boundary"
      workspaceLabel="Actual File Write Adapter Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualFileWriteAdapterBoundaryPanel />
    </CodexForgeAppShell>
  );
}
