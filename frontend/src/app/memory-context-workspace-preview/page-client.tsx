"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MemoryContextWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/memory-context-workspace-preview"
      workspaceLabel="Memory Context Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="memory-context-workspace-preview" />
    </CodexForgeAppShell>
  );
}
