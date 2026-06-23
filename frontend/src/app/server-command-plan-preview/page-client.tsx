"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ServerCommandPlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/server-command-plan-preview"
      workspaceLabel="Server Command Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="server-command-plan-preview" />
    </CodexForgeAppShell>
  );
}
