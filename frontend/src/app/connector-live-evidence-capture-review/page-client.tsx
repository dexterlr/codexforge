"use client";

import { ConnectorLiveEvidenceCaptureReviewPanel } from "@/lib/codexforge/connector-live-evidence-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ConnectorLiveEvidenceCaptureReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/connector-live-evidence-capture-review"
      workspaceLabel="Connector Live Evidence"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ConnectorLiveEvidenceCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
