"use client";

import { ConnectorControlledTrialPlanPanel } from "@/lib/codexforge/connector-controlled-trial-plan/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorControlledTrialPlanPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-controlled-trial-plan"
      workspaceLabel="Connector Controlled Trial Plan"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorControlledTrialPlanPanel />
    </CodexForgeAppShell>
  );
}
