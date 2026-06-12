"use client";

import { LiveWorkflowEvidenceCaptureReviewPanel } from "@/lib/codexforge/live-workflow-evidence-capture-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/live-workflow-evidence-capture-review"
      workspaceLabel="Live Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LiveWorkflowEvidenceCaptureReviewPanel />
    </CodexForgeAppShell>
  );
}
