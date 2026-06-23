"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function MemoryAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/memory-audit-record-preview"
      workspaceLabel="Memory Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="memory-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
