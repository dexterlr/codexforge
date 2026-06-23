"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorldRulesConfigPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/world-rules-config-preview"
      workspaceLabel="World Rules Config Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="world-rules-config-preview" />
    </CodexForgeAppShell>
  );
}
