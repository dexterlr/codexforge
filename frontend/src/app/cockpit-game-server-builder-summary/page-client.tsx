"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitGameServerBuilderSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-game-server-builder-summary"
      workspaceLabel="Cockpit Game Server Builder Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="cockpit-game-server-builder-summary" />
    </CodexForgeAppShell>
  );
}
