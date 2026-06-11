"use client";

import { ControlledProviderIntegrationPlanPanel } from "@/lib/codexforge/controlled-provider-integration-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledProviderIntegrationPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-provider-integration-plan"
      workspaceLabel="Provider Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ControlledProviderIntegrationPlanPanel />
    </CodexForgeAppShell>
  );
}
