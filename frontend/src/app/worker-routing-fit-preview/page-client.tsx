"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WorkerRoutingFitPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/worker-routing-fit-preview"
      workspaceLabel="Worker Routing Fit Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="worker-routing-fit-preview" />
    </CodexForgeAppShell>
  );
}
