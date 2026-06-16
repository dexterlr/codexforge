"use client";

import { LiveExecutionBoundaryFinalSignoffPanel } from "@/lib/codexforge/live-execution-boundary-final-signoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LiveExecutionBoundaryFinalSignoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-execution-boundary-final-signoff"
      workspaceLabel="Live Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveExecutionBoundaryFinalSignoffPanel />
    </CodexForgeAppShell>
  );
}
