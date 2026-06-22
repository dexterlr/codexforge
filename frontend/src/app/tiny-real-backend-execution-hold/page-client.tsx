"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealBackendExecutionHoldPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-backend-execution-hold"
      workspaceLabel="Tiny Real Backend Execution Hold"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-backend-execution-hold" />
    </CodexForgeAppShell>
  );
}
