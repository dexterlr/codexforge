"use client";

import { TestFailureRecoveryBridgePanel } from "@/lib/codexforge/test-failure-recovery-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestFailureRecoveryBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-failure-recovery-bridge"
      workspaceLabel="Test Failure Recovery"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestFailureRecoveryBridgePanel />
    </CodexForgeAppShell>
  );
}
