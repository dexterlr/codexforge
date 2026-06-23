"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function RecoveryAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/recovery-audit-record-preview"
      workspaceLabel="Recovery Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="recovery-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
