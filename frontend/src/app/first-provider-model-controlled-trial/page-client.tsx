"use client";

import { FirstProviderModelControlledTrialPanel } from "@/lib/codexforge/first-provider-model-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstProviderModelControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-provider-model-controlled-trial"
      workspaceLabel="First Provider Model Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstProviderModelControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
