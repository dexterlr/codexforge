"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ControlledReleaseGradeAuditTrailReleaseCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/controlled-release-grade-audit-trail-release-candidate"
      workspaceLabel="Controlled Release-Grade Audit Trail Release Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="controlled-release-grade-audit-trail-release-candidate" />
    </CodexForgeAppShell>
  );
}
