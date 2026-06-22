"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorRunBoundaryPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-run-boundary" workspaceLabel="Guided Operator Run Boundary" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-run-boundary" />
    </CodexForgeAppShell>
  );
}
