"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ActiveDomainWorkspacePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/active-domain-workspace-preview"
      workspaceLabel="Active Domain Workspace Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="active-domain-workspace-preview" />
    </CodexForgeAppShell>
  );
}
