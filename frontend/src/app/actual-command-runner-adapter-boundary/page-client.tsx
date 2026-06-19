"use client";

import { ActualCommandRunnerAdapterBoundaryPanel } from "@/lib/codexforge/actual-command-runner-adapter-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualCommandRunnerAdapterBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-command-runner-adapter-boundary"
      workspaceLabel="Actual Command Runner Adapter Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualCommandRunnerAdapterBoundaryPanel />
    </CodexForgeAppShell>
  );
}
