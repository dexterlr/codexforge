"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorEvidenceReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-evidence-review" workspaceLabel="Guided Operator Evidence Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-evidence-review" />
    </CodexForgeAppShell>
  );
}
