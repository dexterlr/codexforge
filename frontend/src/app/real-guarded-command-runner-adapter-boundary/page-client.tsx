"use client";

import { RealGuardedCommandRunnerAdapterBoundaryPanel } from "@/lib/codexforge/real-guarded-command-runner-adapter-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealGuardedCommandRunnerAdapterBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-guarded-command-runner-adapter-boundary"
      workspaceLabel="Real Guarded Command Runner Adapter Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealGuardedCommandRunnerAdapterBoundaryPanel />
    </CodexForgeAppShell>
  );
}
