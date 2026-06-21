"use client";

import { FirstSimulatedAdapterCandidatePanel } from "@/lib/codexforge/first-simulated-adapter-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstSimulatedAdapterCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-simulated-adapter-candidate"
      workspaceLabel="First Simulated Adapter Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstSimulatedAdapterCandidatePanel />
    </CodexForgeAppShell>
  );
}
