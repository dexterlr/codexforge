"use client";

import { ResearchReportExportReviewPanel } from "@/lib/codexforge/research-report-export-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResearchReportExportReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/research-report-export-review"
      workspaceLabel="Research Report Export Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResearchReportExportReviewPanel />
    </CodexForgeAppShell>
  );
}
