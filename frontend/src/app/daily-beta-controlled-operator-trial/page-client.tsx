"use client";

import { DailyBetaControlledOperatorTrialPanel } from "@/lib/codexforge/daily-beta-controlled-operator-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaControlledOperatorTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-controlled-operator-trial"
      workspaceLabel="Daily Beta Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaControlledOperatorTrialPanel />
    </CodexForgeAppShell>
  );
}
