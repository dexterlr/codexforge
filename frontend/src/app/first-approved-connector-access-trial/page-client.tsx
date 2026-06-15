"use client";

import { FirstApprovedConnectorAccessTrialPanel } from "@/lib/codexforge/first-approved-connector-access-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstApprovedConnectorAccessTrialPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-approved-connector-access-trial"
      workspaceLabel="Connector Access Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstApprovedConnectorAccessTrialPanel />
    </CodexForgeAppShell>
  );
}
