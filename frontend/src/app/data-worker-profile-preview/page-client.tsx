"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DataWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/data-worker-profile-preview"
      workspaceLabel="Data Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="data-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
