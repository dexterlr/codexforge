"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-worker-profile-preview"
      workspaceLabel="Recovery Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="recovery-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
