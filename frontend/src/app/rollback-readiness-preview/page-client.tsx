"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RollbackReadinessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/rollback-readiness-preview"
      workspaceLabel="Rollback Readiness Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="rollback-readiness-preview" />
    </CodexForgeAppShell>
  );
}
