"use client";

import { ConnectorLiveTrialReleaseCandidatePanel } from "@/lib/codexforge/connector-live-trial-release-candidate/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorLiveTrialReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-live-trial-release-candidate"
      workspaceLabel="Connector Live RC"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorLiveTrialReleaseCandidatePanel />
    </CodexForgeAppShell>
  );
}
