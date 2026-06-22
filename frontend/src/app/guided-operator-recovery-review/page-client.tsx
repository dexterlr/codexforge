"use client";

import { GuidedOperatorRunRoutePanel } from "@/lib/codexforge/guided-operator-run/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GuidedOperatorRecoveryReviewPageClient() {
  return (
    <CodexForgeAppShell activePath="/guided-operator-recovery-review" workspaceLabel="Guided Operator Recovery Review" nextActionContext={{ wantsOperatorOverview: false }} focusMode contentMaxWidth="wide" pageChrome="minimal" showRightRail={false} showSidebarSafetyNotice={false} showHeroRouteChips={false}>
      <GuidedOperatorRunRoutePanel routeSlug="guided-operator-recovery-review" />
    </CodexForgeAppShell>
  );
}
