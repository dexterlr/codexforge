"use client";

import { RealAdapterValidationWiringPlanPanel } from "@/lib/codexforge/real-adapter-validation-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealAdapterValidationWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-adapter-validation-wiring-plan"
      workspaceLabel="Real Adapter Validation Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealAdapterValidationWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
