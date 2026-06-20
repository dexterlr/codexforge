"use client";

import { FirstUniversalProjectBuilderCandidatePanel } from "@/lib/codexforge/first-universal-project-builder-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstUniversalProjectBuilderCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-universal-project-builder-candidate"
      workspaceLabel="First Universal Project Builder Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstUniversalProjectBuilderCandidatePanel />
    </CodexForgeAppShell>
  );
}
