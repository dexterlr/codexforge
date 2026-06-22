"use client";

import { BackendGuardedApplyRunRoutePanel } from "@/lib/codexforge/backend-guarded-apply-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardedCommandGuardContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guarded-command-guard-contract"
      workspaceLabel="Backend Guarded Command Guard Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BackendGuardedApplyRunRoutePanel routeSlug="backend-guarded-command-guard-contract" />
    </CodexForgeAppShell>
  );
}
