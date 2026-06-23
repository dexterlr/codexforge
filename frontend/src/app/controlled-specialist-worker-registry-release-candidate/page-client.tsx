"use client";

import { SpecialistWorkerRegistryRoutePanel } from "@/lib/codexforge/specialist-worker-registry/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledSpecialistWorkerRegistryReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-specialist-worker-registry-release-candidate"
      workspaceLabel="Controlled Specialist Worker Registry Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <SpecialistWorkerRegistryRoutePanel routeSlug="controlled-specialist-worker-registry-release-candidate" />
    </CodexForgeAppShell>
  );
}
