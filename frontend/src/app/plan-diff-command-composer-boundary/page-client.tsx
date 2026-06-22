"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PlanDiffCommandComposerBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/plan-diff-command-composer-boundary"
      workspaceLabel="Plan Diff Command Composer Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="plan-diff-command-composer-boundary" />
    </CodexForgeAppShell>
  );
}
