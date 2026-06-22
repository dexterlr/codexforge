"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedResultContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-result-contract"
      workspaceLabel="Backend Guarded Result Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-result-contract" />
    </CodexForgeAppShell>
  );
}
