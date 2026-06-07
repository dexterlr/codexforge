"use client";

import { ProviderLiveTestRunnerBoundaryPanel } from "@/lib/codexforge/provider-live-test-runner-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderLiveTestRunnerBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-live-test-runner-boundary"
      workspaceLabel="Provider Runner"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderLiveTestRunnerBoundaryPanel />
    </CodexForgeAppShell>
  );
}
