"use client";

import { ConnectorLiveAccessGuardReviewPanel } from "@/lib/codexforge/connector-live-access-guard-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorLiveAccessGuardReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-live-access-guard-review"
      workspaceLabel="Connector Live Guard"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorLiveAccessGuardReviewPanel />
    </CodexForgeAppShell>
  );
}
