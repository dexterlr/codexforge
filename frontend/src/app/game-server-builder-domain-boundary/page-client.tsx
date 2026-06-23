"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerBuilderDomainBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-builder-domain-boundary"
      workspaceLabel="Game Server Builder Domain Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="game-server-builder-domain-boundary" />
    </CodexForgeAppShell>
  );
}
