"use client";

import { ConnectorEvidenceHandoffReviewPanel } from "@/lib/codexforge/connector-evidence-handoff-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorEvidenceHandoffReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-evidence-handoff-review"
      workspaceLabel="Connector Evidence Handoff"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorEvidenceHandoffReviewPanel />
    </CodexForgeAppShell>
  );
}
