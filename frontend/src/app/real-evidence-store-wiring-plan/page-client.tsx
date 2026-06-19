"use client";

import { RealEvidenceStoreWiringPlanPanel } from "@/lib/codexforge/real-evidence-store-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealEvidenceStoreWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-evidence-store-wiring-plan"
      workspaceLabel="Real Evidence Store Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealEvidenceStoreWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
