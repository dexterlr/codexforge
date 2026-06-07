"use client";

import { TestCommandBridgePanel } from "@/lib/codexforge/test-command-bridge/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestCommandBridgePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-command-bridge"
      workspaceLabel="Test Command Bridge"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestCommandBridgePanel />
    </CodexForgeAppShell>
  );
}
