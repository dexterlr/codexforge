"use client";

import { RealTrialHardeningRoutePanel } from "@/lib/codexforge/real-trial-hardening/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RealTrialHardeningBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-trial-hardening-boundary"
      workspaceLabel="Real Trial Hardening Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealTrialHardeningRoutePanel routeSlug="real-trial-hardening-boundary" />
    </CodexForgeAppShell>
  );
}
