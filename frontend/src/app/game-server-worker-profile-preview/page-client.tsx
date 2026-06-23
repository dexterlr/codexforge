"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GameServerWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/game-server-worker-profile-preview"
      workspaceLabel="Game Server Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="game-server-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
