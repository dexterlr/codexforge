"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunRecoveryPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-recovery-preview"
      workspaceLabel="Dry-Run Recovery Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-recovery-preview" />
    </CodexForgeAppShell>
  );
}
