"use client";

import { RealPackagingWiringPlanPanel } from "@/lib/codexforge/real-packaging-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealPackagingWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-packaging-wiring-plan"
      workspaceLabel="Real Packaging Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealPackagingWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
