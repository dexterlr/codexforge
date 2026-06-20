"use client";

import { FirstGuidedBuildAnythingCandidatePanel } from "@/lib/codexforge/first-guided-build-anything-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstGuidedBuildAnythingCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-guided-build-anything-candidate"
      workspaceLabel="First Guided Build Anything Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstGuidedBuildAnythingCandidatePanel />
    </CodexForgeAppShell>
  );
}
