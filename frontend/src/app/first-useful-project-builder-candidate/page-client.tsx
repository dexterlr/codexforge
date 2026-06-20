"use client";

import { FirstUsefulProjectBuilderCandidatePanel } from "@/lib/codexforge/first-useful-project-builder-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstUsefulProjectBuilderCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-useful-project-builder-candidate"
      workspaceLabel="First Useful Project Builder Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstUsefulProjectBuilderCandidatePanel />
    </CodexForgeAppShell>
  );
}
