"use client";

import { BackendExecutionQueueRoutePanel } from "@/lib/codexforge/backend-execution-queue/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitQueueSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-queue-summary"
      workspaceLabel="Cockpit Queue Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendExecutionQueueRoutePanel routeSlug="cockpit-queue-summary" />
    </CodexForgeAppShell>
  );
}
