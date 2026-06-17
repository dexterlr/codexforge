"use client";

import { LocalRuntimeApprovalBoundaryPanel } from "@/lib/codexforge/local-runtime-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalRuntimeApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-runtime-approval-boundary"
      workspaceLabel="Local Runtime Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalRuntimeApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
