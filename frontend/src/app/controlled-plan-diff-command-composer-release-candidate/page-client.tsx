"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledPlanDiffCommandComposerReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-plan-diff-command-composer-release-candidate"
      workspaceLabel="Controlled Plan Diff Command Composer Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="controlled-plan-diff-command-composer-release-candidate" />
    </CodexForgeAppShell>
  );
}
