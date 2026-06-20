"use client";

import { ApprovedProviderHealthCheckBoundaryPanel } from "@/lib/codexforge/approved-provider-health-check-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovedProviderHealthCheckBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approved-provider-health-check-boundary"
      workspaceLabel="Approved Provider Health Check Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ApprovedProviderHealthCheckBoundaryPanel />
    </CodexForgeAppShell>
  );
}
