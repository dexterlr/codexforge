"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkerRouteWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/worker-route-workspace-preview"
      workspaceLabel="Worker Route Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="worker-route-workspace-preview" />
    </CodexForgeAppShell>
  );
}
