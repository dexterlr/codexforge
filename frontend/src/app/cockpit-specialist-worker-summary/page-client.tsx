"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitSpecialistWorkerSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-specialist-worker-summary"
      workspaceLabel="Cockpit Specialist Worker Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="cockpit-specialist-worker-summary" />
    </CodexForgeAppShell>
  );
}
