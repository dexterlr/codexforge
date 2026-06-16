"use client";

import { DailyBetaActivationOperatorReadinessReviewPanel } from "@/lib/codexforge/daily-beta-activation-operator-readiness-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaActivationOperatorReadinessReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-activation-operator-readiness-review"
      workspaceLabel="Activation Readiness"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaActivationOperatorReadinessReviewPanel />
    </CodexForgeAppShell>
  );
}
