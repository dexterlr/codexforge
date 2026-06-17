"use client";

import { LocalRuntimeControlledTrialPlanPanel } from "@/lib/codexforge/local-runtime-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-controlled-trial-plan"
      workspaceLabel="Local Runtime Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
