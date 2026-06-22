"use client";

import { ControlledUnifiedCockpitReleaseCandidatePanel } from "@/lib/codexforge/controlled-unified-cockpit-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledUnifiedCockpitReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell activePath="/controlled-unified-cockpit-release-candidate" workspaceLabel="Controlled Unified Cockpit Release Candidate" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <ControlledUnifiedCockpitReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
