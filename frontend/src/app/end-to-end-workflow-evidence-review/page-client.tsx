"use client";

import { EndToEndWorkflowEvidenceReviewPanel } from "@/lib/codexforge/end-to-end-workflow-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EndToEndWorkflowEvidenceReviewPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/end-to-end-workflow-evidence-review"
      workspaceLabel="End-to-End Evidence"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <EndToEndWorkflowEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
