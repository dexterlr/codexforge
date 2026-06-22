"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PreflightFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/preflight-failure-handling"
      workspaceLabel="Preflight Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="preflight-failure-handling" />
    </CodexForgeAppShell>
  );
}
