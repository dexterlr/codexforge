"use client";

import { DailyBetaOnboardingFinalReviewPanel } from "@/lib/codexforge/daily-beta-onboarding-final-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOnboardingFinalReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-onboarding-final-review"
      workspaceLabel="Daily Beta Onboarding"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOnboardingFinalReviewPanel />
    </CodexForgeAppShell>
  );
}
