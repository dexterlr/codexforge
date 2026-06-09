"use client";

import { ConnectorEvidenceCaptureReviewPanel } from "@/lib/codexforge/connector-evidence-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorEvidenceCaptureReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-evidence-capture-review"
      workspaceLabel="Connector Evidence Capture Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorEvidenceCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
