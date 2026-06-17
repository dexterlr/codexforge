"use client";

import { FirstConnectorControlledTrialPanel } from "@/lib/codexforge/first-connector-controlled-trial/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstConnectorControlledTrialPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-connector-controlled-trial"
      workspaceLabel="First Connector Controlled Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstConnectorControlledTrialPanel />
    </CodexForgeAppShell>
  );
}
