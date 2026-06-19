"use client";

import { RealRecoveryWiringPlanPanel } from "@/lib/codexforge/real-recovery-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealRecoveryWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-recovery-wiring-plan"
      workspaceLabel="Real Recovery Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealRecoveryWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
