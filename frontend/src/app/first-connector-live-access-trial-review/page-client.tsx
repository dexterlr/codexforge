"use client";

import { FirstConnectorLiveAccessTrialReviewPanel } from "@/lib/codexforge/first-connector-live-access-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstConnectorLiveAccessTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-connector-live-access-trial-review"
      workspaceLabel="First Connector Live Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <FirstConnectorLiveAccessTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
