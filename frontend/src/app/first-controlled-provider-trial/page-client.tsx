"use client";

import { FirstControlledProviderTrialPanel } from "@/lib/codexforge/first-controlled-provider-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstControlledProviderTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-controlled-provider-trial"
      workspaceLabel="Provider Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstControlledProviderTrialPanel />
    </CodexForgeAppShell>
  );
}
