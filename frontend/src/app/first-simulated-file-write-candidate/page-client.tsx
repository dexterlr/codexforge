"use client";

import { FirstSimulatedFileWriteCandidatePanel } from "@/lib/codexforge/first-simulated-file-write-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstSimulatedFileWriteCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-simulated-file-write-candidate"
      workspaceLabel="First Simulated File Write Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstSimulatedFileWriteCandidatePanel />
    </CodexForgeAppShell>
  );
}
