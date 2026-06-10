"use client";

import { BetaTrialIntakeReviewPanel } from "@/lib/codexforge/beta-trial-intake-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function BetaTrialIntakeReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/beta-trial-intake-review"
      workspaceLabel="Beta Intake"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <BetaTrialIntakeReviewPanel />
    </CodexForgeAppShell>
  );
}
