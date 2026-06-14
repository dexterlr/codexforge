"use client";

import { RealDailyWorkflowEvidenceReviewPanel } from "@/lib/codexforge/real-daily-workflow-evidence-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/real-daily-workflow-evidence-review"
      workspaceLabel="Evidence Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <RealDailyWorkflowEvidenceReviewPanel />
    </CodexForgeAppShell>
  );
}
