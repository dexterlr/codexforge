"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RenderQueueRecoveryRetryPanel } from "@/lib/codexforge/render-queue-recovery-retry/components";

export default function RenderQueueRecoveryPageClient() {
  return (
    <CodexForgeAppShell activePath="/render-queue-recovery" workspaceLabel="Render Queue Recovery" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RenderQueueRecoveryRetryPanel />
    </CodexForgeAppShell>
  );
}
