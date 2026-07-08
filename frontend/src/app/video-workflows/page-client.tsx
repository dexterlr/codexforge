"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { LocalVideoWorkflowCatalogPanel } from "@/lib/codexforge/local-video-workflow-catalog/components";

export default function VideoWorkflowsPageClient() {
  return (
    <CodexForgeAppShell activePath="/video-workflows" workspaceLabel="Workflows" nextActionContext={{ hasCreativeWork: true }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <LocalVideoWorkflowCatalogPanel />
    </CodexForgeAppShell>
  );
}
