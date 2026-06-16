"use client";

import { FirstControlledLaunchPlanPanel } from "@/lib/codexforge/first-controlled-launch-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledLaunchPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-launch-plan"
      workspaceLabel="First Controlled Launch Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledLaunchPlanPanel />
    </CodexForgeAppShell>
  );
}
