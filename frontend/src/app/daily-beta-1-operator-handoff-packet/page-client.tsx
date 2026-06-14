"use client";

import { DailyBetaOneOperatorHandoffPacketPanel } from "@/lib/codexforge/daily-beta-1-operator-handoff-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneOperatorHandoffPacketPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-operator-handoff-packet"
      workspaceLabel="Daily Beta 1 Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneOperatorHandoffPacketPanel />
    </CodexForgeAppShell>
  );
}
