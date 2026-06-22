"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorGoalConfirmationPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-goal-confirmation" workspaceLabel="Guided Operator Goal Confirmation" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-goal-confirmation" />
    </CodexForgeAppShell>
  );
}
