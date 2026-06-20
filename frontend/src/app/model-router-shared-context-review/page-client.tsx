"use client";

import { ModelRouterSharedContextReviewPanel } from "@/lib/codexforge/model-router-shared-context-review/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function ModelRouterSharedContextReviewPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/model-router-shared-context-review"
      workspaceLabel="Model Router Shared Context Review"
      nextActionContext={{ wantsOperatorOverview: false }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <ModelRouterSharedContextReviewPanel />
    </CodexForgeAppShell>
  );
}
