"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstDomainPackRunnerCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-domain-pack-runner-candidate"
      workspaceLabel="First Domain Pack Runner Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="first-domain-pack-runner-candidate" />
    </CodexForgeAppShell>
  );
}
