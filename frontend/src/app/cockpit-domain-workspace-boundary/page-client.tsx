"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDomainWorkspaceBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-domain-workspace-boundary"
      workspaceLabel="Cockpit Domain Workspace Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="cockpit-domain-workspace-boundary" />
    </CodexForgeAppShell>
  );
}
