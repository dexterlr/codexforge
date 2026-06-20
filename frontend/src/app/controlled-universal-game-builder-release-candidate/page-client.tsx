"use client";

import { ControlledUniversalGameBuilderReleaseCandidatePanel } from "@/lib/codexforge/controlled-universal-game-builder-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledUniversalGameBuilderReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-universal-game-builder-release-candidate"
      workspaceLabel="Controlled Universal Game Builder Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledUniversalGameBuilderReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}