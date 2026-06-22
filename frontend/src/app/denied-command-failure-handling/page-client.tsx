"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DeniedCommandFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/denied-command-failure-handling"
      workspaceLabel="Denied Command Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="denied-command-failure-handling" />
    </CodexForgeAppShell>
  );
}
