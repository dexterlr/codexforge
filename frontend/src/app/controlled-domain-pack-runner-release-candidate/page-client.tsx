"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledDomainPackRunnerReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-domain-pack-runner-release-candidate"
      workspaceLabel="Controlled Domain Pack Runner Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="controlled-domain-pack-runner-release-candidate" />
    </CodexForgeAppShell>
  );
}
