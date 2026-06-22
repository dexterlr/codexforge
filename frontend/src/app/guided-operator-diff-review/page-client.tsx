"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorDiffReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-diff-review" workspaceLabel="Guided Operator Diff Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-diff-review" />
    </CodexForgeAppShell>
  );
}
