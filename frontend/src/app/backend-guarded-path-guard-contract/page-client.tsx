"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedPathGuardContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-path-guard-contract"
      workspaceLabel="Backend Guarded Path Guard Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-path-guard-contract" />
    </CodexForgeAppShell>
  );
}
