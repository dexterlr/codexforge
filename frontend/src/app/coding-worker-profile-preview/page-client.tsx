"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CodingWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/coding-worker-profile-preview"
      workspaceLabel="Coding Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="coding-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
