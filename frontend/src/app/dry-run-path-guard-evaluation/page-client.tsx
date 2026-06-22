"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunPathGuardEvaluationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-path-guard-evaluation"
      workspaceLabel="Dry-Run Path Guard Evaluation"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-path-guard-evaluation" />
    </CodexForgeAppShell>
  );
}
