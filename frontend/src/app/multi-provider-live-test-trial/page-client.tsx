"use client";

import { MultiProviderLiveTestTrialPanel } from "@/lib/codexforge/multi-provider-live-test-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MultiProviderLiveTestTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-provider-live-test-trial"
      workspaceLabel="Multi-Provider Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiProviderLiveTestTrialPanel />
    </CodexForgeAppShell>
  );
}
