"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ContextAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/context-audit-record-preview"
      workspaceLabel="Context Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="context-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
