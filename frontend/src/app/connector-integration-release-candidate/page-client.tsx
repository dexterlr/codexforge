"use client";

import { ConnectorIntegrationReleaseCandidatePanel } from "@/lib/codexforge/connector-integration-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorIntegrationReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-integration-release-candidate"
      workspaceLabel="Connector Integration RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorIntegrationReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
