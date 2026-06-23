"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CreativeWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/creative-worker-profile-preview"
      workspaceLabel="Creative Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="creative-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
