"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DeniedPathAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/denied-path-audit-record-preview"
      workspaceLabel="Denied Path Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="denied-path-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
