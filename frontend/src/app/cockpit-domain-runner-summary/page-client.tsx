"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitDomainRunnerSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-domain-runner-summary"
      workspaceLabel="Cockpit Domain Runner Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="cockpit-domain-runner-summary" />
    </CodexForgeAppShell>
  );
}
