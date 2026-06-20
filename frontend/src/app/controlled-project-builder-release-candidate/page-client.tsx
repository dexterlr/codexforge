"use client";

import { ControlledProjectBuilderReleaseCandidatePanel } from "@/lib/codexforge/controlled-project-builder-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledProjectBuilderReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-project-builder-release-candidate"
      workspaceLabel="Controlled Project Builder Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledProjectBuilderReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
