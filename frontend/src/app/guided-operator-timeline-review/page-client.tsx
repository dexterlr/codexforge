"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorTimelineReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-timeline-review" workspaceLabel="Guided Operator Timeline Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-timeline-review" />
    </CodexForgeAppShell>
  );
}
