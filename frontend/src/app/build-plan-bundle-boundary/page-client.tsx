"use client";

import { BuildPlanBundleBoundaryPanel } from "@/lib/codexforge/build-plan-bundle-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BuildPlanBundleBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/build-plan-bundle-boundary"
      workspaceLabel="Build Plan Bundle Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BuildPlanBundleBoundaryPanel />
    </CodexForgeAppShell>
  );
}
