"use client";

import { FirstUniversalGameBuilderCandidatePanel } from "@/lib/codexforge/first-universal-game-builder-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstUniversalGameBuilderCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-universal-game-builder-candidate"
      workspaceLabel="First Universal Game Builder Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstUniversalGameBuilderCandidatePanel />
    </CodexForgeAppShell>
  );
}