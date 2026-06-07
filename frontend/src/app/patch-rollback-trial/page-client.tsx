"use client";

import { PatchRollbackTrialBoundaryPanel } from "@/lib/codexforge/patch-rollback-trial-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchRollbackTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-rollback-trial"
      workspaceLabel="Patch Rollback Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchRollbackTrialBoundaryPanel />
    </CodexForgeAppShell>
  );
}
