"use client";

import { TinyRealControlledTrialRoutePanel } from "@/lib/codexforge/tiny-real-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TinyRealDeniedPathMatrixPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/tiny-real-denied-path-matrix"
      workspaceLabel="Tiny Real Denied Path Matrix"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TinyRealControlledTrialRoutePanel routeSlug="tiny-real-denied-path-matrix" />
    </CodexForgeAppShell>
  );
}
