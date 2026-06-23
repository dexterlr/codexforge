"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function AuditWorkerProfilePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/audit-worker-profile-preview"
      workspaceLabel="Audit Worker Profile Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="audit-worker-profile-preview" />
    </CodexForgeAppShell>
  );
}
