"use client";

import { ConnectorDataRedactionTrialReviewPanel } from "@/lib/codexforge/connector-data-redaction-trial-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorDataRedactionTrialReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-data-redaction-trial-review"
      workspaceLabel="Connector Data Redaction Trial"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorDataRedactionTrialReviewPanel />
    </CodexForgeAppShell>
  );
}
