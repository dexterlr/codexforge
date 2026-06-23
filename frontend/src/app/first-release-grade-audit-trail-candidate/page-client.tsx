"use client";

import { ReleaseGradeAuditTrailRoutePanel } from "@/lib/codexforge/release-grade-audit-trail/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function FirstReleaseGradeAuditTrailCandidatePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/first-release-grade-audit-trail-candidate"
      workspaceLabel="First Release-Grade Audit Trail Candidate"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReleaseGradeAuditTrailRoutePanel routeSlug="first-release-grade-audit-trail-candidate" />
    </CodexForgeAppShell>
  );
}
