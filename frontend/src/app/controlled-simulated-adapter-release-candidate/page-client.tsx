"use client";

import { ControlledSimulatedAdapterReleaseCandidatePanel } from "@/lib/codexforge/controlled-simulated-adapter-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledSimulatedAdapterReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-simulated-adapter-release-candidate"
      workspaceLabel="Controlled Simulated Adapter Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledSimulatedAdapterReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
