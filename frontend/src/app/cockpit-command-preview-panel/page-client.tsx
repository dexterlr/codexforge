"use client";

import { CockpitCommandPreviewPanel } from "@/lib/codexforge/cockpit-command-preview-panel/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitCommandPreviewPanelPageClient() {
  return (
    <CodexForgeAppShell activePath="/cockpit-command-preview-panel" workspaceLabel="Cockpit Command Preview Panel" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <CockpitCommandPreviewPanel />
    </CodexForgeAppShell>
  );
}
