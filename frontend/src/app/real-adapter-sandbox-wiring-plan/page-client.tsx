"use client";

import { RealAdapterSandboxWiringPlanPanel } from "@/lib/codexforge/real-adapter-sandbox-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealAdapterSandboxWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-adapter-sandbox-wiring-plan"
      workspaceLabel="Real Adapter Sandbox Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealAdapterSandboxWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
