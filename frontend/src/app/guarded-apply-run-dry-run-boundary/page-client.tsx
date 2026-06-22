"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuardedApplyRunDryRunBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/guarded-apply-run-dry-run-boundary"
      workspaceLabel="Guarded Apply Run Dry-Run Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="guarded-apply-run-dry-run-boundary" />
    </CodexForgeAppShell>
  );
}
