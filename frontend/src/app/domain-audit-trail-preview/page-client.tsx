"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainAuditTrailPreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-audit-trail-preview"
      workspaceLabel="Domain Audit Trail Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-audit-trail-preview" />
    </CodexForgeAppShell>
  );
}
