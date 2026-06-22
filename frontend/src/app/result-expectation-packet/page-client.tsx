"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultExpectationPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-expectation-packet"
      workspaceLabel="Result Expectation Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="result-expectation-packet" />
    </CodexForgeAppShell>
  );
}
