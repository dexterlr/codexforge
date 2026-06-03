"use client";

import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { ProviderFailureRecoveryFlowPanel } from "@/lib/codexforge/provider-failure-recovery-flow/components";

export default function ProviderFailureRecoveryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/provider-failure-recovery"
      workspaceLabel="Provider Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ProviderFailureRecoveryFlowPanel />
    </CodexForgeAppShell>
  );
}
