"use client";

import { StrategyLabSignalEngineRoutePanel } from "@/lib/codexforge/strategy-lab-signal-engine/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledStrategyLabSignalEngineReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-strategy-lab-signal-engine-release-candidate"
      workspaceLabel="Controlled Strategy Lab Signal Engine Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <StrategyLabSignalEngineRoutePanel routeSlug="controlled-strategy-lab-signal-engine-release-candidate" />
    </CodexForgeAppShell>
  );
}
