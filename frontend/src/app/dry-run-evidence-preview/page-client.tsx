"use client";

import { GuardedApplyRunDryRunRoutePanel } from "@/lib/codexforge/guarded-apply-run-dry-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DryRunEvidencePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/dry-run-evidence-preview"
      workspaceLabel="Dry-Run Evidence Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GuardedApplyRunDryRunRoutePanel routeSlug="dry-run-evidence-preview" />
    </CodexForgeAppShell>
  );
}
