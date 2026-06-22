"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedDeniedPathReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-denied-path-review"
      workspaceLabel="Backend Guarded Denied Path Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-denied-path-review" />
    </CodexForgeAppShell>
  );
}
