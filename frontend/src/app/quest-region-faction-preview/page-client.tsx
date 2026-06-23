"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QuestRegionFactionPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/quest-region-faction-preview"
      workspaceLabel="Quest Region Faction Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="quest-region-faction-preview" />
    </CodexForgeAppShell>
  );
}
