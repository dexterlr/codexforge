"use client";

import { ProviderFailureRetryTrialPanel } from "@/lib/codexforge/provider-failure-retry-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ProviderFailureRetryTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-failure-retry-trial"
      workspaceLabel="Retry Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderFailureRetryTrialPanel />
    </CodexForgeAppShell>
  );
}
