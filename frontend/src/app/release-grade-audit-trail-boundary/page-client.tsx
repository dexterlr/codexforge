"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ReleaseGradeAuditTrailBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/release-grade-audit-trail-boundary"
      workspaceLabel="Release-Grade Audit Trail Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="release-grade-audit-trail-boundary" />
    </CodexForgeAppShell>
  );
}
