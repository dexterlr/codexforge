"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalRenderQueuePersistencePanel } from "@/lib/codexforge/local-render-queue-persistence/components";

export default function LocalRenderQueuePersistencePageClient() {
  return (
    <CodexForgeAppShell activePath="/local-render-queue-persistence" workspaceLabel="Queue Memory" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalRenderQueuePersistencePanel />
    </CodexForgeAppShell>
  );
}
