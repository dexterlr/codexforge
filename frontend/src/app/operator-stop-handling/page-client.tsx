"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function OperatorStopHandlingPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/operator-stop-handling"
      workspaceLabel="Operator Stop Handling"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="operator-stop-handling" />
    </CodexForgeAppShell>
  );
}
