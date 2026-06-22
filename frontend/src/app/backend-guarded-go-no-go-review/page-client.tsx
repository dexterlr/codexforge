"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedGoNoGoReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-go-no-go-review"
      workspaceLabel="Backend Guarded Go No Go Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-go-no-go-review" />
    </CodexForgeAppShell>
  );
}
