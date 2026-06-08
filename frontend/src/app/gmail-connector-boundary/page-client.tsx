"use client";

import { GmailConnectorBoundaryReviewPanel } from "@/lib/codexforge/gmail-connector-boundary-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GmailConnectorBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/gmail-connector-boundary"
      workspaceLabel="Gmail Connector Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GmailConnectorBoundaryReviewPanel />
    </CodexForgeAppShell>
  );
}
