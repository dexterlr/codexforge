"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedCombinedApplyRunContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-combined-apply-run-contract"
      workspaceLabel="Backend Guarded Combined Apply Run Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-combined-apply-run-contract" />
    </CodexForgeAppShell>
  );
}
