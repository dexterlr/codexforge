"use client";

import { LaunchBoundaryAuditPanel } from "@/lib/codexforge/launch-boundary-audit/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LaunchBoundaryAuditPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/launch-boundary-audit"
      workspaceLabel="Launch Boundary Audit"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LaunchBoundaryAuditPanel />
    </CodexForgeAppShell>
  );
}
