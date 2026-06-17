"use client";

import { CommandExecutionApprovalBoundaryPanel } from "@/lib/codexforge/command-execution-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function CommandExecutionApprovalBoundaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/command-execution-approval-boundary"
      workspaceLabel="Command Execution Approval Boundary"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <CommandExecutionApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
