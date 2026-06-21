"use client";

import { RealGuardedFileWriteAdapterBoundaryPanel } from "@/lib/codexforge/real-guarded-file-write-adapter-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealGuardedFileWriteAdapterBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-guarded-file-write-adapter-boundary"
      workspaceLabel="Real Guarded File Write Adapter Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealGuardedFileWriteAdapterBoundaryPanel />
    </CodexForgeAppShell>
  );
}
