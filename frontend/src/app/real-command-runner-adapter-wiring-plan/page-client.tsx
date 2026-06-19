"use client";

import { RealCommandRunnerAdapterWiringPlanPanel } from "@/lib/codexforge/real-command-runner-adapter-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealCommandRunnerAdapterWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-command-runner-adapter-wiring-plan"
      workspaceLabel="Real Command Runner Adapter Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealCommandRunnerAdapterWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
