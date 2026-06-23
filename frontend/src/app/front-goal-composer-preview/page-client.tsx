"use client";

import { CockpitDomainWorkspaceRoutePanel } from "@/lib/codexforge/cockpit-domain-workspace/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FrontGoalComposerPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/front-goal-composer-preview"
      workspaceLabel="Front Goal Composer Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CockpitDomainWorkspaceRoutePanel routeSlug="front-goal-composer-preview" />
    </CodexForgeAppShell>
  );
}
