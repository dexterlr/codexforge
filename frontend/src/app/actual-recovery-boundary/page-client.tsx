"use client";

import { ActualRecoveryBoundaryPanel } from "@/lib/codexforge/actual-recovery-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActualRecoveryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/actual-recovery-boundary"
      workspaceLabel="Actual Recovery Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ActualRecoveryBoundaryPanel />
    </CodexForgeAppShell>
  );
}
