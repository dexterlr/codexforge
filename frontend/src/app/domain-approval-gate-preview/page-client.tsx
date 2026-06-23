"use client";

import { DomainPackRunnerRoutePanel } from "@/lib/codexforge/domain-pack-runner/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DomainApprovalGatePreviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/domain-approval-gate-preview"
      workspaceLabel="Domain Approval Gate Preview"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DomainPackRunnerRoutePanel routeSlug="domain-approval-gate-preview" />
    </CodexForgeAppShell>
  );
}
