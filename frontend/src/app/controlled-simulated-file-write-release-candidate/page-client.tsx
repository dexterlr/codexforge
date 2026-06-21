"use client";

import { ControlledSimulatedFileWriteReleaseCandidatePanel } from "@/lib/codexforge/controlled-simulated-file-write-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledSimulatedFileWriteReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-simulated-file-write-release-candidate"
      workspaceLabel="Controlled Simulated File Write Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledSimulatedFileWriteReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
