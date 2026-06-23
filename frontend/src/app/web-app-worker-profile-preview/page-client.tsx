"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function WebAppWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/web-app-worker-profile-preview"
      workspaceLabel="Web App Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="web-app-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
