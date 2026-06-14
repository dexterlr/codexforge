"use client";

import { ReviewInboxFinalConsolidationPanel } from "@/lib/codexforge/review-inbox-final-consolidation/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function PageClient() {
  return (
    <CodexForgeAppShell
      activePath="/review-inbox-final-consolidation"
      workspaceLabel="Final Inbox"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ReviewInboxFinalConsolidationPanel />
    </CodexForgeAppShell>
  );
}
