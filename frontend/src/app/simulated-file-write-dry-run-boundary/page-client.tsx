"use client";

import { SimulatedFileWriteDryRunBoundaryPanel } from "@/lib/codexforge/simulated-file-write-dry-run-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SimulatedFileWriteDryRunBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/simulated-file-write-dry-run-boundary"
      workspaceLabel="Simulated File Write Dry-Run Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SimulatedFileWriteDryRunBoundaryPanel />
    </CodexForgeAppShell>
  );
}
