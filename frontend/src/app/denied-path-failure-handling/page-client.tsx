"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DeniedPathFailureHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/denied-path-failure-handling"
      workspaceLabel="Denied Path Failure Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="denied-path-failure-handling" />
    </CodexForgeAppShell>
  );
}
