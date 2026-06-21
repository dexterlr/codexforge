"use client";

import { ControlledSimulatedCommandReleaseCandidatePanel } from "@/lib/codexforge/controlled-simulated-command-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledSimulatedCommandReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-simulated-command-release-candidate"
      workspaceLabel="Controlled Simulated Command Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledSimulatedCommandReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
