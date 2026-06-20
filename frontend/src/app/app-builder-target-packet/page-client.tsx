"use client";

import { AppBuilderTargetPacketPanel } from "@/lib/codexforge/app-builder-target-packet/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AppBuilderTargetPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/app-builder-target-packet"
      workspaceLabel="App Builder Target Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <AppBuilderTargetPacketPanel />
    </CodexForgeAppShell>
  );
}
