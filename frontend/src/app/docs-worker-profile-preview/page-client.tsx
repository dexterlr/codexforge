"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DocsWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/docs-worker-profile-preview"
      workspaceLabel="Docs Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="docs-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
