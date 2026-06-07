"use client";

import { TestResultCapturePanel } from "@/lib/codexforge/test-result-capture/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestResultCapturePageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-result-capture"
      workspaceLabel="Test Result Capture"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestResultCapturePanel />
    </CodexForgeAppShell>
  );
}
