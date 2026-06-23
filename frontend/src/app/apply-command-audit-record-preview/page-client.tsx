"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ApplyCommandAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/apply-command-audit-record-preview"
      workspaceLabel="Apply Command Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="apply-command-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
