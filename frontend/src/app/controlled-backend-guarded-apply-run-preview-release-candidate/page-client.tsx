"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledBackendGuardedApplyRunPreviewReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-backend-guarded-apply-run-preview-release-candidate"
      workspaceLabel="Controlled Backend Guarded Apply Run Preview Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="controlled-backend-guarded-apply-run-preview-release-candidate" />
    </CodexForgeAppShell>
  );
}
