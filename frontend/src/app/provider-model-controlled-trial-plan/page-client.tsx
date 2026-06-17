"use client";

import { ProviderModelControlledTrialPlanPanel } from "@/lib/codexforge/provider-model-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderModelControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-model-controlled-trial-plan"
      workspaceLabel="Provider Model Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderModelControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
