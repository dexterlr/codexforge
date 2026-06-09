"use client";

import { LocalProjectDecisionLogReviewPanel } from "@/lib/codexforge/local-project-decision-log-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalProjectDecisionLogPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-project-decision-log"
      workspaceLabel="Decision Log"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalProjectDecisionLogReviewPanel />
    </CodexForgeAppShell>
  );
}
