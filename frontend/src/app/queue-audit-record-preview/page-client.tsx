"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function QueueAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/queue-audit-record-preview"
      workspaceLabel="Queue Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="queue-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
