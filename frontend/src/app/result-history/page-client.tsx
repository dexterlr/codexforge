"use client";

import { ResultHistoryConsolidationPanel } from "@/lib/codexforge/result-history-consolidation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ResultHistoryPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/result-history"
      workspaceLabel="Result History"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ResultHistoryConsolidationPanel />
    </CodexForgeAppShell>
  );
}
