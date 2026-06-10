"use client";

import { DailyUseOnboardingPolishPanel } from "@/lib/codexforge/daily-use-onboarding-polish/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyUseOnboardingPolishPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-use-onboarding-polish"
      workspaceLabel="Daily Onboarding"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyUseOnboardingPolishPanel />
    </CodexForgeAppShell>
  );
}
