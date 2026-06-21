"use client";

import { FirstSimulatedCommandCandidatePanel } from "@/lib/codexforge/first-simulated-command-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstSimulatedCommandCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-simulated-command-candidate"
      workspaceLabel="First Simulated Command Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstSimulatedCommandCandidatePanel />
    </CodexForgeAppShell>
  );
}
