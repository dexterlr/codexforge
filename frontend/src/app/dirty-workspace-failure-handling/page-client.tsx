"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DirtyWorkspaceFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dirty-workspace-failure-handling"
      workspaceLabel="Dirty Workspace Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="dirty-workspace-failure-handling" />
    </CodexForgeAppShell>
  );
}
