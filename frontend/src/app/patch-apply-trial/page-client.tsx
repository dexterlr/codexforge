"use client";

import { PatchApplyTrialBoundaryPanel } from "@/lib/codexforge/patch-apply-trial-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PatchApplyTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/patch-apply-trial"
      workspaceLabel="Patch Apply Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <PatchApplyTrialBoundaryPanel />
    </CodexForgeAppShell>
  );
}
