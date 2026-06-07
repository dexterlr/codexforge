"use client";

import { GitReviewLiveContextIntegrationPanel } from "@/lib/codexforge/git-review-live-context-integration/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function GitReviewLiveContextPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/git-review-live-context"
      workspaceLabel="Git Context"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <GitReviewLiveContextIntegrationPanel />
    </CodexForgeAppShell>
  );
}
