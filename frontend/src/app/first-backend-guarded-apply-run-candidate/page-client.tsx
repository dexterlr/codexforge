"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstBackendGuardedApplyRunCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-backend-guarded-apply-run-candidate"
      workspaceLabel="First Backend Guarded Apply Run Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="first-backend-guarded-apply-run-candidate" />
    </CodexForgeAppShell>
  );
}
