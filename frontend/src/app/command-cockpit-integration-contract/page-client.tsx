"use client";

import { CommandCockpitIntegrationContractPanel } from "@/lib/codexforge/command-cockpit-integration-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandCockpitIntegrationContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-cockpit-integration-contract"
      workspaceLabel="Command Cockpit Integration Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandCockpitIntegrationContractPanel />
    </CodexForgeAppShell>
  );
}
