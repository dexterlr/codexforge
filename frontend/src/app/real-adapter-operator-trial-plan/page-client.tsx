"use client";

import { RealAdapterOperatorTrialPlanPanel } from "@/lib/codexforge/real-adapter-operator-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealAdapterOperatorTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-adapter-operator-trial-plan"
      workspaceLabel="Real Adapter Operator Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealAdapterOperatorTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
