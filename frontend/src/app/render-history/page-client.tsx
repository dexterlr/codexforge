"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { RenderVersionHistoryPanel } from "@/lib/codexforge/render-version-history/components";

export default function RenderHistoryPageClient() {
  return (
    <CodexForgeAppShell activePath="/render-history" workspaceLabel="Render History" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <RenderVersionHistoryPanel />
    </CodexForgeAppShell>
  );
}
