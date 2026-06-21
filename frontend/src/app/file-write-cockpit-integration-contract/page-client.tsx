"use client";

import { FileWriteCockpitIntegrationContractPanel } from "@/lib/codexforge/file-write-cockpit-integration-contract/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FileWriteCockpitIntegrationContractPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/file-write-cockpit-integration-contract"
      workspaceLabel="File Write Cockpit Integration Contract"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FileWriteCockpitIntegrationContractPanel />
    </CodexForgeAppShell>
  );
}
