"use client";

import { GameServerBuilderRoutePanel } from "@/lib/codexforge/game-server-builder/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ServerRecoveryAuditPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/server-recovery-audit-preview"
      workspaceLabel="Server Recovery Audit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GameServerBuilderRoutePanel routeSlug="server-recovery-audit-preview" />
    </CodexForgeAppShell>
  );
}
