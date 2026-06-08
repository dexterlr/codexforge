"use client";

import { RenderQueuePersistenceLiveBridgePanel } from "@/lib/codexforge/render-queue-persistence-live-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RenderQueuePersistencePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/render-queue-persistence"
      workspaceLabel="Render Queue Persistence"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RenderQueuePersistenceLiveBridgePanel />
    </CodexForgeAppShell>
  );
}
