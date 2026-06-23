"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstCockpitDomainWorkspaceCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-cockpit-domain-workspace-candidate"
      workspaceLabel="First Cockpit Domain Workspace Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="first-cockpit-domain-workspace-candidate" />
    </CodexForgeAppShell>
  );
}
