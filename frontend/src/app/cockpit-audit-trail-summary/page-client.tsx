"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CockpitAuditTrailSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/cockpit-audit-trail-summary"
      workspaceLabel="Cockpit Audit Trail Summary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="cockpit-audit-trail-summary" />
    </CodexForgeAppShell>
  );
}
