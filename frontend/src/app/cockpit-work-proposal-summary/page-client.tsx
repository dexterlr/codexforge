"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitWorkProposalSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-work-proposal-summary"
      workspaceLabel="Cockpit Work Proposal Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="cockpit-work-proposal-summary" />
    </CodexForgeAppShell>
  );
}
