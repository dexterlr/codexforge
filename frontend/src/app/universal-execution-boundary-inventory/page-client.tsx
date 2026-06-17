"use client";

import { UniversalExecutionBoundaryInventoryPanel } from "@/lib/codexforge/universal-execution-boundary-inventory/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function UniversalExecutionBoundaryInventoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/universal-execution-boundary-inventory"
      workspaceLabel="Universal Execution Boundary Inventory"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <UniversalExecutionBoundaryInventoryPanel />
    </CodexForgeAppShell>
  );
}
