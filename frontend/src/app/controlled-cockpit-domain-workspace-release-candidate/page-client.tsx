"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledCockpitDomainWorkspaceReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-cockpit-domain-workspace-release-candidate"
      workspaceLabel="Controlled Cockpit Domain Workspace Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="controlled-cockpit-domain-workspace-release-candidate" />
    </CodexForgeAppShell>
  );
}
