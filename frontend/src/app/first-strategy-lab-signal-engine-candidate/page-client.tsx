"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstStrategyLabSignalEngineCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-strategy-lab-signal-engine-candidate"
      workspaceLabel="First Strategy Lab Signal Engine Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="first-strategy-lab-signal-engine-candidate" />
    </CodexForgeAppShell>
  );
}
