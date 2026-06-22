"use client";

import { PlanDiffCommandComposerRoutePanel } from "@/lib/codexforge/plan-diff-command-composer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstPlanDiffCommandComposerCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-plan-diff-command-composer-candidate"
      workspaceLabel="First Plan Diff Command Composer Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PlanDiffCommandComposerRoutePanel routeSlug="first-plan-diff-command-composer-candidate" />
    </CodexForgeAppShell>
  );
}
