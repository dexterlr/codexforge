"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function VideoWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/video-worker-profile-preview"
      workspaceLabel="Video Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="video-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
