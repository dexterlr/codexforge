"use client";

import { ReleaseReadinessDashboardPanel } from "@/lib/codexforge/release-readiness-dashboard/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/release-readiness-dashboard"
      workspaceLabel="Release Readiness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseReadinessDashboardPanel />
    </CodexForgeAppShell>
  );
}
