"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainPackRunnerBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-pack-runner-boundary"
      workspaceLabel="Domain Pack Runner Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-pack-runner-boundary" />
    </CodexForgeAppShell>
  );
}
