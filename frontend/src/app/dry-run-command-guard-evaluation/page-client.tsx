"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunCmdGuardEvaluationPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-command-guard-evaluation"
      workspaceLabel="Dry-Run Command Guard Evaluation"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-command-guard-evaluation" />
    </CodexForgeAppShell>
  );
}
