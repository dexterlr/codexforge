"use client";

import { LocalModelFailoverReviewPanel } from "@/lib/codexforge/local-model-failover-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function LocalModelFailoverReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/local-model-failover-review"
      workspaceLabel="Local Failover"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <LocalModelFailoverReviewPanel />
    </CodexForgeAppShell>
  );
}
