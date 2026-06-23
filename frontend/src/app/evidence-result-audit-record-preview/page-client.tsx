"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function EvidenceResultAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/evidence-result-audit-record-preview"
      workspaceLabel="Evidence Result Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="evidence-result-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
