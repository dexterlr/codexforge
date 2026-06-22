"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealControlledTrialBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-controlled-trial-boundary"
      workspaceLabel="Tiny Real Controlled Trial Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-controlled-trial-boundary" />
    </CodexForgeAppShell>
  );
}
