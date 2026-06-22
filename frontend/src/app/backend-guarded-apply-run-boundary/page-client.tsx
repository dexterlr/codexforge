"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedApplyRunBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-apply-run-boundary"
      workspaceLabel="Backend Guarded Apply Run Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-apply-run-boundary" />
    </CodexForgeAppShell>
  );
}
