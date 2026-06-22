"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RetryReadinessPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/retry-readiness-preview"
      workspaceLabel="Retry Readiness Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="retry-readiness-preview" />
    </CodexForgeAppShell>
  );
}
