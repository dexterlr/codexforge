"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ServerValidationEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/server-validation-evidence-preview"
      workspaceLabel="Server Validation Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="server-validation-evidence-preview" />
    </CodexForgeAppShell>
  );
}
