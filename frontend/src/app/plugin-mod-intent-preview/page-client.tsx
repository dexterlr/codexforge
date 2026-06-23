"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PluginModIntentPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/plugin-mod-intent-preview"
      workspaceLabel="Plugin Mod Intent Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="plugin-mod-intent-preview" />
    </CodexForgeAppShell>
  );
}
