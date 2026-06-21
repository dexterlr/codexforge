"use client";

import { DryRunExecutionHandoffBoundaryPanel } from "@/lib/codexforge/dry-run-execution-handoff-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunExecutionHandoffBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-execution-handoff-boundary"
      workspaceLabel="Dry-Run Execution Handoff Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DryRunExecutionHandoffBoundaryPanel />
    </CodexForgeAppShell>
  );
}
