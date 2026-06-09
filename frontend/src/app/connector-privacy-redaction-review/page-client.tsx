"use client";

import { ConnectorPrivacyRedactionReviewPanel } from "@/lib/codexforge/connector-privacy-redaction-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorPrivacyRedactionReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-privacy-redaction-review"
      workspaceLabel="Connector Privacy Redaction Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorPrivacyRedactionReviewPanel />
    </CodexForgeAppShell>
  );
}
