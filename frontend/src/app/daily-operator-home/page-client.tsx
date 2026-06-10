"use client";

import { DailyOperatorHomePolishPanel } from "@/lib/codexforge/daily-operator-home-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyOperatorHomePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-operator-home"
      workspaceLabel="Daily Home"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyOperatorHomePolishPanel />
    </CodexForgeAppShell>
  );
}
