"use client";

import { DailyBetaOneDocumentationRefreshPanel } from "@/lib/codexforge/daily-beta-1-documentation-refresh/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function DailyBetaOneDocumentationRefreshPanelPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/daily-beta-1-documentation-refresh"
      workspaceLabel="Daily Beta 1 Docs"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <DailyBetaOneDocumentationRefreshPanel />
    </CodexForgeAppShell>
  );
}
