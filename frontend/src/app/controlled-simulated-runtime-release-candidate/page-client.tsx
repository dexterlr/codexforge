"use client";

import { ControlledSimulatedRuntimeReleaseCandidatePanel } from "@/lib/codexforge/controlled-simulated-runtime-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledSimulatedRuntimeReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-simulated-runtime-release-candidate"
      workspaceLabel="Controlled Simulated Runtime Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledSimulatedRuntimeReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
