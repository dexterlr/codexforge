"use client";

import { TestResultSummarizerPanel } from "@/lib/codexforge/test-result-summarizer/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function TestResultSummaryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/test-result-summary"
      workspaceLabel="Test Result"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <TestResultSummarizerPanel />
    </CodexForgeAppShell>
  );
}
