"use client";

import { FirstSimulatedRuntimeCandidatePanel } from "@/lib/codexforge/first-simulated-runtime-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstSimulatedRuntimeCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-simulated-runtime-candidate"
      workspaceLabel="First Simulated Runtime Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstSimulatedRuntimeCandidatePanel />
    </CodexForgeAppShell>
  );
}
