"use client";

import { TestExecutionApprovalBoundaryPanel } from "@/lib/codexforge/test-execution-approval-boundary/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestExecutionApprovalPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-execution-approval"
      workspaceLabel="Test Approval"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestExecutionApprovalBoundaryPanel />
    </CodexForgeAppShell>
  );
}
