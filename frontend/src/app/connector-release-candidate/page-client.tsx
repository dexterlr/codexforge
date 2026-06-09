"use client";

import { ConnectorReleaseCandidatePanel } from "@/lib/codexforge/connector-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-release-candidate"
      workspaceLabel="Connector Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
