"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstSpecialistWorkerRegistryCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-specialist-worker-registry-candidate"
      workspaceLabel="First Specialist Worker Registry Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="first-specialist-worker-registry-candidate" />
    </CodexForgeAppShell>
  );
}
