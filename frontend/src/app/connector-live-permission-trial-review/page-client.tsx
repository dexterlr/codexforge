"use client";

import { ConnectorLivePermissionTrialReviewPanel } from "@/lib/codexforge/connector-live-permission-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorLivePermissionTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-live-permission-trial-review"
      workspaceLabel="Connector Live Permission Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorLivePermissionTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
