"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorHoldStateReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-hold-state-review" workspaceLabel="Guided Operator Hold State Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-hold-state-review" />
    </CodexForgeAppShell>
  );
}
