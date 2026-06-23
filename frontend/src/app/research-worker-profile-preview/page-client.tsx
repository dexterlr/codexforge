"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-worker-profile-preview"
      workspaceLabel="Research Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="research-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
