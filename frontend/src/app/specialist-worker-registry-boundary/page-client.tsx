"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function SpecialistWorkerRegistryBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/specialist-worker-registry-boundary"
      workspaceLabel="Specialist Worker Registry Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="specialist-worker-registry-boundary" />
    </CodexForgeAppShell>
  );
}
