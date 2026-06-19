"use client";

import { RealProjectScaffoldWiringPlanPanel } from "@/lib/codexforge/real-project-scaffold-wiring-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealProjectScaffoldWiringPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-project-scaffold-wiring-plan"
      workspaceLabel="Real Project Scaffold Wiring Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealProjectScaffoldWiringPlanPanel />
    </CodexForgeAppShell>
  );
}
