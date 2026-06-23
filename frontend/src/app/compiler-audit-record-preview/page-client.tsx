"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CompilerAuditRecordPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/compiler-audit-record-preview"
      workspaceLabel="Compiler Audit Record Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="compiler-audit-record-preview" />
    </CodexForgeAppShell>
  );
}
