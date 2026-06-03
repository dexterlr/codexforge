"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { MultiProviderLiveTestPanel } from "@/lib/codexforge/multi-provider-live-test/components";

export default function MultiProviderLiveTestPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/multi-provider-live-test"
      workspaceLabel="Multi Test"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <MultiProviderLiveTestPanel />
    </CodexForgeAppShell>
  );
}
