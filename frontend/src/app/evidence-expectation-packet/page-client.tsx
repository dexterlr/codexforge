"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceExpectationPacketPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-expectation-packet"
      workspaceLabel="Evidence Expectation Packet"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="evidence-expectation-packet" />
    </CodexForgeAppShell>
  );
}
