"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GoalAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/goal-audit-record-preview"
      workspaceLabel="Goal Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="goal-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
