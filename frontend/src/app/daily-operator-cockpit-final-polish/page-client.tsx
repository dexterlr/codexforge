"use client";

import { DailyOperatorCockpitFinalPolishPanel } from "@/lib/codexforge/daily-operator-cockpit-final-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-operator-cockpit-final-polish"
      workspaceLabel="Cockpit Final Polish"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyOperatorCockpitFinalPolishPanel />
    </CodexForgeAppShell>
  );
}
