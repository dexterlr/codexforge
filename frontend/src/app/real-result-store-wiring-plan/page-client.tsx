"use client";

import { RealResultStoreWiringPlanPanel } from "@/lib/codexforge/real-result-store-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealResultStoreWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-result-store-wiring-plan"
      workspaceLabel="Real Result Store Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealResultStoreWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
