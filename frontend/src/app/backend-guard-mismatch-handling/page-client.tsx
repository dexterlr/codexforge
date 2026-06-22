"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BackendGuardMismatchHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/backend-guard-mismatch-handling"
      workspaceLabel="Backend Guard Mismatch Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="backend-guard-mismatch-handling" />
    </CodexForgeAppShell>
  );
}
