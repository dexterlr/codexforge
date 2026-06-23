"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApprovalAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/approval-audit-record-preview"
      workspaceLabel="Approval Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="approval-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
