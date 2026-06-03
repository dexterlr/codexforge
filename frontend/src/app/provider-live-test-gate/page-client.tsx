"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderLiveTestGatePanel } from "@/lib/codexforge/provider-live-test-gate/components";

export default function ProviderLiveTestGatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-live-test-gate"
      workspaceLabel="Live Test Gate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLiveTestGatePanel />
    </CodexForgeAppShell>
  );
}
