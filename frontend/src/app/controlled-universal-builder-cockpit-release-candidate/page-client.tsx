"use client";

import { ControlledUniversalBuilderCockpitReleaseCandidatePanel } from "@/lib/codexforge/controlled-universal-builder-cockpit-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledUniversalBuilderCockpitReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-universal-builder-cockpit-release-candidate"
      workspaceLabel="Controlled Universal Builder Cockpit Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledUniversalBuilderCockpitReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
