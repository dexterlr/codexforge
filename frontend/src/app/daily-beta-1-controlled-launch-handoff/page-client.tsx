"use client";

import { DailyBetaOneControlledLaunchHandoffPanel } from "@/lib/codexforge/daily-beta-1-controlled-launch-handoff/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneControlledLaunchHandoffPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-controlled-launch-handoff"
      workspaceLabel="Daily Beta 1 Controlled Launch Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneControlledLaunchHandoffPanel />
    </CodexForgeAppShell>
  );
}
