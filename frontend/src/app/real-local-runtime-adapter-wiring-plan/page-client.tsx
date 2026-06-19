"use client";

import { RealLocalRuntimeAdapterWiringPlanPanel } from "@/lib/codexforge/real-local-runtime-adapter-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealLocalRuntimeAdapterWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-local-runtime-adapter-wiring-plan"
      workspaceLabel="Real Local Runtime Adapter Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealLocalRuntimeAdapterWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
