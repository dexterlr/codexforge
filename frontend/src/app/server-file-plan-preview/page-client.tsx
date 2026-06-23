"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ServerFilePlanPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/server-file-plan-preview"
      workspaceLabel="Server File Plan Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="server-file-plan-preview" />
    </CodexForgeAppShell>
  );
}
