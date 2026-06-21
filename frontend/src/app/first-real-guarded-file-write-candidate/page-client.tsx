"use client";

import { FirstRealGuardedFileWriteCandidatePanel } from "@/lib/codexforge/first-real-guarded-file-write-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstRealGuardedFileWriteCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-real-guarded-file-write-candidate"
      workspaceLabel="First Real Guarded File Write Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstRealGuardedFileWriteCandidatePanel />
    </CodexForgeAppShell>
  );
}
