"use client";

import { ControlledUniversalProjectBuilderReleaseCandidatePanel } from "@/lib/codexforge/controlled-universal-project-builder-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledUniversalProjectBuilderReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-universal-project-builder-release-candidate"
      workspaceLabel="Controlled Universal Project Builder Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledUniversalProjectBuilderReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
