"use client";

import { FirstPracticalGuidedBuildCandidatePanel } from "@/lib/codexforge/first-practical-guided-build-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstPracticalGuidedBuildCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-practical-guided-build-candidate"
      workspaceLabel="First Practical Guided Build Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstPracticalGuidedBuildCandidatePanel />
    </CodexForgeAppShell>
  );
}

