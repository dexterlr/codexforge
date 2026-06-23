"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerBuilderWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-builder-workspace-preview"
      workspaceLabel="Game Server Builder Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="game-server-builder-workspace-preview" />
    </CodexForgeAppShell>
  );
}
